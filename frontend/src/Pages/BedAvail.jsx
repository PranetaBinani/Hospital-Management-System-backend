import React from "react";
import Hero from "../components/Hero";
import BedTable from "../components/BedTable";

const BedAvailibility = () => {
  return (
    <>
      <Hero
        title={"Bed Availability"}
        imageUrl={"/bed.png"}
        para={
          "Bed availability refers to the number of beds available in a hospital or healthcare facility for patients. It is crucial for managing patient flow, especially during emergencies or peak times, ensuring timely care and efficient resource allocation. Monitoring bed availability helps prevent overcrowding and reduces waiting times for patients."
        }
      />
      <BedTable />
    </>
  );
};

export default BedAvailibility;
