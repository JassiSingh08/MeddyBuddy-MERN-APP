import React from "react";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img
            src="https://img.freepik.com/free-vector/group-medical-staff-carrying-health-related-icons_53876-43071.jpg"
            alt=""
          />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Your Health, Our Priority: Quality Care Delivered with Compassion
          </h1>
          <p className="primary-text">
            Empowering Your Wellness Journey: Simplifying Healthcare with
            Innovative Tools and Expert Guidance
          </p>

          <Link className="primary-button" style={{border: "1px solid", borderRadius:"50px", textDecoration:"none"}} to="/register">
              Lets Get You Started <FiArrowRight />
          </Link>
        </div>
        <div className="home-image-section">
          <img
            src="https://img.freepik.com/free-vector/group-medical-staff-carrying-health-related-icons_53876-43071.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
