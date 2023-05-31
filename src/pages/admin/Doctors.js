import React, {useState, useEffect} from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";



const Doctors = () => {
  const [doctor, setDoctor] = useState([])

  //getDoctor
  const getDoctor = async() => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if(res.data.success){
        setDoctor(res.data.data);
      }
    } catch (error) { 
      console.log(error)
    }
  }


  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post("/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userid: record.userid, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
/*       message.success("Approved Successfully");
      window.location.reload(); */
     console.log(error)
        message.error("Something Went Wrong"); 
    }
  };


  useEffect(() => {
    getDoctor();
  },[])

   // antD table col
    const Dcoloumn = [
      {
        title : "Name",
        dataIndex : "name",
        render: (text, record) => (
          <span>{record.firstName} {record.lastName}</span>
        )
      },
      {
        title : "Status",
        dataIndex : "status",
      },
      {
        title: "Phone Number",
        dataIndex: "phone",
      },
      {
        title:" Actions",
        dataIndex:"actions",
        render : (text,record)=> (
          <div className="d-flex">
            {record.status === "pending" ? (
              <button className="btn btn-success"  onClick={() => handleAccountStatus(record, "approved")}>Approve</button>
              ):(
                <button className="btn btn-danger">Reject</button>
            )}
          </div>
        )
      }
    ] 

  return (
    <Layout>
    <h1 className="text-center m-2">Doctors List</h1>
    <Table columns={Dcoloumn} dataSource={doctor} />
  </Layout>
  )
};

export default Doctors;
