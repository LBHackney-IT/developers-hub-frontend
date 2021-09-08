import React from "react";

const ApiPreview = ({name, description, tags, properties}) => {

  const apiUrl = properties.filter( property => property.type === "Swagger")[0].url;
  const isPublished = properties.filter( property => property.type === "X-Published")[0].value.toLowerCase() == "true";

  return (
    <li className="apiPreview">
      <div className="title">
        <a href={apiUrl.replace("api", "app")} className="lbh-link"><h3>{name}</h3></a>
        <span className={`govuk-tag lbh-tag${isPublished ? "" : "--grey"}`}>{ isPublished ? "Active" : "Inactive" }</span>
      </div>
      <p>{description}</p>
      <div className="tags">
        <span className={`govuk-tag lbh-tag lbh-tag${tags.includes("Development") ? "--green" : "--grey"}`}>Development</span>
        <span className={`govuk-tag lbh-tag lbh-tag${tags.includes("Staging") ? "--green" : "--grey"}`}>Staging</span>
        <span className={`govuk-tag lbh-tag lbh-tag${tags.includes("Production") ? "--green" : "--grey"}`}>Production</span>
      </div>
    </li>
  );
};

export default ApiPreview;
