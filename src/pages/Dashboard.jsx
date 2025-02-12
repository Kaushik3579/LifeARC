import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleReviewDetails = () => {
    navigate("/review-details");
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleReviewDetails}>Review Your Details</button>
      {/* Add more dashboard content here */}
    </div>
  );
}

export default Dashboard;
