import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const UserAvatar = () => {
  const [photoURL, setPhotoURL] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user && user.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, []);

  if (!photoURL) return null;
  
  return (
    <img 
      src={photoURL} 
      alt="User Avatar" 
      onClick={() => navigate("/combined-details")} // Navigate to CombinedDetails page on click
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        objectFit: "cover",
        cursor: "pointer", // Add cursor pointer to indicate clickability
      }}
    />
  );
};

export default UserAvatar;
