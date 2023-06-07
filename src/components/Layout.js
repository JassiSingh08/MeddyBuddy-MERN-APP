import React, { useState } from "react";
// import { adminMenu, userMenu } from "./../Data/Data";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
import { logout } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import Logo1 from "../Assets/Logo-tranparent1.png";

// ===================
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FiArrowRight } from "react-icons/fi";

const Layout = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);

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

  // admin menu
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },

    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "fa-solid fa-user",
    },
    {
      name: "Profile",
      path: `/user/profile/${user?._id}`,
      // path: `/admin/profile/${user?._id}`,
      icon: "fa-solid fa-address-card",
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
            <div className="logo d-flex">
              <img
                src={Logo1}
                alt="Meddy Buddy"
                width="80px"
                style={{ marginLeft: "10px", marginTop: "20px" }}
              />
              <span
                style={{
                  marginTop: "45px",
                  fontSize: "22px",
                  fontWeight: "bold",
                  fontStyle: "oblique",
                }}
              >
                Meddy Buddy
              </span>
              <hr />
            </div>
            <hr />
            <div className="menu">
              {SidebarMenu.map((menu, i) => {
                const isActive = location.pathname === menu.path;
                return (
                  <React.Fragment key={i}>
                    <div
                      className={`menu-item hoverStyle ${isActive && "active"}`}
                    >
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
              {/* ========FOR SIDEBAR TOGGLE IN DIFFERENT DEVICES======== */}
              <div
                style={{ marginLeft: "10px" }}
                className="navbar-menu-container"
              >
                <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
              </div>
              <Drawer
                open={openMenu}
                onClose={() => setOpenMenu(false)}
                anchor="left"
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={() => setOpenMenu(false)}
                  onKeyDown={() => setOpenMenu(false)}
                >
                  <List>
                    {SidebarMenu.map((item,i) => (
                      <ListItem key={i}>
                        <Link to={item.path}>
                          <ListItemButton>
                            <i
                              style={{
                                marginRight: "10px",
                                textDecoration: "none",
                              }}
                              className={item.icon}
                            ></i>
                            <ListItemText
                              primary={item.name}
                              style={{ color: "black", textDecoration: "none" }}
                            />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                  <div className={`menu-itemMobile `} onClick={handleLogout}>
                    <i
                      style={{
                        marginLeft: "32px",
                        color: "#1677ff",
                        marginRight: "10px",
                      }}
                      className="fa-solid fa-right-from-bracket"
                    ></i>
                    <Link
                      style={{ color: "black", textDecoration: "none" }}
                      to="/login"
                    >
                      Logout
                    </Link>
                  </div>
                  <Divider />
                </Box>
              </Drawer>
              {/* ================ */}
              <div className="header-content">
                <div className="header-logo">
                  <img
                    src={Logo1}
                    alt="Meddy Buddy"
                    width="80px"
                    style={{ marginLeft: "10px", marginTop: "20px" }}
                  />
                <span style={{ marginTop: "30px",fontSize: "20px", fontWeight: "bold", fontStyle: "oblique", }} > Meddy Buddy </span>                  <hr />
                </div>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i
                    className="fa-solid fa-bell Navcolor"
                    style={{ cursor: "pointer" }}
                  ></i>
                </Badge>
                <Link className="Navcolor" to={`/user/profile/${user?._id}`}>
                  {user?.name}
                </Link>
                {/* <Link to={!user?.isAdmin ? `/user/profile/${user?._id}` : `/admin/profile/${user?._id}` }>{user?.name}</Link> */}
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
