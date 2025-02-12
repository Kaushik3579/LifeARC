import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-title">Financial Planner</h2>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
