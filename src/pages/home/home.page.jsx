import React, { useState } from "react";
import APP_PATHS from "../../APP_PATHS.js";
import { withRouter } from "react-router-dom";
import HomeContainer from "../../components/home-container/home-container.jsx";
import withUser from "../../HOCs/with-user.hoc.js";
import Sidebar from "../../components/sidebar/sidebar.component.jsx";

const HomePage = () => {
  return (
    <>
      <div className="navigation-header">
        <h3>Navigation</h3>
      </div>
      <div id="home-page" className="page">
        <Sidebar />
        <HomeContainer />
      </div>
    </>
  );
};

export default withUser(HomePage);
