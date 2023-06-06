import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
import axios from "axios"
import { Table } from 'antd'
import moment from 'moment'

const Appointments = () => {
    const [appointments, setAppointments] = useState([])

    const getAppointment = async() => {
        try {
            const res = await axios.get("/api/v1/user/user-appointment",{ 
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` ,
                }
            })
            if(res.data.success){
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointment()
    },[])

    const columns = [
      {
        title: "Doctor's Name/Phone",
        render: (record) => (
          <React.Fragment>
            {` Dr. ${record.doctorInfo.firstName} ${record.doctorInfo.lastName}`}
            <br />
            {record.doctorInfo.phone}
          </React.Fragment>
        ),
        responsive: ["xs"],
      },
      {
        title: "Special.../Fees",
        render: (record) => (
          <React.Fragment>
            {record.doctorInfo.specialization.charAt(0).toUpperCase() + record.doctorInfo.specialization.slice(1)}
            <br />
            {record.doctorInfo.ConsultationFee}
          </React.Fragment>
        ),
        responsive: ["xs"],
      },
      {
        title: "Date&Time/Status",
        render: (record) => (
          <React.Fragment>
            {moment(record.date).format("DD-MM-YYYY")} &nbsp;
            {moment(record.time).format("HH:mm")}
            <br />
            {record.status}
          </React.Fragment>
        ),
        responsive: ["xs"],
      },
      {
        title: "Doctor's Name",
        dataIndex: "doctorInfo",
        responsive: ["sm"],
        render: (text, record) => (
          <span>
            Dr. {record.doctorInfo.firstName} {record.doctorInfo.lastName}
          </span>
        ),
      },
      {
        title: "Specialization",
        dataIndex: "doctorInfo",
        responsive: ["sm"],
        render: (text, record) => <span>{record.doctorInfo.specialization.charAt(0).toUpperCase() + record.doctorInfo.specialization.slice(1)}</span>,
      },
      {
        title: "Fees",
        dataIndex: "doctorInfo",
        responsive: ["sm"],
        render: (text, record) => <span>{record.doctorInfo.ConsultationFee}</span>,
      },
      {
        title: "Phone",
        dataIndex: "doctorInfo.phone",
      responsive: ["sm"],
        render: (text, record) => <span>{record.doctorInfo.phone}</span>,
      },
      {
        title: "Status",
        dataIndex: "status",
        responsive: ["sm"],
        render: (text, record) => <span>{record.status}</span>,
      },
      {
        title: "Date & Time ",
        dataIndex: "date",
        responsive: ["sm"],
        render: (text, record) => (
          <span>
            {moment(record.date).format("DD-MM-YYYY")} &nbsp;
            {moment(record.time).format("HH:mm")}
          </span>
        ),
      },
    ];

  return (
    <Layout>
        <h1 className='text-center'>Appointment List </h1>
        <Table columns={columns} dataSource={appointments}/>
         </Layout>

  )
}

export default Appointments