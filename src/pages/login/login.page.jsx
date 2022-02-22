import withUser from "../../HOCs/with-user.hoc.js";
import { useLocation } from "react-router";
import Announcement from "../../components/announcement/announcment.component.jsx";

const LoginPage = () => {
  const state = useLocation().state;
  const redirectUri = state ? state.referrer.pathname : "";

  const privatePageMessage = <>
    The page you tried to access is private. Please sign in below to gain access.<br/>
    <a href="/" className="lbh-link lbh-link--no-visited-state">Back to homepage</a><br/>
  </>

  return (
    <main className="lbh-main-wrapper" id="login-page" role="main">
      <div className="lbh-container">
        { redirectUri && < Announcement
                          category={"warning"}
                          title={"You cannot access this page"}
                          content={privatePageMessage}
                        /> }
        <section className="sign-in">
          <h1 className="lbh-heading-h1">Sign in</h1>
          <a
            role="button"
            draggable="false"
            className="govuk-button lbh-button lbh-button--chevron"
            data-module="govuk-button"
            href={`https://auth.hackney.gov.uk/auth?redirect_uri=${window.location.origin}${redirectUri}`}
          >
              Sign in with Google
          </a>
          <p className="lbh-body-m">
            Please log in with your Hackney email account.<br/>
            Speak to your manager if you have issues signing in.
          </p>
        </section>
      </div>
    </main>
  );
};

export default withUser(LoginPage);
