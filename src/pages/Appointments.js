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
        title: "ID",
        dataIndex: "_id",
      },
      // {
      //   title: "Name",
      //   dataIndex: "name",
      //   render: (text, record) => (
      //     <span>
      //       {record.firstName} {record.lastName}
      //     </span>
      //   ),
      // },
      // {
      //   title: "Phone",
      //   dataIndex: "phone",
      //   render: (text, record) => <span>{record.phone}</span>,
      // },
      {
        title: "Status",
        dataIndex: "status",
        render: (text, record) => <span>{record.status}</span>,
      },
      {
        title: "Date & Time ",
        dataIndex: "date",
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