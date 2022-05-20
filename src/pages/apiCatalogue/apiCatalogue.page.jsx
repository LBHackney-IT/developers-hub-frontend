import React from "react";
import { useLocation } from "react-router-dom";

import withUser from "../../HOCs/with-user.hoc.js";
import useSwaggerHubApiCatalogue from "../../hooks/useSwaggerHubApiCatalogue.jsx";

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

  const [apiStatus, apiData, utilties, functions] = useSwaggerHubApiCatalogue(searchQuery);
  const [getFormattedParamOptions, getPaginationData, formatSelectedParam] = utilties;
  const [updatePagination, updateApiFilter, updateSortBy] = functions;

  const isPublishedFilterConfig = {
    legend: "Filter By",
    formName: "filterApis",
    values: getFormattedParamOptions("state")
  }

  return (
    <main className="lbh-main-wrapper" id="apis-page" role="main">
      <div className="lbh-container">
        <Breadcrumbs />
        <div className="heading">
          {searchQuery ? <h1>Search for "{searchQuery}"</h1> : <h1>API Catalogue</h1>}
          <Search id={"search"} placeholder={searchQuery ? "Search again..." : "Search for an API..."} />
        </div>

        <BackToTop href="#header" />
        <Radios onChange={updateApiFilter} {...isPublishedFilterConfig} />
        <Details summary={"Advanced..."}>
          <Select
            name={"SortBy"}
            label={"Sort by:"}
            options={getFormattedParamOptions("sort")}
            selectedOption={formatSelectedParam("sort")}
            onChange={updateSortBy}
          />
        </Details>

        {!apiStatus.isLoaded && <h3>Loading..</h3>}
        {apiStatus.error &&
          <Error
            title={apiStatus.error.code !== "No results" && "Oops! Something went wrong!"}
            summary={apiStatus.error.message}
            className={apiStatus.error.code === "No results" && "secondary"}
          />
        }
        {apiStatus.isLoaded && !apiStatus.error &&
          <>
            <Pagination onChange={updatePagination} {...getPaginationData()} />
            <ul id="apisList">
              {apiData.apis.map((item, index) => (
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
