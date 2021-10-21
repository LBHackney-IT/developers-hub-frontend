import { hyphenatedToTitleCase, camelToTitleCase } from "./utility/utility.js";

import HomePage from "./pages/home/home.page.jsx";
import LoginPage from "./pages/login/login.page.jsx";
import ApiCataloguePage from "./pages/apiCatalogue/apiCatalogue.page.jsx";
import ApiInformationPage from "./pages/apiInformation/apiInformation.page.jsx";

import Link from "./components/link/link.component.jsx";

const ApiNameBreadcrumb = ({ match }) => {
  return <span>{match.params.apiName.includes("-") ? hyphenatedToTitleCase(match.params.apiName) : camelToTitleCase(match.params.apiName) }</span>
}

const SearchBreadcrumb = ({match, location}) => {
  if(location.search){
    return (
      <>
        <span className="govuk-breadcrumbs__list-item">
          <Link className="govuk-breadcrumbs__link" href={match}>Search</Link>
        </span>
        <span className="govuk-breadcrumbs__list-item" aria-current="page">Search for "{location.search.replace("?query=", "")}"</span>
      </>
    )
  } else {
    return(
      <span>Search</span>
    )
  }
}

const APP_PATHS = [
  {
    path: "/",
    Component: HomePage,
    breadcrumb: 'Home',
    headingName: 'HOME',
    alwaysVisible: true
  },
  {
    path: "/login",
    Component: LoginPage,
    breadcrumb: 'Sign In',
    headingName: 'SIGN IN',
    signedOutVisible: true
  },
  {
    path: "/api-catalogue",
    Component: ApiCataloguePage,
    breadcrumb: 'API Catalogue',
    headingName: 'API CATALOGUE',
    alwaysVisible: true
  },
  {
    path: "/api-catalogue/search",
    Component: ApiCataloguePage,
    breadcrumb: SearchBreadcrumb,
    alwaysVisible: false
  },
  {
    path: "/api-catalogue/api",
    breadcrumb: null,
    alwaysVisible: false
  },
  {
    path: "/api-catalogue/api/:apiName",
    Component: ApiInformationPage,
    breadcrumb: ApiNameBreadcrumb,
    alwaysVisible: false
  }
]

export default APP_PATHS;
