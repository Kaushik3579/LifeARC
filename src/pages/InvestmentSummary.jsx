import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Import Firebase database
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods

function InvestmentSummary() {
  const [details, setDetails] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (details) {
      try {
        await addDoc(collection(db, "investmentSummary"), {
          details,
          timestamp: new Date(),
        });
        alert("Investment details saved!");
        navigate("/");
      } catch (error) {
        console.error("Error adding document: ", error);
        alert(`Error saving data: ${error.message}`);
      }
    } else {
      alert("All fields are required.");
    }
  };

  return (
    <div className="container">
      <h2>Investment Summary</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter extra details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        ></textarea>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default InvestmentSummary;