import React from "react";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {

  const location = useLocation();
  const SidebarMenu = [
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
      path: "/profile",
      icon: "fa-solid fa-user",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "fa-solid fa-right-from-bracket",
    },
  ];
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
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="content">
            <div className="header">Header</div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;