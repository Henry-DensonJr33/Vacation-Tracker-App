const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json());

let requests = [];

app.get('/api/test', (req, res) => {
  res.json({
    message: 'Vacation Tracker backend is working!',
  });
});

app.get('/api/requests', (req, res) => {
  res.json(requests);
});

app.post('/api/requests', (req, res) => {
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

  const newRequest = {
    id: Date.now(),
    startDate,
    endDate,
    reason,
    status: 'Pending',
  };

  requests.push(newRequest);

  res.status(201).json(newRequest);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});