import { useId, useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      setMessage('Please enter both your email and password.');
      return;
    }

    setMessage('Login information received successfully.');
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