import React, { useState } from "react";
import withUser from "../../HOCs/with-user.hoc.js";
import Sidebar from "../../components/sidebar/sidebar.component.jsx";
import Error from "../../components/error/error.component";
import { HomePage1, HomePage2, HomePage3, HomePage4} from "../home-pages/home-pages.pages";
import { useLocation } from "react-router";

const pages = [
  {
    page: <HomePage1 />,
    id: "#mission"
  },
  {
    page: <HomePage2 />,
    id: "#need-of-dev-hub"
  },
  {
    page: <HomePage3 />,
    id: "#api-specifications"
  },
  {
    page: <HomePage4 />,
    id: "#ways-of-working"
  }
];

const HomePage = () => {
  const location = useLocation();
  const selectedPage = location.hash ? pages.findIndex(page => page.id === location.hash) : 0

  const [currentitemID, setCurrentitemID] = useState(selectedPage);
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
          <a className="sidebarLink" href="#mission" itemID="0" onClick={storeitemID}>Mission</a>
          <a className="sidebarLink" href="#need-of-dev-hub" itemID="1" onClick={storeitemID}>The need of a Developer Hub</a>
          <a className="sidebarLink" href="#api-specifications" itemID="2" onClick={storeitemID}>API Specifications</a>
          <a className="sidebarLink" href="#ways-of-working" itemID="3" onClick={storeitemID}>Our Ways of Working</a>
        </Sidebar>
        <main className="lbh-main-wrapper" id="main-content" role="main">
          { error?
              <div className="main-container">
                <Error {...error} />
              </div>
            :
            pages[currentitemID].page
          }
        </main>
      </div>
    </>
  );
};

export default withUser(HomePage);
