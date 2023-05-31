import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";

const BookingPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [timings, setTimings] = useState();
  const [isAvailable, setIsAvailable] = useState();

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
            className="my-2"
            format="DD-MM-YYYY"
            onChange={(value) => setDate(moment(value).format("DD-MM-YYYY"))}
          />
          <TimePicker.RangePicker
            format="HH:mm"
            onChange={(values) =>
              setTimings([
                moment(values[0]).format("HH:mm"),
                moment(values[1]).format("HH:mm"),
              ])
            }
          />
        </div>
        <button className="btn btn-primary my-2">Check Availability</button>
      </div>
    </Layout>
  );
};

export default BookingPage;
