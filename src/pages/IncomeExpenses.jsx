import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Import Firebase database
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods

function IncomeExpenses() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState({
    housing: 10000,
    electricity: 2000,
    water: 500,
    gas: 1000,
    mobile: 1000,
    insurance: 2000,
    loans: 5000,
    medication: 1000,
    provident: 3000,
    education: 3000,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (income && Object.values(expenses).every((value) => value)) {
      try {
        await addDoc(collection(db, "incomeExpenses"), {
          income,
          expenses,
          timestamp: new Date(),
        });
        navigate("/secondary-investments");
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
      <h2>Income & Expenses</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
        />
        {Object.entries(expenses).map(([key, value]) => (
          <div key={key} className="input-group">
            <label>{key.charAt(0).toUpperCase() + key.slice(1)} (₹):</label>
            <input
              type="number"
              value={value}
              onChange={(e) =>
                setExpenses((prev) => ({
                  ...prev,
                  [key]: Number(e.target.value),
                }))
              }
              required
            />
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default IncomeExpenses;