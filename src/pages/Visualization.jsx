import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, where, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { FaPen } from "react-icons/fa"; // Import Pen Icon

// Add mapping function
const getCollectionName = (title) => {
  const map = {
    "Primary Needs": "primaryNeeds",
    "Secondary Expenses": "secondaryExpenses",
    "Secondary Investments": "secondaryInvestments",
    "Investment Summary": "investmentSummary",
  };
  return map[title] || title;
};

function Visualization() {
  const [primaryNeeds, setPrimaryNeeds] = useState([]);
  const [secondaryExpenses, setSecondaryExpenses] = useState([]);
  const [secondaryInvestments, setSecondaryInvestments] = useState([]);
  const [investmentSummary, setInvestmentSummary] = useState([]);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? currentUser : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!user) return;

      try {
        const fetchCollectionData = async (collectionName) => {
          const q = query(collection(db, collectionName), where("userId", "==", user.uid));
          const snapshot = await getDocs(q);
          return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        };

        const [primary, expenses, investments, summary] = await Promise.all([
          fetchCollectionData("primaryNeeds"),
          fetchCollectionData("secondaryExpenses"),
          fetchCollectionData("secondaryInvestments"),
          fetchCollectionData("investmentSummary"),
        ]);

        setPrimaryNeeds(primary);
        setSecondaryExpenses(expenses);
        setSecondaryInvestments(investments);
        setInvestmentSummary(summary);
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      }
    };

    fetchDetails();
  }, [user]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`visualization-container ${darkMode ? "dark" : ""}`}>
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <h2>Visualization</h2>
      <div className="details-container">
        <DetailsSection title="Primary Needs" data={primaryNeeds} setData={setPrimaryNeeds} />
        <DetailsSection title="Secondary Expenses" data={secondaryExpenses} setData={setSecondaryExpenses} />
        <DetailsSection title="Secondary Investments" data={secondaryInvestments} setData={setSecondaryInvestments} />
        <DetailsSection title="Investment Summary" data={investmentSummary} setData={setInvestmentSummary} />
      </div>
    </div>
  );
}

// Reusable component for structured display
const DetailsSection = ({ title, data, setData }) => {
  const [editableField, setEditableField] = useState(null);
  const [modifiedData, setModifiedData] = useState({});

  const handleEdit = (id, key, value) => {
    setEditableField({ id, key });
    setModifiedData({ [key]: value });
  };

  const handleChange = (e, key) => {
    setModifiedData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleSave = async (id, titleParam) => {
    if (!modifiedData) return;
    const collectionName = getCollectionName(titleParam);
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, modifiedData); // changed here

      setEditableField(null);
      setModifiedData({});
      alert("Data updated successfully!");

      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, ...modifiedData } : item
        )
      );
    } catch (error) {
      console.error("Error updating Firestore:", error);
      alert(`Error updating data: ${error.message}`);
    }
  };

  return (
    <div className="section-container">
      <h3 className="section-title">{title}</h3>
      {data.length > 0 ? (
        <div className="details-container">
          {data.map((detail) => (
            <div key={detail.id} className="details-box">
              {Object.entries(detail).map(([key, value]) => (
                key !== "userId" && key !== "timestamp" && key !== "id" && (
                  <div key={key} className="detail-item">
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                    {typeof value === "object" ? (
                      <NestedObjectDisplay
                        parentId={detail.id}
                        collectionName={title}
                        parentField={key} // pass the field key
                        data={value}
                        setData={setData}
                      />
                    ) : (
                      <>
                        {value}
                        <FaPen className="edit-icon" onClick={() => handleEdit(detail.id, key, value)} />
                      </>
                    )}
                  </div>
                )
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No {title.toLowerCase()} found.</p>
      )}
    </div>
  );
};

const NestedObjectDisplay = ({ parentId, collectionName: titleParam, parentField, data, setData }) => {
  const [editableField, setEditableField] = useState(null);
  const [modifiedData, setModifiedData] = useState({});

  const handleEdit = (key, value) => {
    setEditableField(key);
    setModifiedData({ [key]: value });
  };

  const handleChange = (e, key) => {
    setModifiedData({ [key]: e.target.value });
  };

  const handleSave = async () => {
    if (!modifiedData) return;
    const collectionName = getCollectionName(titleParam);
    try {
      const docRef = doc(db, collectionName, parentId);
      // Use dot-notation to update the nested property
      await updateDoc(docRef, { [`${parentField}.${editableField}`]: modifiedData[editableField] });
      
      setEditableField(null);
      setModifiedData({});
      alert("Sub-field updated successfully!");
      
      setData((prevData) =>
        prevData.map((item) =>
          item.id === parentId
            ? { ...item, [parentField]: { ...item[parentField], [editableField]: modifiedData[editableField] } }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating Firestore:", error);
      alert(`Error updating sub-field: ${error.message}`);
    }
  };

  return (
    <div className="nested-object-container">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="nested-detail-item">
          <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
          {editableField === key ? (
            <>
              <input
                type="text"
                value={modifiedData[key]}
                onChange={(e) => handleChange(e, key)}
                className="editable-input"
              />
              <button onClick={handleSave} className="save-btn">Save</button>
            </>
          ) : (
            <>
              {value}
              <FaPen className="edit-icon" onClick={() => handleEdit(key, value)} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Visualization;
