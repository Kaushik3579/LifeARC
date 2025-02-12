import React, { useState, useMemo, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { auth, db, onAuthStateChanged } from "../firebase";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function ExpenseTracker() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchExpenses(currentUser.uid);
      } else {
        setUser(null);
        setExpenses([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchExpenses = async (userId) => {
    try {
      const q = query(
        collection(db, "expenses"),
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const fetchedExpenses = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExpenses(fetchedExpenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (date && amount && user) {
      const newExpense = { 
        date, 
        amount: Number(amount), 
        userId: user.uid, 
        timestamp: new Date()
      };
      try {
        await addDoc(collection(db, "expenses"), newExpense);
        fetchExpenses(user.uid);
        setDate("");
        setAmount("");
      } catch (error) {
        console.error("Error adding expense:", error);
      }
    } else {
      console.error("Missing date, amount, or user");
    }
  };

  const aggregatedData = useMemo(() => {
    const agg = {};
    expenses.forEach(({ date, amount }) => {
      const month = date.slice(0, 7);
      agg[month] = (agg[month] || 0) + amount;
    });
    const sortedMonths = Object.keys(agg).sort();
    const result = {
      labels: sortedMonths,
      data: sortedMonths.map(month => agg[month]),
    };
    console.log("Aggregated Data:", result);
    return result;
  }, [expenses]);

  const chartData = {
    labels: aggregatedData.labels,
    datasets: [
      {
        label: "Monthly Expenses",
        data: aggregatedData.data,
        fill: false,
        borderColor: "#36A2EB",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="expense-tracker-container">
      <h2>Expense Tracker</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Month:</label>
          <input 
            type="month" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Expenditure (₹):</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
      <div className="chart-container">
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default ExpenseTracker;
