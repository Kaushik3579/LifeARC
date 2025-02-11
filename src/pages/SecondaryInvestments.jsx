import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Import Firebase database
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods

function SecondaryInvestments() {
  const [expenses, setExpenses] = useState({
    travel: 30000,
    entertainment: 10000,
    medical: 15000,
    luxury: 25000,
  });

  const [investmentDetails, setInvestmentDetails] = useState({
    hasInvestments: false,
    years: 5,
    location: "Mumbai",
  });

  const navigate = useNavigate();

  const handleExpenseChange = (field, delta) => {
    setExpenses(prev => ({
      ...prev,
      [field]: Math.max(0, prev[field] + delta)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(expenses).every((value) => value) && investmentDetails.years && investmentDetails.location) {
      try {
        await addDoc(collection(db, "secondaryInvestments"), {
          expenses,
          investmentDetails,
          timestamp: new Date()
        });
        alert("Data saved successfully!");
        navigate("/investment-summary");
      } catch (error) {
        console.error("Error adding document: ", error);
        alert(`Error saving data: ${error.message}`);
      }
    } else {
      alert("All fields are required.");
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2 className="title">Secondary Expenses & Investments</h2>
        <form onSubmit={handleSubmit} className="animated-form">
          {Object.entries(expenses).map(([key, value]) => (
            <div key={key} className="input-group">
              <label>{key.charAt(0).toUpperCase() + key.slice(1)} (₹):</label>
              <div className="number-input">
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
                <div className="controls">
                  <button type="button" className="control-btn" onClick={() => handleExpenseChange(key, +100)}>+</button>
                  <button type="button" className="control-btn" onClick={() => handleExpenseChange(key, -100)}>-</button>
                </div>
              </div>
            </div>
          ))}

          <div className="investment-section">
            <h3>Investments (Optional)</h3>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  checked={!investmentDetails.hasInvestments}
                  onChange={() =>
                    setInvestmentDetails((prev) => ({
                      ...prev,
                      hasInvestments: false,
                    }))
                  }
                  required
                />
                No
              </label>
              <label>
                <input
                  type="radio"
                  checked={investmentDetails.hasInvestments}
                  onChange={() =>
                    setInvestmentDetails((prev) => ({
                      ...prev,
                      hasInvestments: true,
                    }))
                  }
                  required
                />
                Yes
              </label>
            </div>

            <div className="range-input">
              <label>Select years for projection (1-10):</label>
              <input
                type="range"
                min="1"
                max="10"
                value={investmentDetails.years}
                onChange={(e) =>
                  setInvestmentDetails((prev) => ({
                    ...prev,
                    years: Number(e.target.value),
                  }))
                }
                required
              />
              <span>{investmentDetails.years}</span>
            </div>

            <div className="select-group">
              <label>Select your location:</label>
              <select
                value={investmentDetails.location}
                onChange={(e) =>
                  setInvestmentDetails((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                required
              >
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn">Calculate</button>
        </form>
      </div>
    </div>
  );
}

export default SecondaryInvestments;