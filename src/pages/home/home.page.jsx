import React from "react";
import HomeContainer from "../../components/home-container/home-container.jsx";
import withUser from "../../HOCs/with-user.hoc.js";
import Sidebar from "../../components/sidebar/sidebar.component.jsx";
// import { useUser } from "../../context/user.context.js";

const HomePage = () => {
  // const user = useUser();
  return (
    <>
      <div id="home-page" className="page">
        <Sidebar />
        <HomeContainer />
      </div>
    </>
  );
};

export default withUser(HomePage);
