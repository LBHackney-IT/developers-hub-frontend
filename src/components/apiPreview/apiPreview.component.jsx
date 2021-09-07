import React from "react";

const ApiPreview = ({name, description}) => {
  return (
    <li className="apiPreview">
      <div className="title">
        <h3>{name}</h3>
        <span className="govuk-tag lbh-tag">Active/Inactive</span>
      </div>
      <p>{description}</p>
      <div className="tags">
        <span className="govuk-tag lbh-tag lbh-tag--green">Development</span>
        <span className="govuk-tag lbh-tag lbh-tag--green">Staging</span>
        <span className="govuk-tag lbh-tag lbh-tag--green">Production</span>
      </div>
    </li>
  );
};

export default ApiPreview;
