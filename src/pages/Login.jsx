import React, { useState } from "react";
import { auth, provider, signInWithPopup, signOut } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
    navigate("/income-expenses");
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Sign in with Google</button>
      )}
    </div>
  );
}

export default Login;
