import React, { useState } from "react";
import "./OPD.css"; // Import CSS file

const TokenGeneration = () => {
  const [patientName, setPatientName] = useState("");
  const [tokenNumber, setTokenNumber] = useState(null);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState(null);
  const [queueStatus, setQueueStatus] = useState("");

  // Generate a random token number and calculate estimated wait time (for demo purposes)
  const generateTokenAndEstimateWaitTime = () => {
    const token = Math.floor(Math.random() * 1000) + 1;
    const waitTime = Math.floor(Math.random() * 30) + 5; // Simulate wait time between 5 and 35 minutes

    setTokenNumber(token);
    setEstimatedWaitTime(waitTime);
    setQueueStatus("In Queue");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (patientName) {
      generateTokenAndEstimateWaitTime();
    } else {
      alert("Please enter your name to get a token.");
    }
  };

  return (
    <div className="token-generation-container">
      <h3>Enter Your Details to Get a Token</h3>
      <form onSubmit={handleSubmit} className="token-form">
        <input
          type="text"
          placeholder="Enter Your Registered Number"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="token-input"
        />
        <button type="submit" className="token-button">
          Get Token
        </button>
      </form>

      {tokenNumber && (
        <div className="token-info">
          <h4>Your Queue Information</h4>
          <p>
            <strong>Token Number:</strong> {tokenNumber}
          </p>
          <p>
            <strong>Current Queue Status:</strong> {queueStatus}
          </p>
          <p>
            <strong>Estimated Wait Time:</strong> {estimatedWaitTime} minutes
          </p>
        </div>
      )}
    </div>
  );
};

export default TokenGeneration;
