/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "../Assets/Logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { Link } from "react-router-dom";
import { FiArrowRight, FiLogIn, FiUserPlus } from "react-icons/fi";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Login",
      icon: <FiLogIn />,
      path: "/login",
    },
    {
      text: "Register",
      icon: <FiUserPlus/>,
      path: "/register",
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      path: "/login",
    },
  ];

  const handleClickScroll1 = () => {
    const element = document.getElementById('work');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleClickScroll2 = () => {
    const element = document.getElementById('testimonials');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleClickScroll3 = () => {
    const element = document.getElementById('contact');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="" width="200px" height="200px"/>
      </div>
      <div className="navbar-links-container">
        <AnchorLink href="#work" onClick={handleClickScroll1}>
          Work
        </AnchorLink>
        <AnchorLink href="#testimonials" onClick={handleClickScroll2}>
          Testimonials
        </AnchorLink>
        <AnchorLink href="#contact" onClick={handleClickScroll3}>
          Contact
        </AnchorLink>
        <Link className="primary-button" to="/register">
          Register Now <FiArrowRight />
        </Link>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {/*             {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text}/>
                </ListItemButton>
              </ListItem>
            ))} */}
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <Link to={item.path}>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text}  style={{ color: 'black', textDecoration:"none" }}/>
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
