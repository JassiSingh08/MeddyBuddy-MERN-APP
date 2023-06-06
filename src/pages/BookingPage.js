import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
// import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertslice";
// import { Button, Card, Col, Container, Row } from "react-bootstrap";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      if (!date && !time) {
        return alert("Date and Time Required");
      }
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
        navigate("/");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const HandleAvailability = async () => {
    try {
      if (!date && !time) {
        return alert("Date and Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availability",
        {
          doctorId: Params.doctorId,
          date,
          time,
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
      } else {
        message.error(res.data.message);
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
    // <Layout>
    //   <h1 className="text-center">Booking Page</h1>
    //   <div  style={{ maxWidth: "90vw" }}>
    //     {doctors && (
    //       <div  style={{ backgroundColor: "#fff" }}>
    //         <h4 className="text-center">
    //           Dr. {doctors.firstName} {doctors.lastName}
    //         </h4>
    //         <div className="text-center my-3">
    //           <b >Consultation fees </b> : {doctors.ConsultationFee} /-
    //         </div>
    //       </div>
    //     )}
    //     {doctors.timings && doctors.timings.length > 1
    //       ? (() => {
    //           const startTime = new Date(doctors.timings[0]);
    //           const endTime = new Date(doctors.timings[1]);

    //           const formattedStartTime = startTime.toLocaleTimeString([], {
    //             hour: "numeric",
    //             minute: "numeric",
    //           });
    //           const formattedEndTime = endTime.toLocaleTimeString([], {
    //             hour: "numeric",
    //             minute: "numeric",
    //           });

    //           return (
    //             <div className="text-center my-3">
    //               <b className="m-2 ">Timings</b>: {formattedStartTime} -{" "}
    //               {formattedEndTime}
    //             </div>
    //           );
    //         })()
    //       : null}

    //     <div className="d-flex flex-column card-body">
    //       <DatePicker
    //         className="m-2"
    //         format="DD-MM-YYYY"
    //         onChange={(value) => {
    //           const dateObj = new Date(value);
    //           const year = dateObj.getFullYear();
    //           const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    //           const day = dateObj.getDate().toString().padStart(2, '0');
    //           const formattedDate = `${day}-${month}-${year}`;
    //           console.log(formattedDate);
    //           setDate(formattedDate);
    //         }}
    //       />
    //       <TimePicker
    //         format="HH:mm"
    //         className="m-2"
    //         onChange={(value) => {
    //           console.log(value);
    //           const selectedTime = new Date(value); // Convert value to a Date object
    //           const hours = selectedTime.getHours().toString().padStart(2, '0');
    //           const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
    //           const formattedTime = `${hours}:${minutes}`;
    //           console.log(formattedTime)
    //           setTime(formattedTime);
    //           // const formattedTime = moment(value).format("HH:mm")
    //           // setTime(formattedTime);
    //         }}
    //       />
    //     </div>
    //     <button className="btn btn-primary my-2" onClick={HandleAvailability}>
    //       Check Availability
    //     </button>
    //     <button className="btn btn-dark my-2" onClick={handleBooking}>
    //         Book Now
    //       </button>
    //   </div>

    // </Layout>
    <Layout>
      <h1 className="text-center" style={{ paddingTop: "5px" }}>
        Booking page
      </h1>
      <h6 className="text-center m-3">
        *Please Select the desired Date and Time!
      </h6>
      <div className="main-body">

        <div className="card-body">
        <div className="d-flex flex-row align-items-center mb-4">
          <i className="fa-solid fa-user-doctor fa-lg me-3 fa-fw"></i>
          <div className="form-outline flex-fill mb-0">
            <label className="form-label" htmlFor="name">
            Doctor's Name:
            </label>
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              disabled
              value={`Dr. ${doctors.firstName} ${doctors.lastName}`}
            />
          </div>
        </div>
        <div className="d-flex flex-row align-items-center mb-4">
        <i class="fa-solid fa-money-check-dollar fa-lg me-3 fa-fw"></i>
          <div className="form-outline flex-fill mb-0">
            <label className="form-label" htmlFor="name">
            Consultation fees:
            </label>
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              disabled
              value={`${doctors.ConsultationFee} /-`}
            />
          </div>
        </div>
        {doctors.timings && doctors.timings.length > 1
                && (() => {
                    const startTime = new Date(doctors.timings[0]);
                    const endTime = new Date(doctors.timings[1]);

                    const formattedStartTime = startTime.toLocaleTimeString(
                      [],
                      {
                        hour: "numeric",
                        minute: "numeric",
                      }
                    );
                    const formattedEndTime = endTime.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "numeric",
                    });

                    return (
                      <>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fa-sharp fa-solid fa-clock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="name">
                              Timings:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              autoComplete="off"
                              disabled
                              value={`${formattedStartTime} - ${formattedEndTime}`}
                            />
                          </div>
                        </div>
                      </>
                    );
                  })()}
          <div className="card-part3">
            <DatePicker
              className="w-100 my-1"
              format="DD-MM-YYYY"
              onChange={(value) => {
                const dateObj = new Date(value);
                const year = dateObj.getFullYear();
                const month = (dateObj.getMonth() + 1)
                  .toString()
                  .padStart(2, "0");
                const day = dateObj.getDate().toString().padStart(2, "0");
                const formattedDate = `${day}-${month}-${year}`;
                console.log(formattedDate);
                setDate(formattedDate);
              }}
            />
            <TimePicker
              className="w-100 my-3"
              format="HH:mm"
              onChange={(value) => {
                console.log(value);
                const selectedTime = new Date(value); // Convert value to a Date object
                const hours = selectedTime
                  .getHours()
                  .toString()
                  .padStart(2, "0");
                const minutes = selectedTime
                  .getMinutes()
                  .toString()
                  .padStart(2, "0");
                const formattedTime = `${hours}:${minutes}`;
                console.log(formattedTime);
                setTime(formattedTime);
              }}
            />
            <button
              className="btn buttonStyle my-2 ms-2"
              onClick={HandleAvailability}
            >
              Check Availability
            </button>
            <button
              className="btn btn-dark buttonStyle2 my-2 ms-4"
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
