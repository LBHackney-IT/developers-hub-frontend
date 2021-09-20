import React, { useState } from "react";
import APP_PATHS from "../../APP_PATHS.js";
import { withRouter } from "react-router-dom";
import ContactContainer from "../../components/contact-container/contact-container.jsx";
import withUser from "../../HOCs/with-user.hoc.js";

const ContactPage = () => {
  return (
    <div id="contact-page" className="page">
      <ContactContainer />
    </div>
  );
};

export default withUser(ContactPage);
