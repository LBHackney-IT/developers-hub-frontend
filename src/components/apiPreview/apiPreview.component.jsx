import React from "react";
import EnvironmentTags from "../environmentTags/environmentTags.component";
import { Link } from "react-router-dom";

const ApiPreview = ({name, description, tags, properties}) => {

  const id = properties.filter( property => property.type === "Swagger")[0].url.split("/")[5];
  const isPublished = properties.filter( property => property.type === "X-Published")[0].value.toLowerCase() === "true";
  const Versions = properties.filter( property => property.type === "X-Versions")[0].value.split(",");
  const SelectedVersion = properties.filter( property => property.type === "X-Version")[0].value;

  return (
    <li className="apiPreview">
      <div className="top">
        <div className="title">
          <Link to={{
            pathname: `/api-catalogue/${id}`, 
            state: { versions: Versions, currentVersion: SelectedVersion }
          }} 
          className="lbh-link">
            <h3>{name}</h3>
          </Link>
          <p>Version {SelectedVersion}</p>
        </div>
        <span className={`govuk-tag lbh-tag${isPublished ? "" : "--grey"}`}>{ isPublished ? "Active" : "Inactive" }</span>
      </div>
      <p className="description">{description}</p>
      <EnvironmentTags tags={tags} />
    </li>
  );
};

export default ApiPreview;
