import React from "react";
import APP_PATHS from "../../APP_PATHS.js";
import { withRouter } from "react-router-dom";

const Footer = ({ history }) => {
  return (
    <footer id="app-footer">
      <div className="footer-col">
        <a href="https://www.hackney.gov.uk/">Hackney sites</a>
      </div>
      <div className="footer-col">
        <a href="https://www.hackney.gov.uk/accessibility-help">Accessibility</a>
      </div>
      <div className="footer-col">
        <a onClick={() => history.push(APP_PATHS.contact)}>Contact us</a>
      </div>
    </footer>
  );
};

export default withRouter(Footer);
