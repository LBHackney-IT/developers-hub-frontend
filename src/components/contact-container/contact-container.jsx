import React from "react";
import CONTACT_DATA from "./contact-data.js";

const ContactContainer = () => {
  return (
    <div className="contact-container">
      <div className="enquiries-half">
        <div className="header-circle">
          <h1 className="lbh-heading-h1">Enquiries</h1>
        </div>
        <div className="description-container">
          <h2>For any enquiries please speak to:</h2>
          <ul className="enquiries-list">
            {
              CONTACT_DATA.map(dataItem => (
                <li style={{wordWrap: "break-word"}}>
                  {dataItem}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className="feedback-half">
        <div className="header-circle">
          <h1 className="lbh-heading-h1">Feedback</h1>
        </div>
        <div className="description-container">
          <h2>Help Us Improve</h2>
          <p>We are always looking at ways we can improve. If you have any ideas or suggestions please share your feedback with our Development Team.</p>
          <p>We welcome all feedback or ideas in order to produce the best possible experience for our users.</p>
          <p>Our email address is: <b><u style={{wordWrap: "break-word"}}>developmentteam@hackney.gov.uk </u></b></p>
        </div>
      </div>
    </div>
  );
};

export default ContactContainer;
