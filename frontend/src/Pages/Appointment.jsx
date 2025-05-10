import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | PulsePoint"}
        imageUrl={"/signin.png"}
        para = {"Our appointment system is designed to simplify and streamline patient scheduling. Whether you're visiting for a routine checkup or a specialist consultation, you can easily book, view, or manage your appointments online. With real-time availability, automated confirmations, and reminders, PulsePoint ensures a smooth and hassle-free experience for both patients and healthcare providers."}
      />
      <AppointmentForm/>
    </>
  );
};

export default Appointment;
