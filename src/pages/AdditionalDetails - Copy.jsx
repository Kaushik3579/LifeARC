import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdditionalDetails() {
  const [details, setDetails] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ details });
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Additional Details</h2>
      <form onSubmit={handleSubmit}>
        <textarea placeholder="Enter extra details" value={details} onChange={(e) => setDetails(e.target.value)}></textarea>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AdditionalDetails;
