import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../components/UserAvatar";

function Dashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleReviewDetails = () => {
    navigate("/review-details");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`}>
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <UserAvatar /> {/* New: displays user's photo */}
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleReviewDetails}>Review Your Details</button>
      
      <div className="dashboard-sections">
        <div className="section">
          <h3>Expense Tracker</h3>
          <p>Track your daily expenses and manage your budget effectively.</p>
          <button onClick={() => navigate("/expense-tracker")}>Go to Expense Tracker</button>
        </div>
        <div className="section">
          <h3>Scenario Planning</h3>
          <p>Plan for different financial scenarios and prepare for the future.</p>
          <button onClick={() => navigate("/scenario-planning")}>Go to Scenario Planning</button>
        </div>
        <div className="section">
          <h3>Goals</h3>
          <p>Set and track your financial goals to achieve your dreams.</p>
          <button onClick={() => navigate("/goals")}>Go to Goals</button>
        </div>
        <div className="section">
          <h3>Visualization</h3>
          <p>Visualize your financial data with charts and graphs.</p>
          <button onClick={() => navigate("/visualization")}>Go to Visualization</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
