import { React } from "react";

const ApiInformationLink = ({ linkText, url }) => {
  if (!url) {
    return <p>{linkText} (Link To Be Confirmed)</p>;
  } else {
    return (
      <a className="lbh-link lbh-link--no-visited-state" href={url}>
        {linkText}
      </a>
    );
  }
};

export default ApiInformationLink;
