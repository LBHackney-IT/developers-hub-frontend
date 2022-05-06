import React, { useState, useEffect } from "react";
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

	let applicationData = useLocation().state;
	const [apiStatus, setApiStatus] = useState({isLoaded: Boolean(!id || applicationData)});

	const { register, handleSubmit, reset, formState: { errors, isDirty, dirtyFields } } = useForm({
		defaultValues: applicationData
	});
	const isValid = Object.keys(errors).length === 0;

	useEffect(() => {
		if(id && !applicationData)
			axios.get(apiUrl, {headers: { 'Authorization': Cookies.get('hackneyToken') }})
				.then((res) =>{
					reset(res.data, { dirtyFields: true });
					setApiStatus({isLoaded: true});
				})
				.catch((err) => {
					setApiStatus({isLoaded: true, error: err});
				});
	}, [id, applicationData, apiUrl, reset])

	const filterDirtyFields = (data) => {
		return Object.keys(data)
					.filter(fieldName => dirtyFields[fieldName])
					.reduce((obj, fieldName) => {
						obj[fieldName] = data[fieldName];
						return obj;
					}, {});
	}

	const onSubmit = (data) => {
		const dirtyData = filterDirtyFields(data);
		axios.patch(apiUrl, dirtyData, { headers: { Authorization: Cookies.get("hackneyToken") }})
			.then(() => {
				history.push({
					pathname: `/api-catalogue/${apiId}`,
					state: {
						action: id ? "edited" : "added",
						name: data.name
					}
				});
			})
			.catch((err) => {
				setApiStatus({isLoaded: true, error: err});
			});
	};

	return (
		<main className="lbh-main-wrapper" id="add-edit-application-page" role="main">
			<div className="lbh-container">
				<Breadcrumbs />
        		<h1>{id ? "Edit" : "Add"} Application</h1>
        		{ !apiStatus.isLoaded && <h3>Loading..</h3> }
				{apiStatus.isLoaded && <form
					id="add-edit-application"
					className={`govuk-form-group lbh-form-group ${errors.name && "govuk-form-group--error"}`}
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
					<input
						className={`govuk-input lbh-input`}
						id="link"
						name="link"
						type="text"
						{...register("link")}
					/>
				</form>}
				<div className="button-panel">
					<CancelDialog backLink={`/api-catalogue/${apiId}`}/>
					<button
						disabled={!(isValid && isDirty)}
						aria-disabled={!isValid || !isDirty}
						className={`govuk-button lbh-button ${(!isValid || !isDirty) && "lbh-button--disabled govuk-button--disabled"}`}
						data-module="govuk-button"
						form="add-edit-application"
						type="submit"
					>
						Save and Continue
					</button>
				</div>
				{apiStatus.error && <Error title="Oops! Something went wrong!" summary={apiStatus.error.message} />}
			</div>
		</main>
	);
};

// v | d | o
// 0 | 0 | 1
// 1 | 0 | 1
// 0 | 1 | 1
// 1 | 1 | 0

export default AddEditApplicationPage;
