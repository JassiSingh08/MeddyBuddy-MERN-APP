import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorList = ({doctor}) => {
    const navigate = useNavigate()
    const startTime = new Date(doctor.timings[0]);
    const endTime = new Date(doctor.timings[1]);

    const formattedStartTime = startTime.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
    const formattedEndTime = endTime.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });

  return (
    <>
    <div className='card p-2 mx-4' style={{cursor: "pointer"}} onClick={()=> navigate(`/doctor/book-appointment/${doctor._id}`)
    }>
        <div className='card-header'>
            Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className='card-body'>
            <p>
                <b>Specialization</b>: {doctor.specialization}
            </p>
            <p>
                <b>Experience</b>: {doctor.experience} Years
            </p>
            <p>
                <b>Consultation Fee</b>: {doctor.ConsultationFee}
            </p>
            <p>
               <b>Timings</b>: {formattedStartTime} - {formattedEndTime}
            </p>
        </div>
    </div>
    </>
  )
}

export default DoctorList