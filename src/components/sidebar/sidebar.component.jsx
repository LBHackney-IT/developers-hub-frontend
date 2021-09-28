import React from "react";

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      {props.children}
    </div>
  );
};

export default Sidebar;
