import React, { useState, useEffect } from "react";

import ApiPreview from "../../components/apiPreview/apiPreview.component";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component";
import Error from "../../components/error/error.component"
import Radios from "../../components/radios/radios.component";
import Pagination from "../../components/pagination/pagination.component";
import withUser from "../../HOCs/with-user.hoc.js";

const ApiCataloguePage = ({ history, currentUser: user }) => {
  // if (!user) history.push(APP_PATHS.home);

  // const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apis, setApis] = useState([]);
  const [apiMetadata, setApiMetadata] = useState({
    "offset": 0
  });
  const [queryParams, setQueryParams] = useState({
    specType: "API",
    owner: "Hackney",
    page: 0,
    limit: 5,
    state: "ALL",
    sort: "UPDATED",
    order: "DESC"
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
    var publishedState = ""
    if(newApiFilter === "All APIs"){
      publishedState = "ALL";
    } else {
      publishedState = `${newApiFilter === "Active APIs" ? "" : "UN"}PUBLISHED`
    }
    setQueryParams({...queryParams, state: publishedState, page: 0});
    // reset pagination when switching filters
  }

  const updatePagination = (newPage) => {
    setQueryParams({...queryParams, page: newPage});
  }

  useEffect(() => {
    const parseQueryParams = () => {
      return Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
    }
    resetState();
    
    fetch(`https://api.swaggerhub.com/specs?${parseQueryParams()}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setApis(result.apis);
          setApiMetadata(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [queryParams])

  return(
    <div className="lbh-container">
      <div id="apis-page" className="page">
          <Breadcrumbs/>
          <h1>API Catalogue</h1>
          <Radios onChange={updateApiFilter} {...radioData}/>
          {
            isLoaded ? ( 
              error ? 
                <Error title="Oops! Something went wrong!" summary={error.message} /> 
                :
                <div className="lbh-container">
                  <Pagination onChange={updatePagination} limit={queryParams.limit} {...apiMetadata} />
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
    </div>
  );
};

export default withUser(ApiCataloguePage);
