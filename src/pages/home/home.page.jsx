import React, { useState } from "react";
import { useLocation } from "react-router";

import withUser from "../../HOCs/with-user.hoc.js";

import Sidebar from "../../components/sidebar/sidebar.component.jsx";
import Error from "../../components/error/error.component";
import { HomePage1, HomePage2, HomePage3, HomePage4, HomePage5, HomePage6, HomePage7, HomePage8} from "../home-pages/home-pages.pages";

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
  },
  {
    page: <HomePage5 />,
    id: "#api-authentication"
  },
  {
    page: <HomePage6 />,
    id: "#how-the-authentication-works"
  },
  {
    page: <HomePage7 />,
    id: "#setting-up-api-authenticator"
  },
  {
    page: <HomePage8 />,
    id: "#how-to-amend-acess-to-an-api"
  }
];

const numberOfPages = pages.length;

const HomePage = () => {
  const location = useLocation();
  const selectedPage = location.hash ? pages.findIndex(page => page.id === location.hash) : 0;

  const [currentItemID, setCurrentitemID] = useState(selectedPage);
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

  const increasePage = () => {
    let nextID = currentItemID + 1;
    // reset index once the ID goes over the last element in the pages array
    if (nextID === numberOfPages) nextID = 0;

    window.history.pushState(null, null, pages[nextID].id);
    setCurrentitemID(nextID);
  }

  const decreasePage = () => {
    let nextID = currentItemID - 1;
    // reset index once the ID goes under the first element in the pages array
    if (nextID < 0) nextID = numberOfPages - 1;

    window.history.pushState(null, null, pages[nextID].id);
    setCurrentitemID(nextID);
  }

  return (
    <>
      <div id="home-page" className="sidebar-page">
        <Sidebar>
          <a className="sidebarLink" href="#mission" itemID="0" onClick={storeitemID}>Mission</a>
          <a className="sidebarLink" href="#need-of-dev-hub" itemID="1" onClick={storeitemID}>The Need of a Developer Hub</a>
          <a className="sidebarLink" href="#api-specifications" itemID="2" onClick={storeitemID}>API Specifications</a>
          <a className="sidebarLink" href="#ways-of-working" itemID="3" onClick={storeitemID}>Our Ways of Working</a>
          <a className="sidebarLink" href="#api-authentication" itemID="4" onClick={storeitemID}>API Authentication</a>
          <a className="sidebarLink indented" href="#how-the-authentication-works" itemID="5" onClick={storeitemID}>How the API Authentication process works</a>
          <a className="sidebarLink indented" href="#setting-up-api-authenticator" itemID="6" onClick={storeitemID}>How to set up your API Authenticator</a>
          <a className="sidebarLink indented" href="#how-to-amend-acess-to-an-api" itemID="7" onClick={storeitemID}>How to amend access to your API</a>
        </Sidebar>
        <main className="lbh-main-wrapper" id="main-content" role="main">
          { error?
              <div className="main-container">
                <Error {...error} />
              </div>
            :
            <>
              {pages[currentItemID].page}
              {currentItemID > 0 ?
              <span className="homepage-nav-button" style={{float: "left"}}>
                <button  className="govuk-button govuk-secondary lbh-button lbh-button--secondary about-button"
                onClick={decreasePage}>Previous</button>
              </span>
              : ""}

              {currentItemID < 7 ?
              <span className="homepage-nav-button" style={{float: "right"}}>
                <button  className="govuk-button govuk-secondary lbh-button lbh-button--secondary about-button"
                onClick={increasePage}>Next</button>
              </span>
              : ""}
            </>
          }
        </main>
      </div>
    </>
  );
};

export default withUser(HomePage);
