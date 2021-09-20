import React from "react";
import EnvironmentTags from "../environmentTags/environmentTags.component";

const ApiPreview = ({name, description, tags, properties}) => {

  const apiUrl = name.replaceAll(" ", "-");
  const isPublished = properties.filter( property => property.type === "X-Published")[0].value.toLowerCase() === "true";

  return (
    <li className="apiPreview">
      <div className="title">
        <a href={`/api-catalogue/${apiUrl}`} className="lbh-link"><h3>{name}</h3></a>
        <span className={`govuk-tag lbh-tag${isPublished ? "" : "--grey"}`}>{ isPublished ? "Active" : "Inactive" }</span>
      </div>
      <p>{description}</p>
      <EnvironmentTags tags={tags} />
    </li>
  );
};

export default ApiPreview;
