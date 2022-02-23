import withUser from "../../HOCs/with-user.hoc.js";
import { useLocation } from 'react-router';


const LoginPage = ({ history, currentUser: user }) => {
  const state = useLocation().state;
  const redirectUri = state ? state.from.pathname : "";
  
  return (
    <div id="login-page" className="page">
    { redirectUri && 
      <a
        role="button"
        draggable="false"
        className="govuk-button lbh-button"
        data-module="govuk-button"
        href={`https://auth.hackney.gov.uk/auth?redirect_uri=${window.location.origin}${redirectUri}`}
      >
        Sign in using Hackney.gov.uk
      </a>
    }
    </div>
)}
export default withUser(LoginPage);
