import React, { useEffect } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          navigate("/dashboard");
        } else {
          navigate("/primary-needs"); // Navigate to Primary Needs page for new users
        }
      }
    });
    return unsubscribe;
  }, [navigate]);

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
      {/* Removed email and password fields and login button */}
      <button onClick={handleGoogleSignIn}>Continue with Google</button>
    </div>
  );
}

export default Login;