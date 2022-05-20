import React from "react";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useUser } from "../../context/user.context";

import ApiInformationLink from "../apiInformationLink/apiInformationLink.component";
import DeleteDialog from "../dialogs/deleteDialog.component";
    
const ApplicationsTable = (props) => {
    const {apiStatus, apiData} = props;
    const history = useHistory();
    const { apiId } = useParams();

    let user = useUser();
    let authAllowedGroups = process.env.REACT_APP_AUTH_ALLOWED_GROUPS || "Development Team,TEST_GROUP";
    const isAuthorised = user.groups.some((group) => authAllowedGroups.split(",").includes(group));

    const addApplicationOnClick = () => {
        history.push(`/api-catalogue/${apiId}/applications/new`);
    }

    const editApplicationOnClick = (application) => {
        history.push({
            pathname: `/api-catalogue/${apiId}/applications/${application.id}/edit`,
            state: application 
        });
    }

    return (
        <div id="applications-table">
            <div className="table-header">   
                <span className="govuk-caption-xl lbh-caption">
                    Applications that utilise this API
                </span>
                {isAuthorised && <button 
                    className="govuk-button lbh-button lbh-button--add"
                    onClick={addApplicationOnClick}
                >
                    <svg width="12" height="12" viewBox="0 0 12 12">
                        <path d="M6.94 0L5 0V12H6.94V0Z" />
                        <path d="M12 5H0V7H12V5Z" />
                    </svg>
                    Add a new application
                </button>}
            </div>
            <hr/>
            <div className="column-2">
                <dl className="govuk-summary-list lbh-summary-list">
                    {apiStatus.isLoaded && apiData.applications.map((application, key) => (
                        <div key={key} className="govuk-summary-list__row">
                            <dd className="govuk-summary-list__key">
                                <ApiInformationLink linkText={application.name} url={application.link}/>
                            </dd>
                            {isAuthorised && <dt className="govuk-summary-list__actions">
                                <ul>
                                    <li className="govuk-summary-list__actions-list-item">
                                        <button 
                                            className="lbh-link lbh-link--no-visited-state edit-link"
                                            onClick={() => editApplicationOnClick(application)}
                                        >
                                            Edit<span className="govuk-visually-hidden"> application</span>
                                        </button>
                                    </li>
                                    <li className="govuk-summary-list__actions-list-item">
                                        <DeleteDialog {...props} {...application}/>
                                    </li>
                                </ul>
                            </dt>}
                        </div>
                    ))}

                    {apiStatus.isLoaded && apiData.applications.length === 0 && <p className="lbh-body-m">No applications found.</p>}
                    {!apiStatus.isLoaded && <Skeleton />}
                </dl>
            </div>
        </div>
    );
};

export default ApplicationsTable;
