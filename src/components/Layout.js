import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            logo 
            Menu Items 
          </div>
          <div className="leftside">
            <div className="header">
                user profile , etc 
            </div>
            <div className="body">
                appoint cards
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
