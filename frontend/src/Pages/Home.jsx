// import React, { useContext } from "react";
// import Hero from "../components/Hero";
// import Biography from "../components/Biography";
// import MessageForm from "../components/MessageForm";
// import Departments from "../components/Departments";
// import ChatBot from "../ChatBot";

// const Home = () => {
//   return (
//     <>
//       <Hero
//         title={
//           "Welcome to PulsePoint | Your Trusted Healthcare Provider"
//         }
//         imageUrl={"/hero.png"}
//         para = {"PulsePoint is your one-stop solution for smart and integrated hospital management. From booking appointments and managing OPD queues to tracking bed availability and inventory, our platform streamlines every step of the healthcare journey. Designed for efficiency and ease, PulsePoint empowers hospitals to deliver faster, better, and more personalized care."}
//       />
//       <Biography imageUrl={"/about.png"} />
//       <ChatBot />
//       <Departments />
//       <MessageForm />
//     </>
//   );
// };

// export default Home;

import React from "react";
import { useState } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";
import ChatBot from "../components/ChatBot";

const Home = () => {
  const [chatVisible, setChatVisible] = useState(false);
  return (
    <>
      <Hero
        title={"Welcome to PulsePoint | Your Trusted Healthcare Provider"}
        imageUrl={"/hero.png"}
        para={
          "PulsePoint is your one-stop solution for smart and integrated hospital management. From booking appointments and managing OPD queues to tracking bed availability and inventory, our platform streamlines every step of the healthcare journey. Designed for efficiency and ease, PulsePoint empowers hospitals to deliver faster, better, and more personalized care."
        }
      />
      <Biography imageUrl={"/about.png"} />

      {/* ChatBot Floating Button Section */}
      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
        <button
          onClick={() => setChatVisible((prev) => !prev)} // toggle visibility
          style={{
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: 60,
            height: 60,
            fontSize: 24,
            cursor: "pointer",
          }}
        >
          💬
        </button>
      </div>

      {/* ChatBot Section */}
      {chatVisible && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            backgroundColor: "#f0f4f8",
            padding: "20px",
            width: 500,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            borderRadius: 10,
            zIndex: 999,
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: 10, fontSize: 16 }}>
            💬 Ask PulsePoint
          </h2>
          <ChatBot />
        </div>
      )}

      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;