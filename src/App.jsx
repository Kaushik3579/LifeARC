import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ModeToggle from "./components/ModeToggle";
import IncomeExpenses from "./pages/IncomeExpenses";
import SecondaryInvestments from "./pages/SecondaryInvestments";
import InvestmentSummary from "./pages/InvestmentSummary";
import Login from "./pages/Login";
import SecondaryExpenses from "./pages/SecondaryExpenses";

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
            path="/secondary-expenses"  // Ensure this matches the path in PrimaryNeeds
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Navbar />
                <SecondaryExpenses />
              </React.Suspense>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
