import React from "react";
import Hero from "../components/Hero";
import AboutInventory from "../components/aboutinventory";

const Inventory = () => {
  return (
    <>
      <Hero
        title={"Inventory Management"}
        imageUrl={"/inventory.png"}
        para={
          "Manage your inventory with ease. PulsePoint’s inventory system helps hospitals keep track of essential supplies, equipment, and medicine stocks. Efficient inventory management ensures timely replenishment, prevents stockouts, and optimizes hospital resources for better patient care."
        }
      />
      <AboutInventory />
    </>
  );
};

export default Inventory;
