import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorList = ({doctor}) => {
    const navigate = useNavigate()
    const startTime = new Date(doctor.timings[0]);
    const endTime = new Date(doctor.timings[1]);

    const formattedStartTime = startTime.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
    const formattedEndTime = endTime.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });

  return (
    // <>
    // <div className='card p-2 mx-4' style={{cursor: "pointer"}} onClick={()=> navigate(`/doctor/book-appointment/${doctor._id}`)
    // }>
    //     <div className='card-header'>
    //         Dr. {doctor.firstName} {doctor.lastName}
    //     </div>
    //     <div className='card-body'>
    //         <p>
    //             <b>Specialization</b>: {doctor.specialization}
    //         </p>
    //         <p>
    //             <b>Experience</b>: {doctor.experience} Years
    //         </p>
    //         <p>
    //             <b>Consultation Fee</b>: {doctor.ConsultationFee}
    //         </p>
    //         <p>
    //            <b>Timings</b>: {formattedStartTime} - {formattedEndTime}
    //         </p>
    //     </div>
    // </div>
    // </>
    <>
      <div className="marginTop"  style={{cursor: "pointer"}} onClick={()=> navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className="section_our_solution">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="our_solution_category">
                <div className="solution_cards_box">
                  <div className="solution_cards_box sol_card_top_3">
                    <div className="solution_card">
                      <div className="hover_color_bubble"></div>
                      <div className="solu_title">
                        <h3>
                          Dr. {doctor.firstName} {doctor.lastName}
                        </h3>
                      </div>
                      <div className="solu_description">
                      <p>Specialization: {doctor.specialization.charAt(0).toUpperCase() + doctor.specialization.slice(1)}</p>
                        <p>Experience: {doctor.experience} Years</p>
                        <p>Consultation Fee: {doctor.ConsultationFee} /-</p>
                        <p>
                          Timings: {formattedStartTime} - {formattedEndTime}
                        </p>
                        <button type="button" className="read_more_btn">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorList