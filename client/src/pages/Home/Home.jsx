import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="home" className="flex flex-col items-center w-full">
      <Hero />
      <section
        id="about"
        className="max-md:flex max-md:flex-col max-md:gap-7 md:grid-cols-about place-items-center bg-slate-50 opacity-90 px-30 py-[2rem] md:px-8"
      >
        <div
          id="about-content"
          className="flex flex-col justify-center items-center max-md:items-center gap-8 px-30"
        >
          <div className="max-lg:text-[2rem] lg:text-[3rem] max-md:text-[1.6rem] sm:text[1.2rem] max-md:text-center font-extrabold text-dark">
            <h1>
              Life<span className="text-green">Lens</span> - Transforming
              Healthcare
            </h1>
          </div>
          <p className="leading-6 max-md:text-center text-center">
            LifeLens is a revolutionary healthcare platform designed to enhance
            patient care and streamline healthcare processes. Our platform
            empowers healthcare professionals with advanced tools for
            comprehensive patient management and accurate risk assessment. By
            seamlessly integrating AI technology, LifeLens enables doctors to
            make informed decisions, deliver personalized care, and improve
            patient outcomes significantly.
          </p>
        </div>
      </section>

      <Features />
    </div>
  );
};

export default Home;
