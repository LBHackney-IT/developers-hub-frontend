import React, { useState, useContext } from "react";
import FormInput from "../../components/form-input/form-input.component.jsx";
import UserContext from "../../context/user.context.js";
import Button from "../../components/button/button.component.jsx";
import { withRouter } from "react-router-dom";
import APP_PATHS from "../../APP_PATHS.js";

const LoginPage = ({ history, currentUser: user }) => {
  if (user) history.push(APP_PATHS.home);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [currentUser, setCurrentUser] = useState(user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // fetch api endpoint
    await fetch("apiURL");
    history.push(APP_PATHS.home);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

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
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default withRouter(LoginPage);
