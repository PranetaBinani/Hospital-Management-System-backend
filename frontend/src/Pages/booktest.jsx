import React from "react";
import Hero from "../components/Hero";
import Test from "../components/test";

const BookTest = () => {
  return (
    <>
      <Hero
        title={"Book a Test"}
        imageUrl={"/test.jpg"}
        para={
          "Booking a test refers to scheduling medical diagnostic procedures such as blood tests, X-rays, or MRI scans. It is essential for early detection, accurate diagnosis, and effective treatment planning. Ensuring a smooth and timely test booking process helps reduce patient anxiety, speeds up clinical decisions, and improves overall healthcare outcomes. Efficient test scheduling also optimizes resource usage within healthcare facilities."
        }
      />
      <Test />
    </>
  );
};

export default BookTest;
