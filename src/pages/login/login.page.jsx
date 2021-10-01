import React, { useState } from "react";
import FormInput from "../../components/form-input/form-input.component.jsx";
// import UserContext from "../../context/user.context.js";
// import Button from "../../components/button/button.component.jsx";
import APP_PATHS from "../../APP_PATHS.js";
import { SOCKET_ADDRESS } from "../../APP_CONFIG.js";
import withUser from "../../HOCs/with-user.hoc.js";
import Cookies from 'js-cookie';
import Link from "../../components/link/link.component";

import { useUser } from "../../context/user.context";

const LoginPage = ({ history, currentUser: user }) => {
  // if (user.user) history.push(APP_PATHS.home);
  const { setUser } = useUser();

  // set to true if the hackney oAuth token issue is solved
  const solvedCookieIssue = false;

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data // body data type must match "Content-Type" header
    });
    const responseData = await response.text(); // parses JSON response into native JavaScript objects
    return responseData;
  }

  // const [currentUser, setCurrentUser] = useState(user);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailInput = document.querySelector("#login-email");
    const passwordInput = document.querySelector("#login-pass");

    const jsonData = {email: emailInput.value, password: passwordInput.value};

    const formatData = new URLSearchParams(Object.entries(jsonData));

    const data = await postData(`${SOCKET_ADDRESS}${APP_PATHS.login}`, formatData.toString());
    console.log(data);
    if (data !== "{}") {
      // set user here
      history.push(APP_PATHS.home);
    } else {
      alert("Login failed!");
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  function cookieIssueFeatureFlag() {
    return (
      solvedCookieIssue ? (
        <a
          role="button"
          draggable="false"
          className="govuk-button lbh-button"
          data-module="govuk-button"
          href={`https://auth.hackney.gov.uk/auth?redirect_uri=${window.location.origin}/`}
          >
          Sign in using Hackney.gov.uk
          </a>
      ) : (
        <GenUserButton className="govuk-button lbh-button" setUser={setUser}>Sign in</GenUserButton>
      )
    );
  }

  return (
    <div id="login-page" className="page">
      <form
        id="login-form"
        onSubmit={handleSubmit}>
        <FormInput
          id="login-email"
          type="email"
          name="email"
          value={formData.email}
          label="Email"
          required
          onChange={handleInput} />
        <br/>
        <FormInput
          id="login-pass"
          type="password"
          name="password"
          value={formData.password}
          label="Password"
          required
          onChange={handleInput} />
        <br />
      </form>
      {
        cookieIssueFeatureFlag()
      }
    </div>
  );
};

// Button for mock user generation
function GenUserButton({ children, setUser }) {
  const generateUserCookie = () => {
    const user = {
      name: "User"
    };

    setUser(user);
  };

  return (
    <Link className="govuk-button lbh-button" href="/" handleClick={generateUserCookie}>{children}</Link>
  );
}

export default withUser(LoginPage);
