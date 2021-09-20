import React, { useState, useContext } from "react";
import FormInput from "../../components/form-input/form-input.component.jsx";
import UserContext, { useUser } from "../../context/user.context.js";
import Button from "../../components/button/button.component.jsx";
import { withRouter } from "react-router-dom";
import APP_PATHS from "../../APP_PATHS.js";
import withUser from "../../HOCs/with-user.hoc.js";

const RegisterPage = ({ history, currentUser: user }) => {
  if (user) history.push(APP_PATHS.home);

  const [currentUser, setCurrentUser] = useState(user);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    org: "",
    email: "",
    createPass: "",
    confirmPass: ""
  });

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
    <UserContext.Provider value={currentUser}>
      <div id="register-page" className="page">
        <form id="register-form" onSubmit={handleSubmit}>
          <FormInput
            id="register-firstname"
            type="text"
            name="firstName"
            value={formData.firstName}
            label="First Name"
            required
            onChange={handleInput} />
          <br/>
          <FormInput
            id="register-lastname"
            type="text"
            name="lastName"
            value={formData.lastName}
            label="Last Name"
            required
            onChange={handleInput} />
          <br/>
          <FormInput
            id="register-org"
            type="text"
            name="org"
            value={formData.org}
            label="Organisation (Optional)"
            onChange={handleInput} />
          <br/>
          <FormInput
            id="register-email"
            type="email"
            name="email"
            value={formData.email}
            label="Email"
            required
            onChange={handleInput} />
          <br/>
          <FormInput
            id="register-createpass"
            type="password"
            name="createPass"
            value={formData.createPass}
            label="Create Password"
            required
            onChange={handleInput} />
          <br/>
          <FormInput
            id="register-confirmpass"
            type="password"
            name="confirmPass"
            value={formData.confirmPass}
            label="Confirm Password"
            required
            onChange={handleInput} />
          <br />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </UserContext.Provider>
  );
};

export default withUser(RegisterPage);
