import React, { useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { NIL as NIL_UUID } from 'uuid';

import Dialog from "../../components/dialogs/dialog.component";

const AddEditApplicationPage = () => {
	let history = useHistory();
	let { apiId, id } = useParams();
	const apiUrl = `${process.env.REACT_APP_API_URL || `http://${window.location.hostname}:8000/api/v1`}/${apiId}/application/${id || NIL_UUID}`;

	const passedParams = useLocation().state || { name: null, link: null };
	const [inputs, setInputs] = useState({ name: passedParams.name, link: passedParams.link });

	const [open, setOpen] = useState(false);

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleSubmit = (event) => {
		axios.patch(apiUrl, inputs, {
		headers: { Authorization: Cookies.get("hackneyToken") }
		})
		.then(goBack())
		event.preventDefault();
	};

	const goBack = () => {
		history.push({
		pathname: `/api-catalogue/${apiId}`,
		state: inputs 
		});
	}

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
					
					<div style={{ float: "right" }}>
						<button
						className="govuk-button govuk-secondary lbh-button lbh-button--secondary"
						id="cancel"
						data-module="govuk-button"
						style={{ marginRight: "5px", width: "9rem", height: "3.1rem" }}
						onClick={() => setOpen(!open)}
						>
							Cancel
						</button>
						<input
						className="govuk-button lbh-button"
						data-module="govuk-button"
						type="submit"
						value="Save and Continue"
						/>
					</div>
				</form>
			</div>

			<Dialog
				title="Are you sure?"
				isOpen={open}
				onDismiss={() => setOpen(false)}
			>
				<div className="lbh-dialog__actions">
					<p className="lbh-body">You are about to revert the changes you have made</p>{" "}
					<br />
					<button
						className="govuk-button lbh-button"
						onClick={goBack}
					>
						Continue
					</button>
					<button
						onClick={() => setOpen(false)}
						className="lbh-link lbh-link--no-visited-state"
					>
						Cancel
					</button>
				</div>
			</Dialog>
		</main>
	);
};

export default AddEditApplicationPage;
