const express = require('express');
require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json());

pool
  .query('SELECT NOW()')
  .then((result) => {
    console.log('PostgreSQL connected:', result.rows[0]);
  })
  .catch((error) => {
    console.error('PostgreSQL connection error:', error);
  });


app.get('/api/test', (req, res) => {
  res.json({
    message: 'Vacation Tracker backend is working!',
  });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Please enter your email and password.',
    });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    const user = result.rows[0];

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    res.json({
      id: Number(user.id),
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error('Login error:', error);

    res.status(500).json({
      message: 'Unable to log in.',
    });
  }
});

app.get('/api/requests', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM requests ORDER BY id ASC'
    );

    const requests = result.rows.map((request) => ({
      id: request.id,
      startDate: request.start_date.toISOString().split('T')[0],
      endDate: request.end_date.toISOString().split('T')[0],
      reason: request.reason,
      status: request.status,
    }));

    res.json(requests);
  } catch (error) {
    console.error('Error loading vacation requests:', error);

    res.status(500).json({
      message: 'Unable to load vacation requests.',
    });
  }
});

app.post('/api/requests', async (req, res) => {
  const { startDate, endDate, reason } = req.body;

  if (!startDate || !endDate || !reason) {
    return res.status(400).json({
      message: 'Please complete all request fields.',
    });
  }

  if (endDate < startDate) {
    return res.status(400).json({
      message: 'End date cannot be earlier than the start date.',
    });
  }

  try {
    const result = await pool.query(
      `
        INSERT INTO requests (start_date, end_date, reason)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [startDate, endDate, reason]
    );

    const newRequest = result.rows[0];

    res.status(201).json({
      id: newRequest.id,
      startDate: newRequest.start_date,
      endDate: newRequest.end_date,
      reason: newRequest.reason,
      status: newRequest.status,
    });
  } catch (error) {
    console.error('Error creating vacation request:', error);

    res.status(500).json({
      message: 'Unable to create vacation request.',
    });
  }
});

app.patch('/api/requests/:id', async (req, res) => {
  const requestId = Number(req.params.id);
  const { status } = req.body;

  if (!['Approved', 'Denied'].includes(status)) {
    return res.status(400).json({
      message: 'Status must be Approved or Denied.',
    });
  }

  try {
    const result = await pool.query(
      `
        UPDATE requests
        SET status = $1
        WHERE id = $2
        RETURNING *
      `,
      [status, requestId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Vacation request not found.',
      });
    }

    const updatedRequest = result.rows[0];

    res.json({
      id: updatedRequest.id,
      startDate: updatedRequest.start_date
        .toISOString()
        .split('T')[0],
      endDate: updatedRequest.end_date
        .toISOString()
        .split('T')[0],
      reason: updatedRequest.reason,
      status: updatedRequest.status,
    });
  } catch (error) {
    console.error('Error updating vacation request:', error);

    res.status(500).json({
      message: 'Unable to update vacation request.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});