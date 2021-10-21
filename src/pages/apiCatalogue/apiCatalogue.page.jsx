import React, { useState, useEffect } from "react";

import { useUser } from "../../context/user.context.js";
import { useHistory, useLocation } from "react-router-dom";
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
  const currentuser = useUser();
  const history = useHistory();
  if (!currentuser) history.push("/");

  let location = useLocation();
  const isSearch = location.pathname.includes("search");
  const searchQuery = location.search.replace("?query=", "");

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
    sort: (isSearch ? "BEST_MATCH" : "UPDATED"),
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
      "Active APIs": "PUBLISHED",
      "Inactive APIs": "UNPUBLISHED",
    },
    sort: {
      "Last Modified": { sort: "UPDATED", order: "DESC" },
      "A-Z": { sort: "TITLE", order: "ASC" },
      "Z-A": { sort: "TITLE", order: "DESC" },
      ...(searchQuery && { "Relevance": "BEST_MATCH" })
    },
    limit: {
      "5 items": 5,
      "10 items": 10,
      "15 items": 15
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
  const updatePageSize = (pageSize) => {
    setQueryParams({...queryParams, limit: apiParamsOptions.limit[pageSize], page: 0 });
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
    <div className="lbh-container">
      <div id="apis-page" className="page">
          <BackToTop href="#header"/>
          <Breadcrumbs/>
            { isSearch ?
              <>
                <h1>{`Search${ searchQuery ? ` for "${searchQuery}"` : ""}`}</h1>
                <Search id={"query"} placeholder={searchQuery? "Search again..." : "Search for an API..."} />
              </>
              :
              <h1>API Catalogue</h1>
            }
            {((searchQuery && isSearch) || (!searchQuery && !isSearch)) && // If API Catalogue or Search results
              <>
                <Radios onChange={updateApiFilter} {...radioData}/>
                <Details summary={"Advanced..."}>
                  <Select name={"SortBy"} label={"Sort by:"} options={Object.keys(apiParamsOptions.sort)} selectedOption={formatApiParam("sort", queryParams.sort)} onChange={updateSortBy} />
                  <Select name={"PageSize"} label={"Show: "} options={Object.keys(apiParamsOptions.limit)} selectedOption={formatApiParam("limit", queryParams.limit)} onChange={updatePageSize} />
                </Details>
                { !isLoaded && <h3>Loading..</h3> }
                { error && <Error title="Oops! Something went wrong!" summary={error.message} /> }
                { isLoaded && !error &&
                    <div className="lbh-container">
                      <Pagination onChange={updatePagination} limit={queryParams.limit} {...apiMetadata} />
                      <ul id="apisList">
                        {apis.map((item, index) => (
                          < ApiPreview key={index} {...item} />
                        ))}
                      </ul>
                    </div>
                }
              </>
            }
            
      </div>
    </div>
  );
};

export default withUser(ApiCataloguePage);
