import React from "react";
import { withRouter } from "react-router-dom";
import APP_PATHS from "../../APP_PATHS.js";

const Link = ({ history, href, ...props }) => {
  const handleClick = () => history.push(href ?? APP_PATHS.home);

  return (
    <a {...props} onClick={handleClick}>{props.children}</a>
  );
};

export default withRouter(Link);
