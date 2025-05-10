import React, { useState } from "react";
import Hero from "../components/Hero";
import OPD from "../components/OPD";
const OPD_Queuing = () => {
  return (
    <>
      <Hero
        title={"Welcome to OPD Queuing"}
        imageUrl={"/time.png"}
        para={
          "PulsePoint’s OPD Queuing system helps reduce wait times and improve patient flow by managing outpatient department queues efficiently. Patients can check their token number, current queue status, and estimated wait time—all in real time. With a user-friendly interface and digital queue tracking, we ensure a seamless experience for both patients and hospital staff."
        }
      />
      <OPD />
    </>
  );
};

export default OPD_Queuing;
