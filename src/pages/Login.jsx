import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          navigate("/dashboard");
        } else {
          setIsNewUser(true);
        }
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        navigate("/dashboard");
      } else {
        setIsNewUser(true);
        navigate("/primary-needs"); // Navigate to Primary Needs page for new users
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });
      localStorage.setItem("isNewUser", "true");
      setIsNewUser(true);
      navigate("/primary-needs"); // Navigate to Primary Needs page for new users
    } catch (error) {
      console.error("Error signing up: ", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
        });
        localStorage.setItem("isNewUser", "true");
        navigate("/primary-needs"); // Navigate to Primary Needs page for new users
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={isNewUser ? handleSignUp : handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isNewUser ? "Sign Up" : "Login"}</button>
      </form>
      <button onClick={handleGoogleSignIn}>Continue with Google</button>
    </div>
  );
}

export default Login;