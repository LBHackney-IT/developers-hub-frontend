import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const AddApplicationPage = () => {
  let history = useHistory();
  let { apiId } = useParams();
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    history.push(`/api-catalogue/${apiId}`);
    event.preventDefault();
    alert(inputs);
  };

  return (
    <main className="lbh-main-wrapper" id="apis-page" role="main">
      <div className="lbh-container">
        <form class="govuk-form-group lbh-form-group" onSubmit={handleSubmit}>
          <label class="govuk-label lbh-label" for="input-example">
            Application Name
          </label>
          <input
            class="govuk-input lbh-input"
            id="input-example"
            name="test-name"
            type="text"
            onChange={handleChange}
          />
          <label class="govuk-label lbh-label" for="input-example">
            Application Link
          </label>
          <input
            class="govuk-input lbh-input"
            id="input-example"
            name="test-name"
            type="text"
            onChange={handleChange}
          />

          <input
            class="govuk-button lbh-button"
            data-module="govuk-button"
            style={{ float: "right" }}
            type="submit"
          >
            Save and continue
          </input>
        </form>
      </div>
    </main>
  );
};

export default AddApplicationPage;
