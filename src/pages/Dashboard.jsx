import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase"; // Import signOut
import UserAvatar from "../components/UserAvatar";
import Visualization from "./Visualization"; // Import Visualization component

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`} style={{ display: "flex", height: "100vh", gap: "20px", flexDirection: "column" }}>
      <div style={{ flex: 1, padding: "20px", display: "flex" }}>
        <div style={{ flex: 1 }}>
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
          </div>
        </div>
        <div style={{ flex: 1, padding: "20px" }}>
          <Visualization />
        </div>
      </div>
      <button onClick={handleLogout} className="logout-btn" style={{ alignSelf: "center", marginBottom: "20px" }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
