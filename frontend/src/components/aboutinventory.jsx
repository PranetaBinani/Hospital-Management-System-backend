import React from "react";
import "./AboutInventory.css"; // Import the CSS file

const AboutInventory = () => {
  return (
    <div className="about-inventory">
      <div className="inventory-img-section"></div>

      <div className="inventory-content">
        <h2>About Inventory Management</h2>

        <ul className="inventory-list">
          <li>
            <span>🧰</span> Medical supplies{" "}
            <em>(syringes, gloves, bandages, etc.)</em>
          </li>
          <li>
            <span>💊</span> Medications with expiry tracking and reordering
          </li>
          <li>
            <span>🛠️</span> Equipment like ventilators and diagnostic tools
          </li>
          <li>
            <span>😷</span> PPE such as masks and protective gowns
          </li>
        </ul>

        <p className="inventory-highlight">
          <strong>Why it matters:</strong> It prevents stockouts, reduces
          overstocking and waste generation, improves patient care, supports
          budgeting, and enables real-time tracking to keep hospitals running
          smoothly.
        </p>
      </div>
    </div>
  );
};

export default AboutInventory;
