import React, { useState, useEffect } from "react";

// import APP_PATHS from "../../APP_PATHS.js";
import { withRouter } from "react-router-dom";
// import { API_TABLE, API_GROUP_TABLE, API_TAG_TABLE } from "../../mock_data/API_MOCK_DATA.js";
import ApiPreview from "../../components/apiPreview/apiPreview.component";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component";
import Error from "../../components/error/error.component"
import Radios from "../../components/radios/radios.component";
import Pagination from "../../components/pagination/pagination.component";

const ApisPage = ({ history, currentUser: user }) => {
  // if (!user) history.push(APP_PATHS.home);

  // const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiMetadata, setApiMetadata] = useState({});
  const [apis, setApis] = useState([]);
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
    setApis([]);
  }

  const updateApiFilter = (newApiFilter) => {
    setQueryParams({...queryParams, state: newApiFilter});
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
          setApis(result.apis);
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
                <Pagination selectedPage={1} limit={5} offset={0} totalResults={38}/>
                <ul id="apisList">
                  {apis.map((item, index) => (
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
