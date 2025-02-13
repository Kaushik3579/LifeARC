import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IncomeExpenses from "./pages/IncomeExpenses";
import SecondaryInvestments from "./pages/SecondaryInvestments";
import InvestmentSummary from "./pages/InvestmentSummary";
import Login from "./pages/Login";
import SecondaryExpenses from "./pages/SecondaryExpenses";
import Dashboard from "./pages/Dashboard"; // Import Dashboard component
import ReviewDetails from "./pages/ReviewDetails"; // Import ReviewDetails component
import PrimaryNeeds from "./pages/PrimaryNeeds"; // Import PrimaryNeeds component
import Visualization from "./pages/Visualization"; // Import Visualization component
import ExpenseTracker from "./pages/ExpenseTracker"; // new import
import UserDetails from "./pages/UserDetails"; // Import UserDetails component

function App() {
  console.log("Rendering App component"); // Add debug log

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/income-expenses" element={<IncomeExpenses />} />
          <Route path="/secondary-investments" element={<SecondaryInvestments />} />
          <Route path="/investment-summary" element={<InvestmentSummary />} />
          <Route path="/secondary-expenses" element={<React.Suspense fallback={<div>Loading...</div>}><SecondaryExpenses /></React.Suspense>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/review-details" element={<ReviewDetails />} />
          <Route path="/primary-needs" element={<PrimaryNeeds />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="/user-details" element={<UserDetails />} /> {/* New route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
