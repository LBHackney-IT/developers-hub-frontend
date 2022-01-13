const EnvironmentTags = ({tags}) => {
  if(!tags) tags = [];

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