import React from "react";

const Details = (props) => {
    return(
        <details className="govuk-details lbh-details" data-module="govuk-details">
            <summary className="govuk-details__summary">
                <span className="govuk-details__summary-text">{props.summary}</span>
            </summary>
            <div className="govuk-details__text">
                {props.children}
            </div>
        </details>
    );
}

export default Details;
