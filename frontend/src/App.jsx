import { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      setMessage('Please enter both your email and password.');
      return;
    }

    setMessage('');
    setIsLoggedIn(true);
  }

  if (isLoggedIn) {
    return (
      <div className="app-container">
        <div className="dashboard">
          <div className="dashboard-header">
            <div>
              <h1>Employee Dashboard</h1>
              <p>Welcome to the Vacation Tracker App.</p>
            </div>
            
            <button
              className="logout-button"
              onClick={() => setIsLoggedIn(false)}
            >
              Log Out
            </button>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h2>PTO Balance</h2>
              <p className="dashboard-number">120 hours</p>
            </div>

            <div className="dashboard-card">
              <h2>Upcoming Time Off</h2>
              <p>No upcoming vacation scheduled.</p>
            </div>
          </div>

          <button 
            className="request-button"
            onClick={() => setShowRequestForm(true)}
          >
            Request Time Off
          </button>

          {showRequestForm && (
            <div className="request-form">
              <h2>Request Time Off</h2>

              <label htmlFor="startDate">Start Date</label>
              <input id="startDate" type="date" />

              <label htmlFor="endDate">End Date</label>
              <input id="endDate" type="date" />

              <label htmlFor="reason">Reason</label>
              <textarea
                id="reason"
                placeholder="Enter a reason for your request"
              />

              <div className="request-form-buttons">
                <button onClick={() => setShowRequestForm(false)}>
                  Cancel
                </button>

                <button>
                  Submit Request
                </button>
              </div>
            </div>
          )}

          <div className="request-section">
            <h2>My Vacation Requests</h2>

            <p>No vacation requests submitted yet.</p>
          </div>
        </div>
      </div>
    );
  }
 
  return (
    <div className="app-container">
      <div className="login-card">
        <h1>Vacation Tracker App</h1>

        <p>
          Manage PTO requests, approvals, and employee vacation schedules.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <div className="show-password-container">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />

            <label htmlFor="showPassword" className="show-password-label">
              Show Password
            </label>
          </div>

          <button type="submit">Sign In</button>
        </form>

        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}

export default App;