import { React, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import Skeleton from "react-loading-skeleton";

import withUser from "../../HOCs/with-user.hoc.js";
import { filterSwaggerPropertiesByType } from "../../utility/utility";

import Table from "../../components/table/table.component.jsx";
import ApplicationsTable from "../../components/applicationsTable/applicationsTable.component.jsx";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component.jsx";
import Select from "../../components/select/select.component.jsx";
import Error from "../../components/error/error.component";
import EnvironmentTags from "../../components/environmentTags/environmentTags.component.jsx";
import ApiInformationLink from "../../components/apiInformationLink/apiInformationLink.component.jsx";
import NotFoundPage from "../error/NotFound.page.jsx";
import Announcement from "../../components/announcement/announcement.component"
const ApiInformationPage = () => {
    const { apiId } = useParams();
    const swaggerHubUrl = `https://api.swaggerhub.com/apis/Hackney/${apiId}`;
    const apiUrl = `${process.env.REACT_APP_API_URL || `http://${window.location.hostname}:8000/api/v1`}/${apiId}`;
    const passedParams = useLocation().state || { versions: null, currentVersion: null, name: null, link: null };
    const [swaggerStatus, setSwaggerStatus] = useState({isLoaded: false, error: null });
    const [apiStatus, setApiStatus] = useState(
      {isLoaded: false, error: null });

    const [versions, setVersions] = useState(passedParams.versions || []);
    const [currentVersion, setCurrentVersion] = useState(passedParams.currentVersion);
    const [apiData, setApiData] = useState({});
    const [swaggerData, setSwaggerData] = useState({});
    const [announcements, setAnnouncements] = useState([
        ...passedParams.name ? [ <Announcement title="Success"> You have successfully added an application to this API </Announcement> ] : []
    ]);

    const resetState = () => {
        window.scrollTo(0, 0);
        setSwaggerStatus({isLoaded: false, error: null });
    }

    const deleteApplication = (applicationName) => {
        let updatedApplications = apiData.applications.filter(x => x.name !== applicationName);
        setApiData({...apiData, applications: updatedApplications}); // visually removing application
    }

    const addAnnouncement = (announcement) => {
        setAnnouncements([...announcements, announcement]);
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

            } else {
                links = <ul>
                            <li><Skeleton/></li>
                            <li><Skeleton/></li>
                        </ul>
                devUrl = stagingUrl = <Skeleton/>
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
    
                        {!apiStatus.error && <ApplicationsTable apiStatus={apiStatus} apiData={apiData} deleteApplication={deleteApplication} addAnnouncement={addAnnouncement}/>}
                        
                        {announcements}
                        {swaggerStatus.error && <Error title="Oops! Something went wrong!" summary={swaggerStatus.error.message} />}
                        {apiStatus.error && <Error title="Oops! Something went wrong!" summary={apiStatus.error.message} />}
                </div>
            </div>
        </main>
    );
};

export default withUser(ApiInformationPage);