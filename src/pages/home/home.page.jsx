
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import withUser from "../../HOCs/with-user.hoc.js";
import Sidebar from "../../components/sidebar/sidebar.component.jsx";
// import { useUser } from "../../context/user.context.js";
import { HomePage1, HomePage2, HomePage3, HomePage4} from "../home-pages/home-pages.pages";

const pages = [
  <HomePage1 />,
  <HomePage2 />,
  <HomePage3 />,
  <HomePage4 />,
];

const HomePage = () => {
  const [currentItemId, setCurrentItemId] = useState(0);

  const storeItemId = ({ target }) => {
    const id = parseInt(target.getAttribute("itemId"));
    try {
      if (id === null || id === undefined || isNaN(id)) throw "Item ID is invalid!";

      setCurrentItemId(id);
    } catch ({ message }) {
      console.error(message);
    }
  };

  return (
    <>
      <div id="home-page" className="page">
        <Sidebar>
          <a className="sidebarLink" href="#" itemId="0" onClick={storeItemId}>Mission</a>
          <a className="sidebarLink" href="#" itemId="1" onClick={storeItemId}>The need of a developer hub</a>
          <a className="sidebarLink" href="#" itemId="2" onClick={storeItemId}>API Specifications</a>
          <a className="sidebarLink" href="#" itemId="3" onClick={storeItemId}>Our ways of working</a>
        </Sidebar>
        {
          pages[currentItemId]
        }
      </div>
    </>
  );
};

export default withUser(HomePage);
