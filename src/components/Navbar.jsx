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
      <h2>Financial Planner</h2>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
