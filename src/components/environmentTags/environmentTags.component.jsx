const EnvironmentTags = ({tags}) => {
    return(
    <div className="env-tags">
        <span className={`govuk-tag lbh-tag lbh-tag${tags.includes("Development") ? "--green" : "--grey"}`}>Development</span>
        <span className={`govuk-tag lbh-tag lbh-tag${tags.includes("Staging") ? "--green" : "--grey"}`}>Staging</span>
        <span className={`govuk-tag lbh-tag lbh-tag${tags.includes("Production") ? "--green" : "--grey"}`}>Production</span>
      </div>
    )
}

export default EnvironmentTags;