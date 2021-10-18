import withUser from "../../HOCs/with-user.hoc.js";

const LoginPage = ({ history, currentUser: user }) => {

  return (
    <div id="login-page" className="page">
      <a
        role="button"
        draggable="false"
        className="govuk-button lbh-button"
        data-module="govuk-button"
        href={`https://auth.hackney.gov.uk/auth?redirect_uri=${window.location.origin}/`}
        >
        Sign in using Hackney.gov.uk
        </a>
    </div>
  );
};

export default withUser(LoginPage);
