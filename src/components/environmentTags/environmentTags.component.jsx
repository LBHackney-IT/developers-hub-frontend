import { includesCaseInsensitive } from "../../utility/utility";

const EnvironmentTags = ({tags, error}) => {
  if(!tags) tags = [];

  if(error){
    return( 
      <div className="env-tags">
        <p>Sorry, we're having difficulty loading this data</p>                    
      </div>);
  }
  return(
    <div className="env-tags">
      <span className={`govuk-tag lbh-tag lbh-tag${includesCaseInsensitive(tags, "Development") ? "--yellow" : "--grey"}`}>Development</span>
      <span className={`govuk-tag lbh-tag lbh-tag${includesCaseInsensitive(tags, "Staging") ? "--yellow" : "--grey"}`}>Staging</span>
      <span className={`govuk-tag lbh-tag lbh-tag${includesCaseInsensitive(tags, "Production") ? "--green" : "--grey"}`}>Production</span>
      <span className={`govuk-tag lbh-tag lbh-tag${includesCaseInsensitive(tags, "Deprecated") ? "--red" : "--hidden"}`}>Deprecated</span>
    </div>
  )
}

export default EnvironmentTags;