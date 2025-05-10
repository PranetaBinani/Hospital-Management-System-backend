import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us "}
        para = {"PulsePoint is a cutting-edge healthcare facility focused on delivering comprehensive, compassionate care. Our expert team provides personalized treatment tailored to each individual, prioritizing your well-being and guiding you toward optimal health and wellness."}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
    </>
  );
};

export default AboutUs;
