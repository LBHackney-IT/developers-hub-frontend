const EnvironmentTags = ({tags, error}) => {
  if(!tags) tags = [];
  const errorStyling = { textDecoration: "line-through"};

  if(error){
    return( 
      <div className="env-tags">
        <p>Sorry, we're having difficulty loading this data</p>                    
      </div>);
  }
  return(
    <div className="env-tags">
      <span className={`govuk-tag lbh-tag lbh-tag${tags.includes("Development") ? "--yellow" : "--grey"}`}>Development</span>
      <span className={`govuk-tag lbh-tag lbh-tag${tags.includes("Staging") ? "--yellow" : "--grey"}`}>Staging</span>
      <span className={`govuk-tag lbh-tag lbh-tag${tags.includes("Production") ? "--green" : "--grey"}`}>Production</span>
      <span className={`govuk-tag lbh-tag lbh-tag${tags.includes("Deprecated") ? "--red" : "--hidden"}`}>Deprecated</span>
    </div>
  )
}

export default EnvironmentTags;