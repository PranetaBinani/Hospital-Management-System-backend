import React from "react";
import "./Bed.css"; // Import the CSS file

const BedTable = () => {
  return (
    <div className="bed-availability">
      <div className="bed-img-section"></div>

      <div className="bed-content">
        <h2>About Bed Availability</h2>

        <ul className="bed-list">
          <li>
            <span>🛏️</span> Ward-specific bed count and availability
          </li>
          <li>
            <span>🔄</span> Real-time updates on bed occupancy
          </li>
          <li>
            <span>🚑</span> Emergency bed availability for critical patients
          </li>
          <li>
            <span>📊</span> Tracking of vacant, limited, and full beds
          </li>
        </ul>

        <p className="bed-highlight">
          <strong>Why it matters:</strong> Ensures timely care for patients,
          prevents overcrowding, and facilitates better healthcare resource
          management.
        </p>
      </div>
    </div>
  );
};

export default BedTable;
