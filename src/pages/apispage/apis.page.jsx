import React, { useState, useEffect } from "react";
// import APP_PATHS from "../../APP_PATHS.js";
import { withRouter } from "react-router-dom";
// import { API_TABLE, API_GROUP_TABLE, API_TAG_TABLE } from "../../mock_data/API_MOCK_DATA.js";
import ApiPreview from "../../components/apiPreview/apiPreview.component";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component";
import Error from "../../components/error/error.component"
import Radios from "../../components/radios/radios.component";

const ApisPage = ({ history, currentUser: user }) => {
  // if (!user) history.push(APP_PATHS.home);

  // const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [queryParams, setQueryParams] = useState({
    specType: "API",
    owner: "Hackney",
    page: 0,
    limit: 5,
    state: "ALL"
  });

  const radioData = {
    legend: "Filter By",
    formName: "filterApis",
    values: ["All APIs", "Active APIs", "Inactive APIs"]
  }

  const resetState = () => {
    setError(null);
    setIsLoaded(false);
    setItems([]);
  }

  const updateApiFilter = (newApiFilter) => {
    var newState = ""
    if(newApiFilter === "All APIs"){
      newState = "ALL";
    } else if(newApiFilter === "Active APIs") {
      newState = "PUBLISHED";
    } else {
      newState = "UNPUBLISHED";
    }
    setQueryParams({...queryParams, state: newState});
  }

  const parseQueryParams = () => {
    return Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
  }

  useEffect(() => {
    resetState();
    fetch(`https://api.swaggerhub.com/specs?${parseQueryParams()}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.apis);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [queryParams])


  return(
    <div id="apis-page" className="page">
        <Breadcrumbs/>
        <h1>API Catalogue</h1>
        <Radios onChange={updateApiFilter} {...radioData}/>
        <hr/>
        {
          isLoaded ? ( 
            error ? 
              <Error title="Oops! Something went wrong!" summary={error.message} /> 
              :
              <div className="lbh-container">
                <ul id="apisList">
                  {items.map((item, index) => (
                    < ApiPreview key={index} {...item} />
                  ))}
                </ul>
              </div>
          )
          : 
          <h3>Loading..</h3>
        }
    </div>
  );
};

export default withRouter(ApisPage);
