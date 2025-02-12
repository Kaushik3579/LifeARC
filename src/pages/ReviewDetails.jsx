import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase"; // Ensure Firebase auth is properly imported
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function ReviewDetails() {
  const [primaryNeeds, setPrimaryNeeds] = useState([]);
  const [secondaryExpenses, setSecondaryExpenses] = useState([]);
  const [secondaryInvestments, setSecondaryInvestments] = useState([]);
  const [investmentSummary, setInvestmentSummary] = useState([]);
  const [user, setUser] = useState(null); // Track authenticated user
  const [isEditing, setIsEditing] = useState(false); // Track editing state

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!user) return; // Wait until user is set

      try {
        const fetchCollectionData = async (collectionName) => {
          const q = query(collection(db, collectionName), where("userId", "==", user.uid));
          const snapshot = await getDocs(q);
          return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        };

        // Run all queries in parallel
        const [primary, expenses, investments, summary] = await Promise.all([
          fetchCollectionData("primaryNeeds"),
          fetchCollectionData("secondaryExpenses"),
          fetchCollectionData("secondaryInvestments"),
          fetchCollectionData("investmentSummary"),
        ]);

        // Update state
        setPrimaryNeeds(primary);
        setSecondaryExpenses(expenses);
        setSecondaryInvestments(investments);
        setInvestmentSummary(summary);
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      }
    };

    fetchDetails();
  }, [user]); // Refetch when the user changes

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async (collectionName, id, updatedData) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, updatedData);
      alert("Data updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
      alert(`Error updating data: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <button onClick={handleEditToggle} className="edit-btn">
        {isEditing ? "Cancel" : "Edit"}
      </button>
      <h2>Review Your Details</h2>

      <DetailsSection
        title="Primary Needs"
        data={primaryNeeds}
        isEditing={isEditing}
        onSave={(id, updatedData) => handleSave("primaryNeeds", id, updatedData)}
      />
      <DetailsSection
        title="Secondary Expenses"
        data={secondaryExpenses}
        isEditing={isEditing}
        onSave={(id, updatedData) => handleSave("secondaryExpenses", id, updatedData)}
      />
      <DetailsSection
        title="Secondary Investments"
        data={secondaryInvestments}
        isEditing={isEditing}
        onSave={(id, updatedData) => handleSave("secondaryInvestments", id, updatedData)}
      />
      <DetailsSection
        title="Investment Summary"
        data={investmentSummary}
        isEditing={isEditing}
        onSave={(id, updatedData) => handleSave("investmentSummary", id, updatedData)}
      />
    </div>
  );
}

// Reusable component for structured display
const DetailsSection = ({ title, data, isEditing, onSave }) => {
  const [editableData, setEditableData] = useState(data);

  useEffect(() => {
    setEditableData(data);
  }, [data]);

  const handleChange = (index, key, value) => {
    const updatedData = [...editableData];
    updatedData[index][key] = value;
    setEditableData(updatedData);
  };

  return (
    <>
      <h3>{title}</h3>
      {editableData.length > 0 ? (
        <div className="details-container">
          {editableData.map((detail, index) => (
            <div key={index} className="details-box">
              {Object.entries(detail).map(([key, value]) => (
                key !== "userId" && key !== "timestamp" && (
                  <div key={key} className="detail-item">
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleChange(index, key, Number(e.target.value))}
                      />
                    ) : (
                      typeof value === "object" && value !== null ? (
                        <NestedObjectDisplay data={value} />
                      ) : (
                        value
                      )
                    )}
                  </div>
                )
              ))}
              {isEditing && (
                <button onClick={() => onSave(detail.id, detail)} className="save-btn">
                  Save
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No {title.toLowerCase()} found.</p>
      )}
    </>
  );
};

// Function to properly display nested objects (expenses, investment details)
const NestedObjectDisplay = ({ data }) => (
  <div style={{ paddingLeft: "20px" }}>
    {Object.entries(data).map(([key, value]) => (
      <div key={key}>
        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {JSON.stringify(value)}
      </div>
    ))}
  </div>
);

export default ReviewDetails;
