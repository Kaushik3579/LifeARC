import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function SecondaryExpenses() {
  const [expenses, setExpenses] = useState({
    travel: 30000,
    entertainment: 10000,
    medical: 15000,
    luxury: 25000
  });

  const [investmentDetails, setInvestmentDetails] = useState({
    hasInvestments: false,
    years: 5,
    location: 'Mumbai'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Saving data to Firebase...');
      const docRef = await addDoc(collection(db, "secondaryExpenses"), {
        expenses,
        investmentDetails,
        timestamp: new Date()
      });
      
      console.log('Document written with ID: ', docRef.id);
      alert('Data saved successfully!');
      navigate("/investment-summary");
      
    } catch (error) {
      console.error("Error saving data: ", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("Rendering SecondaryExpenses component"); // Add debug log

  return (
    <div className="page-container" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div className="form-container" style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
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
                    setExpenses(prev => ({
                      ...prev,
                      [key]: Number(e.target.value)
                    }))
                  }
                />
                <div className="controls">
                  <button type="button" className="control-btn">+</button>
                  <button type="button" className="control-btn">-</button>
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
                    setInvestmentDetails(prev => ({
                      ...prev,
                      hasInvestments: false
                    }))
                  }
                />
                No
              </label>
              <label>
                <input
                  type="radio"
                  checked={investmentDetails.hasInvestments}
                  onChange={() => 
                    setInvestmentDetails(prev => ({
                      ...prev,
                      hasInvestments: true
                    }))
                  }
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
                  setInvestmentDetails(prev => ({
                    ...prev,
                    years: Number(e.target.value)
                  }))
                }
              />
              <span>{investmentDetails.years}</span>
            </div>

            <div className="select-group">
              <label>Select your location:</label>
              <select
                value={investmentDetails.location}
                onChange={(e) => 
                  setInvestmentDetails(prev => ({
                    ...prev,
                    location: e.target.value
                  }))
                }
              >
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Calculate'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SecondaryExpenses;