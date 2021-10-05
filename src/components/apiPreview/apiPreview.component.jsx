import React from "react";
import EnvironmentTags from "../environmentTags/environmentTags.component";
import { Link } from "react-router-dom";
import { filterSwaggerPropertiesByType } from "../../utility/utility";

const ApiPreview = ({name, description, tags, properties}) => {

  const id = filterSwaggerPropertiesByType(properties, "Swagger").url.split("/")[5];
  const isPublished = filterSwaggerPropertiesByType(properties, "X-Published").value.toLowerCase() === "true";
  const Versions = filterSwaggerPropertiesByType(properties, "X-Versions").value.split(",");
  const selectedVersion = filterSwaggerPropertiesByType(properties, "X-Version").value;
  const lastModified = filterSwaggerPropertiesByType(properties, "X-Modified").value.split("T")[0];

  return (
    <li className="apiPreview">
      <div className="top">
        <div className="title">
          <Link to={{
            pathname: `/api-catalogue/${id}`, 
            state: { versions: Versions, currentVersion: selectedVersion }
          }} 
          className="lbh-link">
            <h2 className="lbh-heading-h3">{name}</h2>
          </Link>
          <div className="metadata">
            <p className="lbh-body-xs">v{selectedVersion} &#183; Edited {lastModified}</p>
          </div>
        </div>
        <span className={`govuk-tag lbh-tag${isPublished ? "" : "--grey"}`}>{ isPublished ? "Active" : "Inactive" }</span>
      </div>
      <p className="description">{description}</p>
      <EnvironmentTags tags={tags} />
    </li>
  );
};

export default ApiPreview;
