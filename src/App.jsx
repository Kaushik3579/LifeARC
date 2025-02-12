import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ModeToggle from "./components/ModeToggle";
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

function App() {
  console.log("Rendering App component"); // Add debug log

  return (
    <Router>
      <div className="app-container">
        <ModeToggle />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/income-expenses"
            element={
              <>
                <Navbar />
                <IncomeExpenses />
              </>
            }
          />
          <Route
            path="/secondary-investments"
            element={
              <>
                <Navbar />
                <SecondaryInvestments />
              </>
            }
          />
          <Route
            path="/investment-summary"
            element={
              <>
                <Navbar />
                <InvestmentSummary />
              </>
            }
          />
          <Route
            path="/secondary-expenses"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Navbar />
                <SecondaryExpenses />
              </React.Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/review-details"
            element={
              <>
                <Navbar />
                <ReviewDetails />
              </>
            }
          />
          <Route
            path="/primary-needs"
            element={
              <>
                <Navbar />
                <PrimaryNeeds />
              </>
            }
          />
          <Route
            path="/visualization"
            element={
              <>
                <Navbar />
                <Visualization />
              </>
            }
          />
          <Route
            path="/expense-tracker"
            element={
              <>
                <Navbar />
                <ExpenseTracker />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
