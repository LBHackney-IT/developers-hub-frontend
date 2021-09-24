import React from "react";
import { withRouter } from "react-router-dom";
import Link from "../link/link.component.jsx";

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
        <Link href="/contact-us">Contact us</Link>
      </div>
    </footer>
  );
};

export default withRouter(Footer);
