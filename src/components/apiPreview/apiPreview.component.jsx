import React from "react";
import EnvironmentTags from "../environmentTags/environmentTags.component";
import { Link } from "react-router-dom";
import { filterSwaggerPropertiesByType } from "../../utility/utility";

const ApiPreview = ({name, description, tags, properties}) => {

  const id = filterSwaggerPropertiesByType(properties, "Swagger").url.split("/")[5];
  const isPublished = filterSwaggerPropertiesByType(properties, "X-Published").value.toLowerCase() === "true";
  const Versions = filterSwaggerPropertiesByType(properties, "X-Versions").value.split(",");
  const SelectedVersion = filterSwaggerPropertiesByType(properties, "X-Version").value;

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
