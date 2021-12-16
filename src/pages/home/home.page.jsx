import React, { useState } from "react";
import withUser from "../../HOCs/with-user.hoc.js";
import Sidebar from "../../components/sidebar/sidebar.component.jsx";
import Error from "../../components/error/error.component";
import { HomePage1, HomePage3, HomePage4} from "../home-pages/home-pages.pages";
import { useLocation } from "react-router";
import MyCollapsible from "../../components/accordion/accordion.jsx";

const pages = [
  {
    page: <HomePage1 />,
    id: "#mission"
  },
  {
    page: <div className="main-container" id='user-needs'>
      <MyCollapsible title='As a Developer'>
      <ul>
          <li>As a developer I would like consistency between the developer hub and swagger so that any changes to the APIs can be reflected straight away. </li>
          <li>As a developer I want a way to easily find APIs so that I can use these APIs effectively as well as stay up to date with any changes that might come up .</li>
          <li>As a developer I need to make sure that access to the APIs  is secure so that only authorised users can make requests to Hackney APIs.</li>
          <li>As a developer I would like to see what APIs are available at HackIT to be used so that I can choose the ones I need for the service development.</li>
          <li>As a developer I would like to build and reuse the Organisations APIs so that development efforts can focus on other requirements </li>
          <li>As a user I can log in with my google account associated with Hackney, so that my identity can easily be verified and my permissions can be managed effectively and efficiently. </li>
        </ul>
        </MyCollapsible>
        <MyCollapsible title='As a Service User'>
        <ul>
          <li> I want the ability to view the details of the results returned in a search so that I can easily look through the different results and make the correct selection.</li>
          <li>I want to be able to register for the application by entering my name, email address, my password and confirming my password so that I can feel secure. </li>
          <li>As a user I can log in into the application by entering my email and chosen password  so that I can feel my account is being secure </li>
          <li>As a user I can reset my password if i have forgotten my password </li>
          <li>As a user I can see my personal information and the APIs used on my profile </li>
          <li>I can edit my details such as the email address so that I can continue using the same account </li>
          <li>As a service user I would like to see the list of APIs available in the catalogue so that I can make an informed decision for the product development.</li>
        </ul>
        </MyCollapsible>
        <MyCollapsible title='As an Application Support Analyst'>
          <ul>
            <li>As an application support analyst, I would like to know what endpoints and functionality an API has, so that I can familiarise myself with the types of support requests I may get.</li>
            <li> I need to understand the queries being used by the Developers Hub  so that I can deal with support requests accordingly and resolve the potential issues in the underlying data.</li>
          </ul>
        </MyCollapsible>
        <MyCollapsible title='As a Data Analyst'>
          <ul>
            <li>I need to connect to the API so that data is easy to interpret and available for further reporting purposes and analysis.</li>
            <li>As a user, I would like to see Data in a format that's structured e.g. csv or JSON, so that I can easily manipulate the data.</li>
            <li>I would like to have data in a format that can be linked into programmes such as Tableau or Qlik sense so that I can create reports and data visualisation</li>
          </ul>
        </MyCollapsible>
        <MyCollapsible title='As a Solution Architect'>
          <ul>
            <li>I need to connect to the API so that data is easy to interpret and available for further reporting purposes and analysis.</li>
            <li>As a user, I would like to see Data in a format that's structured e.g. csv or JSON, so that I can easily manipulate the data.</li>
            <li>I would like to have data in a format that can be linked into programmes such as Tableau or Qlik sense so that I can create reports and data visualisation</li>
          </ul>
        </MyCollapsible>
        <MyCollapsible title='As a QA Analyst'>
          <ul>
            <li>As a tester I would like to view use cases so that I can test the required functionality. </li>
            <li>As at tester I would like to view all API Endpoints so that I can complete thorough E2E testing. </li>
            <li>I would like to be able to view all existing APIs and endpoints to ensure the final product of the API I am testing meets the organisation standards. </li>
          </ul>
        </MyCollapsible>
        <MyCollapsible title='As a Cyber Silver Member'>
        <ul>
              <li>As a member of Cyber Silver, I would like to ensure nobody can access live data through the APIs without being registered and logged in, so that cybersecurity is not compromised. </li>
            </ul>
        </MyCollapsible>
        <MyCollapsible title='As a Product Owner'>
            <ul>
              <li>As a product owner, I want to confirm that the data from an API is correct, based on the business area understanding of the wider team and any prior discovery work completed.</li>
            </ul>
        </MyCollapsible>

        
        
    </div>,
      
        
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
