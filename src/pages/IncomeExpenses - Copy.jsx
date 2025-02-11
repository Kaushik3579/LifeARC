import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function IncomeExpenses() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ income, expenses });
    navigate("/secondary-investments");
  };

  return (
    <div className="container">
      <h2>Income & Expenses</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Income" value={income} onChange={(e) => setIncome(e.target.value)} />
        <input type="number" placeholder="Expenses" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default IncomeExpenses;
