import React from "react";
import EnvironmentTags from "../environmentTags/environmentTags.component";
import { parseURL } from "../../utility/utility";
import { Link } from "react-router-dom";

const ApiPreview = ({name, description, tags, properties}) => {

  const apiUrl = parseURL(name);
  const isPublished = properties.filter( property => property.type === "X-Published")[0].value.toLowerCase() === "true";
  const SwaggerLink = properties.filter( property => property.type === "Swagger")[0].url;

  return (
    <li className="apiPreview">
      <div className="title">

        <Link to={{
          pathname: `/api-catalogue/${apiUrl}`, 
          state: { SwaggerLink: SwaggerLink }
        }} 
        className="lbh-link">
          <h3>{name}</h3>
        </Link>

        <span className={`govuk-tag lbh-tag${isPublished ? "" : "--grey"}`}>{ isPublished ? "Active" : "Inactive" }</span>
      </div>
      <p>{description}</p>
      <EnvironmentTags tags={tags} />
    </li>
  );
};

export default ApiPreview;
