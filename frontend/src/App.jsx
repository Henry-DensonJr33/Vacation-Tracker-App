import { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [isManagerView, setIsManagerView] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [requests, setRequests] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      setMessage('Please enter both your email and password.');
      return;
    }

    setMessage('');
    setIsLoggedIn(true);
  }

  function handleVacationRequest() {
    if (!startDate || !endDate || !reason) {
      setRequestMessage('Please complete all request fields.');
      return;
    }

    if (endDate < startDate) {
      setRequestMessage(
        'End date cannot be earlier than the start date.'
      );
      return;
    }

    const newRequest = {
      id: Date.now(),
      startDate,
      endDate,
      reason,
      status: 'Pending',
    };

    setRequests([...requests, newRequest]);

    setStartDate('');
    setEndDate('');
    setReason('');
    setRequestMessage('');
    setShowRequestForm(false);
  }

  function updateRequestStatus(id, newStatus) {
    setRequests(
      requests.map((request) =>
        request.id === id
          ? { ...request, status: newStatus }
          : request
      )
    );
  }

  if (isLoggedIn) {
    const approvedRequest = requests.find(
      (request) => request.status === 'Approved'
    );

    return (
      <div className="app-container">
        <div className="dashboard">

          <div className="dashboard-header">
            <div>
              <h1>
                {isManagerView
                  ? 'Manager Dashboard'
                  : 'Employee Dashboard'}
              </h1>

              <p>
                {isManagerView
                  ? 'Review and manage employee vacation requests.'
                  : 'Welcome to the Vacation Tracker App.'}
              </p>
            </div>

            <div className="dashboard-header-buttons">
              <button
                className="manager-view-button"
                onClick={() => setIsManagerView(!isManagerView)}
              >
                {isManagerView
                  ? 'Employee View'
                  : 'Manager View'}
              </button>

              <button
                className="logout-button"
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsManagerView(false);
                }}
              >
                Log Out
              </button>
            </div>
          </div>

          {isManagerView ? (
            <div className="manager-section">
              <h2>Employee Vacation Requests</h2>

              {requests.length === 0 ? (
                <p>No vacation requests to review.</p>
              ) : (
                requests.map((request) => (
                  <div
                    key={request.id}
                    className="vacation-request"
                  >
                    <p>
                      <strong>Dates:</strong>{' '}
                      {request.startDate} to {request.endDate}
                    </p>

                    <p>
                      <strong>Reason:</strong>{' '}
                      {request.reason}
                    </p>

                    <p>
                      <strong>Status:</strong>{' '}
                      {request.status}
                    </p>

                    {request.status === 'Pending' && (
                      <div className="manager-action-buttons">
                        <button
                          onClick={() =>
                            updateRequestStatus(
                              request.id,
                              'Approved'
                            )
                          }
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateRequestStatus(
                              request.id,
                              'Denied'
                            )
                          }
                        >
                          Deny
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : (
            <>
              <div className="dashboard-grid">

                <div className="dashboard-card">
                  <h2>PTO Balance</h2>

                  <p className="dashboard-number">
                    120 Hours
                  </p>
                </div>

                <div className="dashboard-card">
                  <h2>Upcoming Time Off</h2>

                  {approvedRequest ? (
                    <>
                      <p>
                        <strong>Dates:</strong>{' '}
                        {approvedRequest.startDate} to{' '}
                        {approvedRequest.endDate}
                      </p>

                      <p>
                        <strong>Reason:</strong>{' '}
                        {approvedRequest.reason}
                      </p>
                    </>
                  ) : (
                    <p>
                      No upcoming vacation scheduled.
                    </p>
                  )}
                </div>

              </div>

              <button
                className="request-button"
                onClick={() => {
                  setShowRequestForm(true);
                  setRequestMessage('');
                }}
              >
                Request Time Off
              </button>

              {showRequestForm && (
                <div className="request-form">
                  <h2>Request Time Off</h2>

                  <label htmlFor="startDate">
                    Start Date
                  </label>

                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(event) =>
                      setStartDate(event.target.value)
                    }
                  />

                  <label htmlFor="endDate">
                    End Date
                  </label>

                  <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(event) =>
                      setEndDate(event.target.value)
                    }
                  />

                  <label htmlFor="reason">
                    Reason
                  </label>

                  <textarea
                    id="reason"
                    placeholder="Enter a reason for your request"
                    value={reason}
                    onChange={(event) =>
                      setReason(event.target.value)
                    }
                  />

                  {requestMessage && (
                    <p className="request-message">
                      {requestMessage}
                    </p>
                  )}

                  <div className="request-form-buttons">
                    <button
                      onClick={() => {
                        setShowRequestForm(false);
                        setRequestMessage('');
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleVacationRequest}
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              )}

              <div className="requests-section">
                <h2>My Vacation Requests</h2>

                {requests.length === 0 ? (
                  <p>
                    No vacation requests submitted yet.
                  </p>
                ) : (
                  requests.map((request) => (
                    <div
                      key={request.id}
                      className="vacation-request"
                    >
                      <p>
                        <strong>Dates:</strong>{' '}
                        {request.startDate} to{' '}
                        {request.endDate}
                      </p>

                      <p>
                        <strong>Reason:</strong>{' '}
                        {request.reason}
                      </p>

                      <p>
                        <strong>Status:</strong>{' '}
                        {request.status}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

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

          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          <div className="show-password-container">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() =>
                setShowPassword(!showPassword)
              }
            />

            <label
              htmlFor="showPassword"
              className="show-password-label"
            >
              Show Password
            </label>
          </div>

          <button type="submit">
            Sign In
          </button>

        </form>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default App;