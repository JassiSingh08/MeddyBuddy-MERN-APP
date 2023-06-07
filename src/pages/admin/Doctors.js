// import React, {useState, useEffect} from "react";
// import Layout from "../../components/Layout";
// import axios from "axios";
// import { Table, message } from "antd";



// const Doctors = () => {
//   const [doctor, setDoctor] = useState([])

//   //getDoctor
//   const getDoctor = async() => {
//     try {
//       const res = await axios.get("/api/v1/admin/getAllDoctors", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       if(res.data.success){
//         setDoctor(res.data.data);
//       }
//     } catch (error) { 
//       console.log(error)
//     }
//   }


//   // handle account
//   const handleAccountStatus = async (record, status) => {
//     try {
//       const res = await axios.post("/api/v1/admin/changeAccountStatus",
//         { doctorId: record._id, userid: record.userid, status: status },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (res.data.success) {
//         message.success(res.data.message);
//         getDoctor()
//       }
//     } catch (error) {
// /*       message.success("Approved Successfully");
//       window.location.reload(); */
//      console.log(error)
//         message.error("Something Went Wrong"); 
//     }
//   };


//   useEffect(() => {
//     getDoctor();
//   },[])

//    // antD table col
//     const Dcoloumn = [
//       {
//         title : "Name",
//         dataIndex : "name",
//         render: (text, record) => (
//           <span>{record.firstName} {record.lastName}</span>
//         )
//       },
//       {
//         title : "Status",
//         dataIndex : "status",
//       },
//       {
//         title: "Phone Number",
//         dataIndex: "phone",
//       },
//       {
//         title: "Actions",
//         dataIndex: "actions",
//         render: (text, record) => (
//           <div className="d-flex">
//             {record.status === "pending" ? (
//               <>
//                 <button className="btn btn-success ms-2" onClick={() => handleAccountStatus(record, "approved")}>Approve</button>
//                 <button className="btn btn-danger ms-2" onClick={() => handleAccountStatus(record, "rejected")}>Reject</button>
//               </>
//             ) : (
//               record.status === "approved" && (
//                 <button className="btn btn-danger ms-2" onClick={() => handleAccountStatus(record, "rejected")}>Reject</button>
//               )
//             )}
//           </div>
//         )
//       }
//     ] 

//   return (
//     <Layout>
//     <h1 className="text-center m-2">Doctors List</h1>
//     <Table columns={Dcoloumn} dataSource={doctor} />
//   </Layout>
//   )
// };

// export default Doctors;


import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message, Input, Row } from "antd";

const { Search } = Input;

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // getDoctor
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);

        const sortedData = res.data.data.sort((a, b) => {
          const createdAtA = new Date(a.createdAt);
          const createdAtB = new Date(b.createdAt);
          return createdAtB - createdAtA;
        });
        setFilteredDoctors(sortedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userid: record.userid, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getDoctors();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      align: 'center',
      render: (text, record) => (
        <span>
          {record.firstName} {" "} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: 'center',
      responsive: ["md"]
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      align: 'center',
    },
    {
      title: "Prescription Document",
      dataIndex: "prescription",
      align: 'center',
      responsive: ["md"],
      render: (text, record) => (
        <span>
          {!record.prescription ? "No" : "Yes"}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      align: 'center',
      render: (text, record) => (
        <div className="d-flex justify-content-center">
          {record.status === "pending" ? (
            <>
              <button
                className="btn btn-success ms-2"
                onClick={() => handleAccountStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleAccountStatus(record, "rejected")}
              >
                Reject
              </button>
            </>
          ) : record.status === "approved" && (
            <button
              className="btn btn-danger ms-2"
              onClick={() => handleAccountStatus(record, "rejected")}
            >
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

// Handle search
const handleSearch = (value) => {
  const filtered = doctors.filter(
    (doctor) =>
      (doctor.firstName &&
        doctor.firstName.toLowerCase().includes(value.toLowerCase())) ||
      (doctor.lastName &&
        doctor.lastName.toLowerCase().includes(value.toLowerCase())) ||
      (doctor.status && doctor.status.toLowerCase().includes(value.toLowerCase())) ||
      (doctor.prescription ? "Yes" : "No").toLowerCase() ===
      value.toLowerCase()
  );
  setFilteredDoctors(filtered);
};

  return (
    <Layout>
      <h1 className="text-center m-2">Doctors List</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
          marginRight: 10,
        }}
      >
        <Search
          placeholder="Search by name or status"
          allowClear
          enterButton
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
      </div>
      <div style={{ maxHeight: "480px", width: "100%" }}>
        <Table
          columns={columns}
          dataSource={filteredDoctors}
          pagination={false}
          scroll={{ y: 480 }}
        />
      </div>
    </Layout>
  );
};

export default Doctors;
