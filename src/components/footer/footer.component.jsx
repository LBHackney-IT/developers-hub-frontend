import React from "react";
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
        <a href="/contact-us">Contact us</a>
      </div>
    </footer>
  );
};

export default withRouter(Footer);
