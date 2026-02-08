import React, { useState } from "react";
import "./index.css";

function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [yourSatisfaction, setYourSatisfaction] = useState(10);
  const [friendSatisfaction, setFriendSatisfaction] = useState(10);

  const handleBillAmountChange = (e) => {
    e.preventDefault();
    setBillAmount(() =>
      Number(e.target.value) < 0 ? 0 : Number(e.target.value)
    );
  };

  const handleYourSelect = (e) => {
    e.preventDefault();
    setYourSatisfaction(() => Number(e.target.value));
  };

  const handleFriendSelect = (e) => {
    e.preventDefault();
    setFriendSatisfaction(() => Number(e.target.value));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setBillAmount(0);
    setYourSatisfaction(10);
    setFriendSatisfaction(10);
  };

  return (
    <div className="app">
      <h1>Tip Calculator</h1>
      <hr />
      <div className="calculator">
        <BillAmount
          billAmount={billAmount}
          handleBillAmountChange={handleBillAmountChange}
        />

        <Satisfaction
          satisfaction={yourSatisfaction}
          setSatisfaction={handleYourSelect}
        >
          What Was Your Satisfaction Level?
        </Satisfaction>

        <Satisfaction
          satisfaction={friendSatisfaction}
          setSatisfaction={handleFriendSelect}
        >
          What Was Your Friend's Satisfaction Level?
        </Satisfaction>
      </div>
      <hr />
      <TotalBill
        billAmount={billAmount}
        yourSatisfaction={yourSatisfaction}
        friendSatisfaction={friendSatisfaction}
      />
      <hr />
      <ResetComponent handleReset={handleReset} />
    </div>
  );
}

function BillAmount({ billAmount, handleBillAmountChange }) {
  return (
    <div className="bill-amount">
      <label>How Much Was The Bill Amount?</label>
      <input
        type="number"
        value={billAmount}
        placeholder="Enter bill amount..."
        onChange={handleBillAmountChange}
      />
    </div>
  );
}

// Better for Reusability Purposes...
function Satisfaction({ satisfaction, setSatisfaction, children }) {
  return (
    <div className="satisfaction">
      <label>{children}</label>
      <select value={satisfaction} onChange={setSatisfaction}>
        <option value={0}>Very Dissatisfied (0%)</option>
        <option value={5}>Dissatisfied (5%)</option>
        <option value={10}>Neutral (10%)</option>
        <option value={15}>Satisfied (15%)</option>
        <option value={20}>Very Satisfied (20%)</option>
      </select>
    </div>
  );
}

function TotalBill({ billAmount, yourSatisfaction, friendSatisfaction }) {
  let averageSatisfaction = (yourSatisfaction + friendSatisfaction) / 2;
  let tipAmount = (billAmount * averageSatisfaction) / 100;
  let totalBill = billAmount + tipAmount;

  return (
    <div className="total-bill">
      <h2>Total Bill Amount: ${totalBill.toFixed(2)}</h2>
      <h3>Average Satisfaction: {averageSatisfaction.toFixed(2)}%</h3>
      <h2>
        You Pay ${totalBill.toFixed(2)} (${billAmount.toFixed(2)} + $
        {tipAmount.toFixed(2)} tip)
      </h2>
    </div>
  );
}

function ResetComponent({ handleReset }) {
  return (
    <div className="reset-component">
      <button className="reset-btn" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default App;
