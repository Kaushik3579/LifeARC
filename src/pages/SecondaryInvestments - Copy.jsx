import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SecondaryInvestments() {
  const [investment, setInvestment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ investment });
    navigate("/additional-details");
  };

  return (
    <div className="container">
      <h2>Investments</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Investment Amount" value={investment} onChange={(e) => setInvestment(e.target.value)} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default SecondaryInvestments;
