/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import withUser from "../../HOCs/with-user.hoc.js";
import Sidebar from "../../components/sidebar/sidebar.component.jsx";
import { HomePage1, HomePage2, HomePage3, HomePage4} from "../home-pages/home-pages.pages";
import Error from "../../components/error/error.component";

const pages = [
  <HomePage1 />,
  <HomePage2 />,
  <HomePage3 />,
  <HomePage4 />,
];

const HomePage = () => {
  const [currentitemID, setCurrentitemID] = useState(0);

  const storeitemID = ({ target }) => {
    const id = parseInt(target.getAttribute("itemID"));
    try {
      if (id === null || id === undefined || isNaN(id)) throw "Item ID is invalid!";

      setCurrentitemID(id);
    } catch ({ message }) {
      console.error(message);
    }
  };

  return (
    <>
      <div id="home-page" className="page">
        <Sidebar>
          <a className="sidebarLink" href="#" itemID="0" onClick={storeitemID}>Mission</a>
          <a className="sidebarLink" href="#" itemID="1" onClick={storeitemID}>The need of a developer hub</a>
          <a className="sidebarLink" href="#" itemID="2" onClick={storeitemID}>API Specifications</a>
          <a className="sidebarLink" href="#" itemID="3" onClick={storeitemID}>Our ways of working</a>
        </Sidebar>
        {
          pages[currentitemID]
        }
      </div>
    </>
  );
};

export default withUser(HomePage);
