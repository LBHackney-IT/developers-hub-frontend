import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import withUser from "../../HOCs/with-user.hoc.js";

import ApiPreview from "../../components/apiPreview/apiPreview.component";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component";
import Error from "../../components/error/error.component"
import Radios from "../../components/radios/radios.component";
import Pagination from "../../components/pagination/pagination.component";
import BackToTop from "../../components/backToTop/backToTop.component";
import Select from "../../components/select/select.component";
import Details from "../../components/details/details.component";
import Search from "../../components/search/search.component";

const ApiCataloguePage = () => {
  let location = useLocation();
  const searchQuery = decodeURIComponent(location.search.replace("?search=", "").replaceAll("+", " "));

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
    sort: (searchQuery ? "BEST_MATCH" : "UPDATED"),
    order: "DESC"
  });

  const resetState = () => {
    setError(null);
    setIsLoaded(false);
    setApis([]);
  }

  const apiParamsOptions = {
    // From SwaggerHub Registry API Documentation
    state: {
      "All APIs": "ALL",
      "Live APIs": "PUBLISHED",
      "APIs in development": "UNPUBLISHED",
    },
    sort: {
      "Last Modified": { sort: "UPDATED", order: "DESC" },
      "A-Z": { sort: "TITLE", order: "ASC" },
      "Z-A": { sort: "TITLE", order: "DESC" },
      ...(searchQuery && { "Relevance": "BEST_MATCH" })
    }
  }

  const formatApiParam = (value, param) => {
    return Object.keys(apiParamsOptions[value]).find(key => JSON.stringify(apiParamsOptions[value][key]) === JSON.stringify(param));
  }
  const updatePagination = (newPage) => {
    setQueryParams({...queryParams, page: newPage});
  }
  const updateApiFilter = (newApiFilter) => {
    setQueryParams({...queryParams, state: apiParamsOptions.state[newApiFilter], page: 0 });
    // reset pagination when switching filters
  }
  const updateSortBy = (sortBy) => {
    setQueryParams({...queryParams, ...apiParamsOptions.sort[sortBy], page: 0 });
  }

  useEffect(() => {
    const parseQueryParams = () => {
      return Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
    }
    
    resetState();

    fetch(`https://api.swaggerhub.com/specs?${parseQueryParams()}${ searchQuery? `&query=${searchQuery}`: ""}`)
      .then(res => res.json())
      .then((result) => {
        if(result.totalCount === 0){
          setError({ code: "No results", message: "No results found." })
        }
        setApis(result.apis);
        setApiMetadata(result);
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setIsLoaded(true);
      });
  }, [queryParams, searchQuery]);

  const radioData = {
    legend: "Filter By",
    formName: "filterApis",
    values: Object.keys(apiParamsOptions.state)
  }

  return(
    <main className="lbh-main-wrapper" id="apis-page" role="main">
      <div className="lbh-container">
        <Breadcrumbs/>
        <div className="heading">
          {searchQuery? <h1>Search for "{searchQuery}"</h1> : <h1>API Catalogue</h1>}
          <Search id={"search"} placeholder={searchQuery? "Search again..." : "Search for an API..."} />
        </div>
        <BackToTop href="#header"/>
        <Radios onChange={updateApiFilter} {...radioData}/>
        <Details summary={"Advanced..."}>
          <Select name={"SortBy"} label={"Sort by:"} options={Object.keys(apiParamsOptions.sort)} selectedOption={formatApiParam("sort", queryParams.sort)} onChange={updateSortBy} />
        </Details>
        { !isLoaded && <h3>Loading..</h3> }
        { error && <Error title={error.code !== "No results" && "Oops! Something went wrong!"} summary={error.message} className={error.code === "No results" && "secondary"}/> }
        { isLoaded && !error &&
            <>
              <Pagination onChange={updatePagination} limit={queryParams.limit} {...apiMetadata} />
              <ul id="apisList">
                {apis.map((item, index) => (
                  < ApiPreview key={index} {...item} />
                ))}
              </ul>
            </>
        }
      </div>
    </main>
  );
};

export default withUser(ApiCataloguePage);
