import React from "react";

const ApiPreview = ({name, description}) => {
  return (
    <li><p>
      <b style={{"font-weight": "bold"}}>{name}</b>: <br/> 
      {description}
    </p></li>
  );
};

export default ApiPreview;
