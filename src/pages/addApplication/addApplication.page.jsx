import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Dialog from "../../components/dialogs/dialog.component";

const AddApplicationPage = () => {
  let history = useHistory();
  let { apiId, applicationName } = useParams();
  const apiUrl = `${
    process.env.REACT_APP_API_URL ||
    `http://${window.location.hostname}:8000/api/v1`
  }/${apiId}`;

  const [inputs, setInputs] = useState({ name: applicationName });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (applicationName) {
      axios
        .get(`${apiUrl}/${applicationName}`, {
          headers: { Authorization: Cookies.get("hackneyToken") },
        })
        .then((response) => {
          setInputs({ ...response.data });
        });
    }
  }, [apiUrl, apiId, applicationName]);

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
        <h1> Add A New Application</h1>
        <form
          className="govuk-form-group lbh-form-group"
          onSubmit={handleSubmit}
        >
          <label className="govuk-label lbh-label" htmlFor="name">
            Application Name
          </label>
          <input
            className="govuk-input lbh-input"
            id="name"
            name="name"
            type="text"
            value={inputs.name}
            onChange={handleChange}
          />
          <label className="govuk-label lbh-label" htmlFor="link">
            Application Link
          </label>
          <input
            className="govuk-input lbh-input"
            id="link"
            name="link"
            type="text"
            value={inputs.link}
            onChange={handleChange}
          />
          <Dialog
            title="Are you sure?"
            isOpen={open}
            onDismiss={() => setOpen(false)}
          >
            <div className="lbh-dialog__actions">
              <p className="lbh-body">You are about to revert the changes</p>{" "}
              <br />
              <button
                className="govuk-button lbh-button"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                onClick={() => setOpen(false)}
                className="lbh-link lbh-link--no-visited-state"
              >
                Cancel
              </button>
            </div>
          </Dialog>
          <div style={{ float: "right" }}>
            <input
              className="govuk-button govuk-secondary lbh-button lbh-button--secondary"
              data-module="govuk-button"
              style={{ marginRight: "5px", width: "9rem", height: "3.1rem" }}
              value="Cancel"
              onClick={() => setOpen(!open)}
            />
            <input
              className="govuk-button lbh-button"
              data-module="govuk-button"
              type="submit"
              value="Save and Continue"
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddApplicationPage;
