const Error = ({className, title, summary, link1, link2}) => {
    return(
        <div
            className={`govuk-error-summary optional-extra-class lbh-error-summary ${className}`}
            aria-labelledby="error-summary-title"
            role="alert"
            tabIndex="-1"
            data-module="govuk-error-summary"
            >
            <h2 className="govuk-error-summary__title" id="error-summary-title">
                {title}
            </h2>
            <div className="govuk-error-summary__body">
                <p>{summary}</p>
                <ul className="govuk-list govuk-error-summary__list">
                    { link1 &&
                        <li>
                            <a href={link1.url}>
                                {link1.text}
                            </a>
                        </li>
                    }
                    { link2 &&
                        <li>
                            <a href={link2.url}>
                                {link2.text}
                            </a>
                        </li>
                    }
                </ul>
            </div>
        </div>
    );
}

export default Error;
