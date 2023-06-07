import React from "react";

const About = () => {
  return (
    <div className="about-section-container">
      {/* <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div> */}
      <div className="about-section-image-container">
        <img src="https://cdn.shopify.com/s/files/1/0720/8186/7039/articles/what-is-healthcare-707998.png?v=1677580538" alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
        Empowering Your Health, One Step at a Time
        </h1>
        <p className="primary-text">
        We believe that taking care of your health should be simple, convenient, and empowering. Whether you're managing chronic conditions or seeking preventive care, our platform provides the tools, resources, and expert guidance you need to make informed decisions about your well-being.
        </p>
        <p className="primary-text">
        Join our community and embark on a journey towards better health today.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
