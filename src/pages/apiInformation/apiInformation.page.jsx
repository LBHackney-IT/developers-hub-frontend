import { React, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router";

import Skeleton from "react-loading-skeleton";

import useSwaggerHubApi from "../../hooks/useSwaggerHubApi.jsx";
import useDeveloperHubApi from "../../hooks/useDeveloperHubApi.jsx";
import withUser from "../../HOCs/with-user.hoc.js";

import ApplicationsTable from "../../components/applicationsTable/applicationsTable.component.jsx";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component.jsx";
import Error from "../../components/error/error.component";
import EnvironmentTags from "../../components/environmentTags/environmentTags.component.jsx";
import NotFoundPage from "../error/NotFound.page.jsx";
import Announcement from "../../components/announcement/announcement.component";
import ApiInformationTable from "../../components/apiInformationTable/apiInformationTable.component.jsx";

const ApiInformationPage = () => {
    const { apiId } = useParams();
    const passedParams = useLocation().state || { currentVersion: null, action: null, name: null };
    // Alerts
    const [alerts, setAlerts] = useState([
        ...passedParams.action ? [
            <Announcement title={`Successfully ${passedParams.action}!`} key={passedParams.name}>
                You have successfully {passedParams.action} <b className='lbh-body lbh-!-font-weight-bold'>{passedParams.name}</b>{passedParams.action === "added" && " to this API"}.
            </Announcement>] : []
    ]);

    const addAlert = useCallback((alert) => {
        setAlerts(oldAlerts => [...oldAlerts, alert]);
    }, []);

    // SwaggerHub API
    const [swaggerStatus, swaggerData, swaggerUtils] = useSwaggerHubApi({ id: apiId, currentVersion: passedParams.currentVersion }, addAlert);
    // Developer Hub API
    const [apiStatus, apiData, developerHubUtils] = useDeveloperHubApi(apiId, addAlert);
    const [deleteApplication] = developerHubUtils;

    if (swaggerStatus.error && apiStatus.error) {
        if (swaggerStatus.error.response?.status === 404 && apiStatus.error.response?.status === 404)
            return <NotFoundPage />;

        return (
            <main className="lbh-main-wrapper" id="main-content" role="main">
                <div id="api-info-page" className="lbh-container">
                    <Error title="Oops! Something went wrong!" summary={swaggerStatus.error + " | " + apiStatus.error} />
                </div>
            </main>
        );
    }

    return (
        <main className="lbh-main-wrapper" id="main-content" role="main">
            <div id="api-info-page" className="lbh-container">
                <div className="sidePanel">
                    <Breadcrumbs />
                    {!swaggerStatus.isLoaded && <Skeleton />}
                    {(swaggerStatus.isLoaded && !swaggerStatus.error) &&
                        <span className={`govuk-tag lbh-tag${swaggerData.currentVersion.isPublished ? "--green" : "--yellow"} published-status-tag`}>
                            {swaggerData.currentVersion.isPublished ? "Live" : "In Development"}
                        </span>
                    }
                    <h1>
                        {!apiStatus.error && (apiData.apiName || <Skeleton />)}
                        {(apiStatus.error && (swaggerStatus.isLoaded ? swaggerData.info.title : <Skeleton />))}
                    </h1>

                    {!swaggerStatus.isLoaded && <Skeleton />}
                    {swaggerStatus.isLoaded && <EnvironmentTags tags={swaggerData?.tags && swaggerData?.tags.map(tag => (tag.name))} error={swaggerStatus.error !== null}/>}

                    <p className="lbh-body-m">
                        {!apiStatus.error && (apiData.description || <Skeleton />)}
                        {(apiStatus.error && (swaggerStatus.isLoaded ? swaggerData.info.description : <Skeleton />))}
                    </p>
                </div>

                <div className="main-container">
                    <span className="govuk-caption-xl lbh-caption">API Information</span>
                    <hr />
                    <ApiInformationTable apiStatus={apiStatus} apiData={apiData} swaggerStatus={swaggerStatus} swaggerData={swaggerData} swaggerUtils={swaggerUtils} />
                    <ApplicationsTable apiStatus={apiStatus} apiData={apiData} deleteApplication={deleteApplication} addAnnouncement={addAlert} />
                    {alerts}
                </div>
            </div>
        </main>
    );
};

export default withUser(ApiInformationPage);