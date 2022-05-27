import { React, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router";

import Skeleton from "react-loading-skeleton";

import useSwaggerHubApi from "../../hooks/useSwaggerHubApi.jsx";
import useDeveloperHubApi from "../../hooks/useDeveloperHubApi.jsx";
import withUser from "../../HOCs/with-user.hoc.js";

import Table from "../../components/table/table.component.jsx";
import ApplicationsTable from "../../components/applicationsTable/applicationsTable.component.jsx";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component.jsx";
import Select from "../../components/select/select.component.jsx";
import Error from "../../components/error/error.component";
import EnvironmentTags from "../../components/environmentTags/environmentTags.component.jsx";
import ApiInformationLink from "../../components/apiInformationLink/apiInformationLink.component.jsx";
import NotFoundPage from "../error/NotFound.page.jsx";
import Announcement from "../../components/announcement/announcement.component";

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
    const [swaggerStatus, swaggerData, versions, currentVersion, swaggerUtils, swaggerFunctions] = useSwaggerHubApi({ id: apiId, currentVersion: passedParams.currentVersion }, addAlert);
    const [getSwaggerHubSpecification] = swaggerUtils;
    const [changeVersion] = swaggerFunctions;
    // Developer Hub API
    const [apiStatus, apiData, developerHubFunctions] = useDeveloperHubApi(apiId, addAlert);
    const [deleteApplication] = developerHubFunctions;

    const formatApiData = () => {
        const SelectVersion = <Select name={"VersionNo"} options={versions?.map(x => x.version)} selectedOption={currentVersion?.version} onChange={changeVersion} />;

        var swaggerLink;
        const isLoaded = apiStatus.error ? swaggerStatus.isLoaded : apiStatus.isLoaded;
        if (isLoaded) {
            const apiName = apiStatus.error ? swaggerData.info.title : apiData.apiName;
            swaggerLink = <ApiInformationLink linkText={`${apiName} v${currentVersion?.version} on SwaggerHub`} url={getSwaggerHubSpecification()} />;
        } else {
            swaggerLink = <Skeleton />
        }

        var links; var devUrl; var stagingUrl;
        if (apiStatus.error) {
            devUrl = stagingUrl = links = <p>We're having difficulty loading this data.</p>
        } else {
            if (apiStatus.isLoaded) {
                links = <ul>
                    <li><ApiInformationLink linkText={`${apiData.apiName} Specification`} url={apiData.apiSpecificationLink} /></li>
                    <li><ApiInformationLink linkText={`${apiData.apiName} GitHub Repository`} url={apiData.githubLink} /></li>
                </ul>
                devUrl = <ApiInformationLink linkText={apiData.developmentBaseURL} url={apiData.developmentBaseURL} />
                stagingUrl = <ApiInformationLink linkText={apiData.stagingBaseURL} url={apiData.stagingBaseURL} />

            } else {
                links = <ul>
                    <li><Skeleton /></li>
                    <li><Skeleton /></li>
                </ul>
                devUrl = stagingUrl = <Skeleton />
            }
        }

        TableData.push(
            ["Version", SelectVersion],
            ["SwaggerHub Specification", swaggerLink],
            ["Development Base URL", devUrl],
            ["Staging Base URL", stagingUrl],
            ["Relevant Links", links]
        );
    }

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

    const TableData = [];
    if (!(apiStatus.error && swaggerStatus.error))
        formatApiData();

    return (
        <main className="lbh-main-wrapper" id="main-content" role="main">
            <div id="api-info-page" className="lbh-container">
                <div className="sidePanel">
                    <Breadcrumbs />
                    {!currentVersion && <Skeleton />}
                    {(currentVersion && !swaggerStatus.error) &&
                        <span className={`govuk-tag lbh-tag${currentVersion.isPublished ? "--green" : "--yellow"} published-status-tag`}>
                            {currentVersion.isPublished ? "Live" : "In Development"}
                        </span>
                    }
                    <h1>
                        {!apiStatus.error && (apiData.apiName || <Skeleton />)}
                        {(apiStatus.error && (swaggerStatus.isLoaded ? swaggerData.info.title : <Skeleton />))}
                    </h1>

                    {!swaggerStatus.isLoaded && <Skeleton />}
                    {(swaggerStatus.isLoaded && !swaggerStatus.error) && <EnvironmentTags tags={swaggerData.tags && swaggerData.tags.map(tag => (tag.name))} />}
                    {swaggerStatus.error && <EnvironmentTags error={true} />}

                    <p className="lbh-body-m">
                        {!apiStatus.error && (apiData.description || <Skeleton />)}
                        {(apiStatus.error && (swaggerStatus.isLoaded ? swaggerData.info.description : <Skeleton />))}
                    </p>
                </div>

                <div className="main-container">
                    <span className="govuk-caption-xl lbh-caption">API Information</span>
                    <hr />
                    <Table tableData={TableData} />

                    {!apiStatus.error && <ApplicationsTable apiStatus={apiStatus} apiData={apiData} deleteApplication={deleteApplication} addAnnouncement={addAlert} />}
                </div>
                {alerts}
            </div>
        </main>
    );
};

export default withUser(ApiInformationPage);