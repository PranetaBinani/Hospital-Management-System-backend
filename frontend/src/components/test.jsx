import React, { useState } from "react";
import "./BookTest.css";

const BookTest = () => {
  const [patientName, setPatientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [testType, setTestType] = useState("Blood Test");
  const [bookingStatus, setBookingStatus] = useState(null);
  const [testDetails, setTestDetails] = useState(null);

  const testTypes = [
    "Blood Test",
    "X-Ray",
    "Ultrasound",
    "ECG",
    "MRI Scan",
    "CT Scan",
    "Urine Test"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (patientName && phoneNumber) {
      // Simulate booking confirmation
      const bookingId = "BK-" + Math.floor(Math.random() * 10000);
      const testTime = new Date();
      testTime.setHours(testTime.getHours() + 2);
      
      setBookingStatus("Confirmed");
      setTestDetails({
        bookingId,
        patientName,
        testType,
        testTime: testTime.toLocaleString(),
        instructions: "Fasting required for 8 hours before the test"
      });
    } else {
      alert("Please enter your name and phone number");
    }
  };

  return (
    <div className="book-test-container">
      <h3>Book Your Medical Test</h3>
      <form onSubmit={handleSubmit} className="book-test-form">
        <input
          type="text"
          placeholder="Your Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="book-test-input"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="book-test-input"
        />
        <select
          value={testType}
          onChange={(e) => setTestType(e.target.value)}
          className="book-test-select"
        >
          {testTypes.map((test) => (
            <option key={test} value={test}>{test}</option>
          ))}
        </select>
        <button type="submit" className="book-test-button">
          Book Test
        </button>
      </form>

      {bookingStatus && (
        <div className="test-confirmation">
          <h4>Test Booking Confirmation</h4>
          <p><strong>Status:</strong> {bookingStatus}</p>
          <p><strong>Booking ID:</strong> {testDetails.bookingId}</p>
          <p><strong>Patient Name:</strong> {testDetails.patientName}</p>
          <p><strong>Test Type:</strong> {testDetails.testType}</p>
          <p><strong>Scheduled Time:</strong> {testDetails.testTime}</p>
          <p><strong>Instructions:</strong> {testDetails.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default BookTest;