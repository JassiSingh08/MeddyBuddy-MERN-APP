import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";
import { useSelector } from "react-redux";


const Users = () => {
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => state.user);

  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

    // handle account
    const handleBlockStatus = async (record, status) => {
      try {
        const res = await axios.post("/api/v1/admin/blockUserAccount",
          {_id: record._id, userid: record.userid, status: status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          message.success(res.data.message);
        }
      } catch (error) {
       console.log(error)
          message.error("Something Went Wrong"); 
      }
    };
  
    const handleAdminStatus = async (record, status) => {
      try {
        const res = await axios.post("/api/v1/admin/UpdateUserToAdmin",
          {_id: record._id, userid: record.userid, status: status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          console.log(res.data)
          message.success(res.data.message);
        }
      } catch (error) {
       console.log(error)
          message.error("Something Went Wrong"); 
      }
    };
  

  useEffect(() => {
    getUsers();
  }, []);

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      render: (text, record) => <span>{record.isAdmin ? "Yes" : "No"}</span>,
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Blocked",
      dataIndex: "isBlocked",
      render: (text, record) => <span>{record.isBlocked ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {!record.isAdmin && !record.isBlocked && (
          <>
            <button className="btn btn-success ms-2"  onClick={() => handleAdminStatus(record, true)}> Make Admin</button>
            {
              !record.isBlocked && <button className="btn btn-danger ms-2"  onClick={() => handleBlockStatus(record, true)}>Block User</button>
            }
          </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;