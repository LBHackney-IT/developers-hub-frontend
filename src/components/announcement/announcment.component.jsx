import { useState } from "react";

const Announcement = ({category, title, content}) => {
    const [isHidden, setIsHidden] = useState(false);

    const closeAnnouncement = () => {
        setIsHidden(true);
    }

    return(
        <section 
            className={`lbh-page-announcement ${category ? `lbh-page-announcement--${category}` : ""}`}
            style={{display: isHidden && "none"}}
          >
            <h3 className="lbh-page-announcement__title">{title}</h3>
            <div className="lbh-page-announcement__content">
                {content}
            </div>
            <div className="lbh-page-announcement__button-panel">
              <button
                className="govuk-button govuk-secondary lbh-button lbh-button--secondary exit-button"
                data-module="govuk-button"
                onClick={closeAnnouncement}
              >
                Close message
              </button>
            </div>
          </section>
    )
}

export default Announcement;