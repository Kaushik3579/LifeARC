import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { db, auth } from "../firebase"; // Import Firebase database and auth
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods

function PrimaryNeeds() {
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
    education: 3000
  });

  const navigate = useNavigate();
  const user = auth.currentUser; // Get the current user

  const handleChange = (field, value) => {
    setExpenses(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...', { income, expenses });
    
    if (income && Object.values(expenses).every((value) => value)) {
      try {
        await addDoc(collection(db, "primaryNeeds"), {
          userId: user.uid, // Save the user ID
          income,
          expenses,
          timestamp: new Date(),
        });
        alert('Data saved successfully!');
        navigate("/secondary-expenses"); // Redirect upon successful save
      } catch (error) {
        console.error("Error adding document: ", error);
        alert(`Error saving data: ${error.message}`);
      }
    } else {
      alert("Please fill in all fields including income.");
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2 className="title">
          <Home className="icon" />
          Primary Needs and Expenses
        </h2>
        <form onSubmit={handleSubmit} className="animated-form">
          <div className="input-group">
            <label>Income (₹):</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              required
            />
          </div>
          {Object.entries(expenses).map(([key, value]) => (
            <div key={key} className="input-group">
              <label>{key.charAt(0).toUpperCase() + key.slice(1)} (₹):</label>
              <div className="number-input">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleChange(key, Number(e.target.value))}
                />
                <div className="controls">
                  <button
                    type="button"
                    onClick={() => handleChange(key, value + 100)}
                    className="control-btn"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange(key, Math.max(0, value - 100))}
                    className="control-btn"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button type="submit" className="submit-btn">Next</button>
        </form>
      </div>
    </div>
  );
}

export default PrimaryNeeds;