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
  paddingTop: "15px",
  paddingBottom: "15px",
  letterSpacing: "4px",
  color: "gray",
  fontSize: "14px"
};

export default Sidebar;
