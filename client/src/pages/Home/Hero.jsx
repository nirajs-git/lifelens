import React from "react";
import HeroImage from "../../assets/img/home/hero-image.svg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="hero"
      className="md:grid max-md:flex max-md:flex-col max-md:gap-7 md:grid-cols-hero place-items-center bg-white opacity-90 px-14 md:px-8 h-[calc(100vh-64px)]"
    >
      <div className="max-md:mt-14">
        <img src={HeroImage} alt="" />
      </div>
      <div
        id="hero-header"
        className="flex flex-col max-md:items-center gap-8 md:pl-14"
      >
        <div className="max-lg:text-[2rem] lg:text-[3rem] max-md:text-[1.6rem] sm:text[1.2rem] max-md:text-center font-extrabold text-dark">
          <h1>
            Life<span className="text-green">Lens</span> - Illuminating Path to
            Wellness
          </h1>
        </div>
        <p className="leading-6 max-md:text-center text-justify">
          LifeLens is a comprehensive healthcare platform designed to empower
          doctors in managing patient care effectively. It offers seamless
          patient management features, allowing doctors to maintain detailed
          health records and access comprehensive patient information.
          Additionally, LifeLens integrates advanced AI-powered risk assessment
          capabilities, enabling doctors to assess patient risks accurately and
          proactively address health concerns. With LifeLens, doctors can make
          informed decisions, deliver personalized care, and enhance patient
          outcomes for a healthier future.
        </p>
        <Link to={'/sign-up'}>
          <button className="btn-transition font-bold px-4 py-2 bg-green text-white rounded-lg border border-green hover:bg-white hover:text-green hover:border-green shadow-xl">
            Sign Up
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
