import React from "react";
import { Link } from "react-router-dom";
import { filterSwaggerPropertiesByType } from "../../utility/utility";

const ApiPreview = ({name, description, properties}) => {

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
            <p className="lbh-body-xs"><span className="version">v{selectedVersion}</span> &#183; <span className="edited">Edited {lastModified}</span></p>
          </div>
        </div>
        <span className={`govuk-tag lbh-tag${isPublished ? "" : "--red"}`}>{ isPublished ? "Active" : "Inactive" }</span>
      </div>
      <p className="description">{description}</p>
    </li>
  );
};

export default ApiPreview;
