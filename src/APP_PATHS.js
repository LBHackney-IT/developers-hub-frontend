import { hyphenatedToTitleCase, camelToTitleCase } from "./utility/utility.js";

import HomePage from "./pages/home/home.page.jsx";
import LoginPage from "./pages/login/login.page.jsx";
import ApiCataloguePage from "./pages/apiCatalogue/apiCatalogue.page.jsx";
import ApiInformationPage from "./pages/apiInformation/apiInformation.page.jsx";
import ContactPage from "./pages/contact/contact.page.jsx";
import AddApplicationPage from "./pages/addApplication/addApplication.page.jsx";

import Link from "./components/link/link.component.jsx";

const ApiNameBreadcrumb = ({ match }) => {
  return (
    <span>
      {match.params.apiId.includes("-")
        ? hyphenatedToTitleCase(match.params.apiId)
        : camelToTitleCase(match.params.apiId)}
    </span>
  );
};

const ApiCatalogueBreadcrumb = ({ match, location }) => {
  if (location.search) {
    return (
      <>
        <span className="govuk-breadcrumbs__list-item">
          <Link className="govuk-breadcrumbs__link" href={match}>
            API Catalogue
          </Link>
        </span>
        <span className="govuk-breadcrumbs__list-item" aria-current="page">
          Search for "
          {decodeURIComponent(
            location.search.replace("?search=", "").replaceAll("+", " ")
          )}
          "
        </span>
      </>
    );
  } else {
    return <span>API Catalogue</span>;
  }
};

const APP_PATHS = [
  {
    path: "/",
    Component: HomePage,
    breadcrumb: "Home",
    headingName: "HOME",
    alwaysVisible: true,
    isPrivate: false,
  },
  {
    path: "/login",
    Component: LoginPage,
    breadcrumb: "Sign In",
    headingName: "SIGN IN",
    signedOutVisible: true,
    isPrivate: false,
  },
  {
    path: "/contact-us",
    Component: ContactPage,
    breadcrumb: "Contact Us",
    alwaysVisible: false,
    isPrivate: false,
  },
  {
    path: "/api-catalogue",
    Component: ApiCataloguePage,
    breadcrumb: ApiCatalogueBreadcrumb,
    headingName: "API CATALOGUE",
    alwaysVisible: true,
    isPrivate: true,
  },
  {
    path: "/api-catalogue/:apiId",
    Component: ApiInformationPage,
    breadcrumb: ApiNameBreadcrumb,
    alwaysVisible: false,
    isPrivate: true,
  },
  {
    path: "/api-catalogue/:apiId/applications/new",
    Component: AddApplicationPage,
    breadcrumb: "",
    alwaysVisible: false,
    isPrivate: true,
  },
  {
    path: "/api-catalogue/:apiId/applications/:applicationName/edit",
    Component: AddApplicationPage,
    breadcrumb: "",
    alwaysVisible: false,
    isPrivate: true,
  },
];

export default APP_PATHS;
