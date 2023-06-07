import React from "react";
import ProfilePic from "../Assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div id="testimonials" className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
      </div>
      <div className="testimonial-section-bottom">
        <img src={ProfilePic} alt="" />
        <p>
        Meddy Buddy has revolutionized the way I book and manage my doctor appointments. With its user-friendly interface, I can effortlessly find and book appointments with healthcare professionals that suit my needs. The app keeps me informed with timely notifications, ensuring I never miss an important visit. It's a game-changer for anyone seeking a convenient and efficient healthcare experience."</p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>John Doe</h2>
      </div>
    </div>
  );
};

export default Testimonial;
