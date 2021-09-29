import HomePage from "./pages/home/home.page.jsx";
import LoginPage from "./pages/login/login.page.jsx";
import RegisterPage from "./pages/register/register.page.jsx";
import ApisPage from "./pages/apispage/apis.page.jsx";
import ContactPage from "./pages/contact/contact.page"

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
    Component: ApisPage,
    breadcrumb: 'API Catalogue',
    headingName: 'APIS',
    alwaysVisible: true
  },
  {
    path: "/contact-us",
    Component: ContactPage,
    breadcrumb: 'Contact Us',
    headingName: 'CONTACT US',
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
    path: "/register",
    Component: RegisterPage,
    breadcrumb: 'Register',
    headingName: 'SIGN UP',
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
