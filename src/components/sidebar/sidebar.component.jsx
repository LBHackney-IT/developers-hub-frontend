import React from "react";

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <p style={TitleStyling}>CONTENTS</p>
      {props.children}
    </div>
  );
};

const TitleStyling = {
  padding: "15px 20px 15px 20px", 
  letterSpacing: "4px",
  color: "gray",
  fontSize: "14px",
  textAlign: "left"
};

export default Sidebar;
