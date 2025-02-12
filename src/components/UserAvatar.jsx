import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

const UserAvatar = () => {
  const [photoURL, setPhotoURL] = useState(null);

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
      style={{
        position: "absolute",
        top: "10px",
        right: "60px",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  );
};

export default UserAvatar;
