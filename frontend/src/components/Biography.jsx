import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <h6>Biography</h6>
          <p>Welcome to PulsePoint – redefining healthcare</p>
          <p>
            PulsePoint is a modern healthcare center driven by a mission to
            deliver exceptional, patient-focused care. Combining advanced
            medical technology with a compassionate approach, our team is
            dedicated to supporting every step of your health journey. We
            believe in healing with heart, innovation, and integrity.
          </p>
          <p>
            Our platform is designed to streamline hospital operations—from
            patient check-ins and bed tracking to medication inventory and
            dispensation. With a focus on efficiency and care, PulsePoint
            empowers healthcare professionals to deliver better outcomes with
            less hassle.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
