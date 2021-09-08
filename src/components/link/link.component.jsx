import React from "react";
import { withRouter } from "react-router-dom";
import APP_PATHS from "../../APP_PATHS.js";

const Link = ({ history, href, ...props }) => {
  const divProps = Object.assign({}, props);
  delete divProps.staticContext;
  // fix "React does not recognize the `staticContext` prop on a DOM element" error

  const handleClick = () => history.push(href ?? APP_PATHS.home);

  return (
    <a {...divProps} onClick={handleClick}>{props.children}</a>
  );
};

export default withRouter(Link);
