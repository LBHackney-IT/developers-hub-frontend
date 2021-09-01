import React from "react";

const ApiPreview = ({name, description}) => {
  return (
    <li className="apiPreview">
      <h3>{name}</h3>
      <p>{description}</p>
    </li>
  );
};

export default ApiPreview;
