import React from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {user.displayName}</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
