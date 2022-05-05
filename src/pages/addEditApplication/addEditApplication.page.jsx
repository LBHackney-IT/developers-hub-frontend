import React, { useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { NIL as NIL_UUID } from 'uuid';
import { useForm } from "react-hook-form";

import CancelDialog from "../../components/dialogs/cancelDialog.component";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component";
import Error from "../../components/error/error.component";

const AddEditApplicationPage = () => {
	let history = useHistory();
	let { apiId, id } = useParams();
	const apiUrl = `${process.env.REACT_APP_API_URL || `http://${window.location.hostname}:8000/api/v1`}/${apiId}/application/${id || NIL_UUID}`;

	const passedParams = useLocation().state || { name: null, link: null };
	const [apiError, setApiError] = useState();

	const { register, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			name: passedParams.name,
			link: passedParams.link
		}
	});

	const onSubmit = (data) => {
		axios.patch(apiUrl, data, { headers: { Authorization: Cookies.get("hackneyToken") }})
			.then(() => {
				history.push({
					pathname: `/api-catalogue/${apiId}`,
					state: {
						action: id ? "edited" : "added",
						name: data.name
					}
				});
			})
			.catch((e) => {
				setApiError(e);
			});
	};

	return (
		<main className="lbh-main-wrapper" id="add-edit-application-page" role="main">
			<div className="lbh-container">
				<Breadcrumbs />
        		<h1>{id ? "Edit" : "Add"} Application</h1>
				<form
					id="add-edit-application"
					className={`govuk-form-group lbh-form-group ${(errors.name || errors.link) && "govuk-form-group--error"}`}
					onSubmit={handleSubmit(onSubmit)}
				>
					<label className="govuk-label lbh-label" htmlFor="name">
						Application Name
					</label>
					{errors.name && 
						<span className="govuk-error-message lbh-error-message">
							<span className="govuk-visually-hidden">Error:</span> This field is required.
						</span>
					}
					<input
						className={`govuk-input lbh-input ${errors.name && "govuk-input--error"}`}
						id="name"
						name="name"
						type="text"
						aria-describedby={errors.name && "input-with-error-message-hint input-with-error-message-error"}
						{...register("name", { required: true })}
					/>

					<label className="govuk-label lbh-label" htmlFor="link">
						Application Link
					</label>
					{errors.link && 
						<span className="govuk-error-message lbh-error-message">
							<span className="govuk-visually-hidden">Error:</span> This field must be a link or empty.
						</span>
					}
					<input
						className={`govuk-input lbh-input${errors.link && " govuk-input--error"}`}
						id="link"
						name="link"
						type="text"
						aria-describedby={errors.link && "input-with-error-message-hint input-with-error-message-error"}
						{...register("link", { pattern: /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi })}
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
				{apiError && <Error title="Oops! Something went wrong!" summary={apiError.message} />}
			</div>
		</main>
	);
};

export default AddEditApplicationPage;
