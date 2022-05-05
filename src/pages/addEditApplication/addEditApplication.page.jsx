import React, { useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { NIL as NIL_UUID } from 'uuid';

import CancelDialog from "../../components/dialogs/cancelDialog.component";

const AddEditApplicationPage = () => {
	let history = useHistory();
	let { apiId, id } = useParams();
	const apiUrl = `${process.env.REACT_APP_API_URL || `http://${window.location.hostname}:8000/api/v1`}/${apiId}/application/${id || NIL_UUID}`;

	const passedParams = useLocation().state || { name: null, link: null };
	const [inputs, setInputs] = useState({ name: passedParams.name, link: passedParams.link });

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleSubmit = (event) => {
		axios.patch(apiUrl, inputs, { headers: { Authorization: Cookies.get("hackneyToken") }})
		.then(() => {
			history.push({
				pathname: `/api-catalogue/${apiId}`,
				state: inputs
			});
		})
		.catch();

		event.preventDefault();
	};

	return (
		<main className="lbh-main-wrapper" id="add-edit-application-page" role="main">
			<div className="lbh-container">
				<h1> Add A New Application</h1>
				<form
					id="add-edit-application"
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
				</form>
				<div className="button-panel">
					<CancelDialog backLink={`/api-catalogue/${apiId}`}/>
					<button
						className="govuk-button lbh-button"
						data-module="govuk-button"
						form="add-edit-application"
						type="submit"
					>
						Save and Continue
					</button>
				</div>
			</div>
		</main>
	);
};

export default AddEditApplicationPage;
