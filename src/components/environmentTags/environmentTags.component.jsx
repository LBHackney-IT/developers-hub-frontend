const EnvironmentTags = ({tags, error}) => {
  if(!tags) tags = [];
  const errorStyling = { textDecoration: "line-through"};

  return(
    <div className="env-tags">
      <span 
        className={`govuk-tag lbh-tag lbh-tag${tags.includes("Development") ? "--yellow" : "--grey"}`}
        style={error && errorStyling}
      >Development</span>
      <span 
        className={`govuk-tag lbh-tag lbh-tag${tags.includes("Staging") ? "--yellow" : "--grey"}`}
        style={error && errorStyling}
        >Staging</span>
      <span 
        className={`govuk-tag lbh-tag lbh-tag${tags.includes("Production") ? "--green" : "--grey"}`}
        style={error && errorStyling}
        >Production</span>
      <span 
        className={`govuk-tag lbh-tag lbh-tag${tags.includes("Deprecated") ? "--red" : "--hidden"}`}
        style={error && errorStyling}
        >Deprecated</span>
    </div>
  )
}

export default EnvironmentTags;