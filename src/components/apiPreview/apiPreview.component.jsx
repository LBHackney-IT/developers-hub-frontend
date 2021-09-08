import React from "react";

const ApiPreview = ({name, description, tags, properties}) => {

  const urlData = properties.filter( property => property.type === "Swagger")[0];

  return (
    <li className="apiPreview">
      <div className="title">
        <a href={urlData.url.replace("api", "app")} className="lbh-link"><h3>{name}</h3></a>
        <span className={`govuk-tag lbh-tag${tags.includes("Active") ? "" : "--grey"}`}>{ tags.includes("Active") ? "Active" : "Inactive" }</span>
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
