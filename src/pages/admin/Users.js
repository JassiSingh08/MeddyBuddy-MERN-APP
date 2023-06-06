/* import React, { useEffect, useState } from "react";
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
 */

import React, { useState, useEffect } from "react";
import { Table, Input,message} from "antd";
import Layout from "./../../components/Layout";
import axios from "axios";
// import { useSelector } from "react-redux";

const Users = () => {
  // const { user } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState(users);

  // Get users
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
        setfilteredUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle account
  const handleBlockStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/blockUserAccount",
        {
          _id: record._id,
          userid: record.userid,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getUsers(); // Refresh the user list
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const handleAdminStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/UpdateUserToAdmin",
        {
          _id: record._id,
          userid: record.userid,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        console.log(res.data);
        message.success(res.data.message);
        getUsers(); // Refresh the user list
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSearch = (value) => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );
    setfilteredUsers(filtered);
  };

  const columns = [
    {
      title: "Name/Email",
      render: (record) => (
        <React.Fragment>
          {record.name}
          <br />
          {record.email}
        </React.Fragment>
      ),
      responsive: ["xs"],
    },
    {
      title: "Name",
      dataIndex: "name",
      align: 'center',
      responsive: ["sm"],
    },
    {
      title: "Email",
      dataIndex: "email",
      // width: 250,
      align: 'center',
      responsive: ["md"],
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      align: 'center',
      render: (text, record) => <span>{record.isAdmin ? "Yes" : "No"}</span>,
      responsive: ["lg"],
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      align: 'center',
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
      responsive: ["sm"],
    },
    {
      title: "Blocked",
      dataIndex: "isBlocked",
      align: 'center',
      render: (text, record) => <span>{record.isBlocked ? "Yes" : "No"}</span>,
      responsive: ["lg"],
    },
    {
      title: "Actions",
      dataIndex: "actions",
      align: 'center',
      render: (text, record) => (
        <div className="d-flex">
          {!record.isAdmin && (
            <>
              {!record.isBlocked ? (
                <>
                  <button
                    className="btn btn-success ms-2"
                    onClick={() => handleAdminStatus(record, true)}
                  >
                    Make Admin
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleBlockStatus(record, true)}
                  >
                    Block User
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleBlockStatus(record, false)}
                >
                  UnBlock User
                </button>
              )}
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">Users List</h1>{" "}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
          marginRight: 10,
        }}
      >
        <Input.Search
          placeholder="Search Users..."
          allowClear
          onChange={(e) => handleSearch(e.target.value)}
          enterButton
          style={{ width: 300 }}
        />
      </div>
      <div style={{ maxHeight: "480px", width: "100%" }}>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          pagination={false}
          scroll={{ y: 480 }}
        />
      </div>
    </Layout>
  );
};

export default Users;