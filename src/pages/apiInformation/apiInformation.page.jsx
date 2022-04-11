import { React, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import axios from "axios";
import Cookies from 'js-cookie';
import Skeleton from 'react-loading-skeleton';

import withUser from "../../HOCs/with-user.hoc.js";
import { filterSwaggerPropertiesByType } from "../../utility/utility";
import { useUser } from "../../context/user.context.js";
import { useHistory } from "react-router-dom";

import Table from "../../components/table/table.component.jsx";
import ApplicationsTable from "../../components/table/applicationsTable.component.jsx";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component.jsx";
import Select from "../../components/select/select.component.jsx";
import Error from "../../components/error/error.component";
import EnvironmentTags from "../../components/environmentTags/environmentTags.component.jsx";
import ApiInformationLink from "../../components/apiInformationLink/apiInformationLink.component.jsx";
import NotFoundPage from "../error/NotFound.page.jsx";
import ConfirmDeletion from "../../components/ConfirmDeletion/ConfirmDeletion.component.jsx";
import SuccessfulDeletion from "../../components/SuccessfulDeletion/SuccessfulDeletion.component.jsx";

const ApiInformationPage = () => {
    const currentuser = useUser();
    const history = useHistory();
    if (!currentuser) history.push("/");

    const { apiId } = useParams();
    const swaggerHubUrl = `https://api.swaggerhub.com/apis/Hackney/${apiId}`;
    const apiUrl = `${process.env.REACT_APP_API_URL || `http://${window.location.hostname}:8000/api/v1`}/${apiId}`;
    const passedParams = useLocation().state || { versions: null, currentVersion: null };

    const [swaggerStatus, setSwaggerStatus] = useState({isLoaded: false, error: null });
    const [apiStatus, setApiStatus] = useState({isLoaded: false, error: null });

    const [versions, setVersions] = useState(passedParams.versions || []);
    const [currentVersion, setCurrentVersion] = useState(passedParams.currentVersion);
    const [apiData, setApiData] = useState({});
    const [swaggerData, setSwaggerData] = useState({});
    const [isSelected, setIsSelected] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const resetState = () => {
        window.scrollTo(0, 0);
        setSwaggerStatus({isLoaded: false, error: null });
    }

    // Get data from API
    useEffect(() => {
        resetState();

        axios.get(apiUrl, {
            headers: { 'Authorization': Cookies.get('hackneyToken') }
        }).then((result) => {
                setApiData(result.data);
                setApiStatus({ isLoaded: true, error: null });
            })
            .catch((error) => {
                setApiStatus({ isLoaded: true, error: error });
            });
    }, [apiUrl]);

    // Get SwaggerHub data
    useEffect(() => {
        const handleSwaggerData = (result) => {
            setSwaggerData(result);
            setSwaggerStatus({ isLoaded: true, error: null });
        };
        const handleApiVersioning = (result) => {
            const apiVersions = result.apis.map( api =>
                filterSwaggerPropertiesByType(api.properties, "X-Version").value
            );
            setVersions(apiVersions);
            setCurrentVersion(apiVersions[0]);
        };

        resetState();

        axios.get(`${swaggerHubUrl}/${currentVersion || ''}`)
            .then( result => {
                currentVersion ? handleSwaggerData(result.data) : handleApiVersioning(result.data)
            })
            .catch((error) => {
                setSwaggerStatus({ isLoaded: true, error: error });
            });
    }, [swaggerHubUrl, currentVersion]);


    const formatApiData = () => {

        const changeVersion = (versionFormatted) => {
            const version = versionFormatted.replace(/^((\d\.?)*) \[PUBLISHED]/gm, "$1")
            setCurrentVersion(version);
        }
        const SelectVersion = <Select name={"VersionNo"} options={versions.map(v => v.replace(/^\*(.*)/gm, '$1 [PUBLISHED]'))} selectedOption={currentVersion} onChange={changeVersion} />;

        var swaggerLink;
        const isLoaded = apiStatus.error ? swaggerStatus.isLoaded : apiStatus.isLoaded;
        if(isLoaded){
            const apiName = apiStatus.error ? swaggerData.info.title : apiData.apiName;
            swaggerLink = <ApiInformationLink linkText={`${apiName} on SwaggerHub`} url={`${swaggerHubUrl}/${currentVersion}`.replace("api", "app").replace("/apis", "/apis-docs")} />;
        } else {
            swaggerLink = <Skeleton/>
        }

        var links; var devUrl; var stagingUrl;
        var actionLink;
        if(apiStatus.error){
            devUrl = stagingUrl = links =  <p>We're having difficulty loading this data.</p>
        } else {
            if(apiStatus.isLoaded){
                links = <ul>
                            <li><ApiInformationLink linkText={`${apiData.apiName} Specification`} url={apiData.apiSpecificationLink} /></li>
                            <li><ApiInformationLink linkText={`${apiData.apiName} GitHub Repository`} url={apiData.githubLink} /></li>
                        </ul>
                devUrl = <ApiInformationLink linkText={apiData.developmentBaseURL} url={apiData.developmentBaseURL}/>
                stagingUrl = <ApiInformationLink linkText={apiData.stagingBaseURL} url={apiData.stagingBaseURL}/>

                // TODO: add functionality to:
                // edit (PATCH endpoint functionality
                // delete (DELETE endpoint functionality)
                
                actionLink = <ul>
                                <li class="govuk-summary-list__actions-list-item">
                                  <a class="govuk-link" href="/" target="_blank">
                                    Edit<span class="govuk-visually-hidden"> application</span>
                                  </a>
                                </li>
                                <li class="govuk-summary-list__actions-list-item">
                                  <a onClick={() => setIsSelected(!isSelected)} class="govuk-link">
                                    Delete<span class="govuk-visually-hidden"> application</span>
                                  </a>
                                  
                                </li>
                                </ul>

            } else {
                links = <ul>
                            <li><Skeleton/></li>
                            <li><Skeleton/></li>
                            <li><Skeleton/></li>
                        </ul>
                devUrl = stagingUrl = <Skeleton/>
                actionLink = <Skeleton/>
            }
        }

        TableData.push(
            ["Version", SelectVersion],
            ["SwaggerHub Specification", swaggerLink],
            ["Development Base URL", devUrl],
            ["Staging Base URL", stagingUrl],
            ["Relevant Links", links]
        );

            // This is temporary to display the table
            // TODO: replace with implementation from GET endpoint
        ApplicationTableData.push(
            ["Manage My Home", actionLink],
            ["Social Care", actionLink],
            ["Finance", actionLink],
            ["Repairs Hub", actionLink]
        )
    }

    if(swaggerStatus.error && apiStatus.error){
        if(swaggerStatus.error.response.status === 404 && apiStatus.error.response.status === 404)
            return <NotFoundPage/>;

        return(
            <main className="lbh-main-wrapper" id="main-content" role="main">
                <div id="api-info-page" className="lbh-container">
                    <Error title="Oops! Something went wrong!" summary={swaggerStatus.error + " | " + apiStatus.error} />
                </div>
            </main>
        );
    }

    const TableData = [];
    const ApplicationTableData = [];
    if(!(apiStatus.error && swaggerStatus.error))
        formatApiData();

    return (
        <main className="lbh-main-wrapper" id="main-content" role="main">
            <div id="api-info-page" className="lbh-container">
                <div className="sidePanel">
                    <Breadcrumbs />
                    <h1>
                        {!apiStatus.error && (apiData.apiName || <Skeleton/>)}
                        {(apiStatus.error && (swaggerStatus.isLoaded ? swaggerData.info.title : <Skeleton/>))}
                    </h1>

                    {!swaggerStatus.isLoaded && <Skeleton/>}
                    {(swaggerStatus.isLoaded && !swaggerStatus.error) && <EnvironmentTags tags={swaggerData.tags && swaggerData.tags.map(tag =>(tag.name))} />}
                    {swaggerStatus.error && <EnvironmentTags error={true} />}

                    <p className="lbh-body-m">
                        {!apiStatus.error && (apiData.description || <Skeleton/>)}
                        {(apiStatus.error && (swaggerStatus.isLoaded ? swaggerData.info.description : <Skeleton/>))}
                    </p>
                </div>
                <div className="main-container table-container">
                        <span className="govuk-caption-xl lbh-caption">API Information</span>
                        <hr/>
                        <Table tableData={TableData} />
                        <span className="govuk-caption-xl lbh-caption">Applications consumed by</span>
                        <hr/>
                        <div className="column-2">
                        <ApplicationsTable tableData={ApplicationTableData} />
                        </div>
                        {isSelected && <ConfirmDeletion />}
                        {isDeleted && <SuccessfulDeletion />}
                        {swaggerStatus.error && <Error title="Oops! Something went wrong!" summary={swaggerStatus.error.message} />}
                        {apiStatus.error && <Error title="Oops! Something went wrong!" summary={apiStatus.error.message} />}
                </div>
            </div>
        </main>
    );
};

export default withUser(ApiInformationPage);
