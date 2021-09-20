import React from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { useLocation } from 'react-router-dom'

import APP_PATHS from "../../APP_PATHS.js"
import Link from "../link/link.component"

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(APP_PATHS);
  const location = useLocation();

  return (
      <div className="govuk-breadcrumbs lbh-breadcrumbs lbh-container">
        <ol className="govuk-breadcrumbs__list">
          { breadcrumbs.map(({ match, breadcrumb }) => (
              <li className="govuk-breadcrumbs__list-item" aria-current={location.pathname === match.url ? "page" : ""} key={match.url}>
                {
                  location.pathname === match.url ? ( breadcrumb ) 
                  : ( <Link className="govuk-breadcrumbs__link" href={match.url}>{breadcrumb}</Link> )
                }
              </li>
          ))}
        </ol>
      </div>
  );
}

export default Breadcrumbs