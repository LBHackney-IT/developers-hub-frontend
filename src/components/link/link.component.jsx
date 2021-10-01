import React from "react";
import { withRouter } from "react-router-dom";
import APP_PATHS from "../../APP_PATHS.js";

const Link = ({ history, href, handleClick, ...props }) => {
  const divProps = Object.assign({}, props);
  delete divProps.staticContext;
  // fix "React does not recognize the `staticContext` prop on a DOM element" error

  const goToHref = () => history.push(href ?? APP_PATHS.home);

  const onClickHandler = () => {
    if (handleClick) handleClick();
    goToHref();
  };

  return (
    <a {...divProps} onClick={onClickHandler}>{props.children}</a>
  );
};

export default withRouter(Link);
