import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import ApiCataloguePage from "./pages/apiCatalogue/apiCatalogue.page";
import ApiInformationPage from "./pages/apiInformation/apiInformation.page"
import ContactPage from "./pages/contact/contact.page"
import { hyphenatedToTitleCase, camelToTitleCase } from "./utility/utility";

const ApiNameBreadcrumb = ({ match }) => {
  return <span>{match.params.apiName.includes("-") ? hyphenatedToTitleCase(match.params.apiName) : camelToTitleCase(match.params.apiName) }</span>
}

const APP_PATHS = [
  {
    path: "/",
    Component: HomePage,
    breadcrumb: 'Home',
    headingName: 'HOME',
    alwaysVisible: false
  },
  {
    path: "/api-catalogue",
    Component: ApiCataloguePage,
    breadcrumb: 'API Catalogue',
    headingName: 'API CATALOGUE',
    alwaysVisible: true
  },
  {
    path: "/api-catalogue/:apiName",
    Component: ApiInformationPage,
    breadcrumb: ApiNameBreadcrumb,
    alwaysVisible: false
  },
  {
    path: "/contact-us",
    Component: ContactPage,
    breadcrumb: 'Contact Us',
    headingName: 'CONTACT US',
    alwaysVisible: false
  },
  {
    path: "/login",
    Component: LoginPage,
    breadcrumb: 'Sign In',
    headingName: 'SIGN IN',
    signedOutVisible: true
  },
  {
    path: "/logout",
    Component: HomePage,
    breadcrumb: 'Register',
    headingName: 'SIGN OUT',
    signedInVisible: true
  },
]

export default APP_PATHS;
