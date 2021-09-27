import React from "react";
import EnvironmentTags from "../environmentTags/environmentTags.component";
import { spacedtoHyphenatedCase } from "../../utility/utility";
import { Link } from "react-router-dom";

const ApiPreview = ({name, description, tags, properties}) => {

  const apiUrl = spacedtoHyphenatedCase(name);
  const SwaggerLink = properties.filter( property => property.type === "Swagger")[0].url;
  const isPublished = properties.filter( property => property.type === "X-Published")[0].value.toLowerCase() === "true";
  const Versions = properties.filter( property => property.type === "X-Versions")[0].value.split(",");
  const SelectedVersion = properties.filter( property => property.type === "X-Version")[0].value;

  return (
    <li className="apiPreview">
      <div className="top">
        <div className="title">
          <Link to={{
            pathname: `/api-catalogue/${apiUrl}`, 
            state: { SwaggerLink: SwaggerLink, Versions: Versions, SelectedVersion: SelectedVersion }
          }} 
          className="lbh-link">
            <h3>{name}</h3>
          </Link>
          <p>Version {SelectedVersion}</p>
        </div>
        <span className={`govuk-tag lbh-tag${isPublished ? "" : "--grey"}`}>{ isPublished ? "Active" : "Inactive" }</span>
      </div>
      <p>{description}</p>
      <EnvironmentTags tags={tags} />
    </li>
  );
};

export default ApiPreview;
