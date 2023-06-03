import React from "react";
import { adminMenu, userMenu } from "./../Data/Data";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
import { logout } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // logout funtion
  const handleLogout = () => {
    dispatch(logout());
    message.success("Logout Successfully");
    navigate("/login");
  };

  //doctor menu
   const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointment",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  
  //userMenu
   const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Profile",
      path: `/user/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  

  // redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>Meddy Buddy</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu, i) => {
                const isActive = location.pathname === menu.path;
                return (
                  <React.Fragment key={i}>
                  <div className={`menu-item ${isActive && "active"}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                </React.Fragment>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" >
                <Badge count={user && user.notification.length}  onClick={()=>{navigate('/notification')}}>
                  <i className="fa-solid fa-bell" style={{cursor:'pointer'}}></i>
                </Badge>
                <Link to={`/user/profile/${user?._id}`}>{user?.name}</Link>
              </div>
            </div>
            <div className="body layout-container">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
