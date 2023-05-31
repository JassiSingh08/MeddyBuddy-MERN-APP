import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertslice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();

  const dispatch = useDispatch();

  const Params = useParams();
  //login user data
  const getDoctordata = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: Params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //BOOKING

  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: Params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctordata();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Booking Page</h1>
      <div className="card container m-3" style={{ maxWidth: "30%" }}>
        {doctors && (
          <div className=" card-header m-2" style={{ backgroundColor: "#fff" }}>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>fees : {doctors.ConsultationFee}</h4>
          </div>
        )}
        {doctors.timings &&
          Array.isArray(doctors.timings) &&
          doctors.timings.length > 0 && (
            <h4 className="m-1 text-center">
              Timings : {doctors.timings[0]} - {doctors.timings[1]}
            </h4>
          )}
        <div className="d-flex flex-column card-body">
          <DatePicker
            className="m-2"
            format="DD-MM-YYYY"
            onChange={(value) => setDate(moment(value).format("DD-MM-YYYY"))}
          />
          <TimePicker
            format="HH:mm"
            className="m-2"
            onChange={(value) => {
              setTime(moment(value).format("HH:mm"));
            }}
          />
        </div>
        <button className="btn btn-primary my-2">Check Availability</button>
        <button className="btn btn-dark my-2" onClick={handleBooking}>
          Book Now
        </button>
      </div>
    </Layout>
  )
};

export default BookingPage;
