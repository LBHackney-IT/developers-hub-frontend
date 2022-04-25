import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const AddApplicationPage = () => {
  let history = useHistory();
  let { apiId, applicationName } = useParams();
  const apiUrl = `${
    process.env.REACT_APP_API_URL ||
    `http://${window.location.hostname}:8000/api/v1`
  }/${apiId}`;
  const [inputs, setInputs] = useState({ name: applicationName });

  if (applicationName) {
    axios
      .get(`${apiUrl}/${apiId}/${applicationName}`, {
        headers: { Authorization: Cookies.get("hackneyToken") },
      })
      .then((data) => setInputs((values) => ({ ...values, link: data.link })));
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    //This is where the API will go
    history.push(`/api-catalogue/${apiId}`);
    event.preventDefault();
    alert(JSON.stringify(inputs));
  };

  return (
    <main className="lbh-main-wrapper" id="apis-page" role="main">
      <div className="lbh-container">
        <form class="govuk-form-group lbh-form-group" onSubmit={handleSubmit}>
          <label class="govuk-label lbh-label" for="name">
            Application Name
          </label>
          <input
            class="govuk-input lbh-input"
            id="name"
            name="name"
            type="text"
            value={inputs.name}
            onChange={handleChange}
          />
          <label class="govuk-label lbh-label" for="link">
            Application Link
          </label>
          <input
            class="govuk-input lbh-input"
            id="link"
            name="link"
            type="text"
            value={inputs.link}
            onChange={handleChange}
          />
          <input
            class="govuk-button lbh-button"
            data-module="govuk-button"
            style={{ float: "right" }}
            type="submit"
            value="Save and Continue"
          />
        </form>
      </div>
    </main>
  );
};

export default AddApplicationPage;
