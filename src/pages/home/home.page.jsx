/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import withUser from "../../HOCs/with-user.hoc.js";
import Sidebar from "../../components/sidebar/sidebar.component.jsx";
import Error from "../../components/error/error.component";
import { HomePage1, HomePage2, HomePage3, HomePage4} from "../home-pages/home-pages.pages";

const pages = [
  <HomePage1 />,
  <HomePage2 />,
  <HomePage3 />,
  <HomePage4 />,
];

const HomePage = () => {
  const [currentitemID, setCurrentitemID] = useState(0);
  const [error, setError] = useState();

  const storeitemID = ({ target }) => {
    const id = parseInt(target.getAttribute("itemID"));
    if (id === null || id === undefined || isNaN(id)){
      const returnLink = { url: "/", text: "Click here to return to the homepage"}
      setError({ title: "Sidebar Error", summary: "Item ID is invalid", link1: returnLink })
    } else {
      setCurrentitemID(id);
    }
  };


  return (
    <>
      <div id="home-page" className="sidebar-page">
        <Sidebar>
          <a className="sidebarLink" href="#" itemID="0" onClick={storeitemID}>Mission</a>
          <a className="sidebarLink" href="#" itemID="1" onClick={storeitemID}>The need of a developer hub</a>
          <a className="sidebarLink" href="#" itemID="2" onClick={storeitemID}>API Specifications</a>
          <a className="sidebarLink" href="#" itemID="3" onClick={storeitemID}>Our ways of working</a>
        </Sidebar>
        <main className="lbh-main-wrapper" id="main-content" role="main">
          { error?
              <div className="main-container">
                <Error {...error} />
              </div>
            :
            pages[currentitemID]
          }
        </main>
      </div>
    </>
  );
};

export default withUser(HomePage);
