import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="login-card">
      <h1>Vacation Tracker App</h1>

      <p>
        Manage PTO requests, approvals, and employee vacation schedules.
      </p>

      <form>
        <label>Email</label>
        <br />
        <input
          type="email"
          placeholder="Enter your email"
        />

        <br />
        <br />

        <label>Password</label>
        <br />
        <input
          type="password"
          placeholder="Enter your password"
        />

        <br />
        <br />

        <button>Sign In</button>
      </form>
    </div>
  </div>
  );
}

export default App;