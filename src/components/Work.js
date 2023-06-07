import React from "react";
import PickMeals from "../Assets/pick-meals-image.png";
import ChooseMeals from "../Assets/choose-image.png";
import DeliveryMeals from "../Assets/delivery-image.png";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Search and Discover",
      text: "Explore a vast network of trusted healthcare professionals at your fingertips. Simply enter your search criteria and instantly discover doctors who meet your needs.",
    },
    {
      image: ChooseMeals,
      title: "Book Appointments and Stay Informed",
      text: "Effortlessly schedule appointments that fit your schedule, check available time slots for each doctor and Receive updates on appointment confirmations.",
    },
    {
      image: DeliveryMeals,
      title: "Monitor Appointment Status",
      text: "Easily track the status of your appointments from start to finish. Get notified when your appointment is confirmed or completed.",
    },
  ];
  return (
    <div id="work" className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
