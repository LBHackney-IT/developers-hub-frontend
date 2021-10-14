import HomePage from "./pages/home/home.page.jsx";
import LoginPage from "./pages/login/login.page.jsx";
import ApiCataloguePage from "./pages/apiCatalogue/apiCatalogue.page.jsx";
import ApiInformationPage from "./pages/apiInformation/apiInformation.page.jsx";
import { hyphenatedToTitleCase, camelToTitleCase } from "./utility/utility.js";

const ApiNameBreadcrumb = ({ match }) => {
  return <span>{match.params.apiName.includes("-") ? hyphenatedToTitleCase(match.params.apiName) : camelToTitleCase(match.params.apiName) }</span>
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
    path: "/api-catalogue",
    Component: ApiCataloguePage,
    breadcrumb: 'API Catalogue',
    headingName: 'APIS',
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
    path: "/api-catalogue/:apiName",
    Component: ApiInformationPage,
    breadcrumb: ApiNameBreadcrumb,
    alwaysVisible: false
  },
]

export default APP_PATHS;
