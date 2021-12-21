import { React, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import axios from "axios";
import Cookies from 'js-cookie';

import withUser from "../../HOCs/with-user.hoc.js";
import { filterSwaggerPropertiesByType } from "../../utility/utility";
import { useUser } from "../../context/user.context.js";
import { useHistory } from "react-router-dom";

import Table from "../../components/table/table.component.jsx";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component.jsx";
import Select from "../../components/select/select.component.jsx";
import Error from "../../components/error/error.component";
import EnvironmentTags from "../../components/environmentTags/environmentTags.component.jsx";

const ApiInformationPage = () => {
    const currentuser = useUser();
    const history = useHistory();
    if (!currentuser) history.push("/");
    
    const { apiName } = useParams();
    const swaggerHubUrl = `https://api.swaggerhub.com/apis/Hackney/${apiName}`;
    const apiUrl = `${process.env.REACT_APP_API_URL || `http://${window.location.hostname}:8000/api`}/${apiName}`;
    const passedParams = useLocation().state || { versions: null, currentVersion: null };

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [versions, setVersions] = useState(passedParams.versions);
    const [currentVersion, setCurrentVersion] = useState(passedParams.currentVersion);
    const [apiData, setApiData] = useState({
        githubLink: null,
        developmentBaseUrl: null,
        stagingBaseUrl: null,
        apiSpecificationLink: null,
        // fields that will be populated by an API call later
    });

    const resetState = () => {
        setError(null);
        setIsLoaded(false);
    }

    useEffect(() => {

        const handleSwaggerData = (result) => {
            setApiData((previousData) => ({ ...previousData, swaggerData: result}));
            setIsLoaded(true);
        }

        const handleApiData = (result) => {
            setApiData((previousData) => ({ ...previousData, ...result }));
        }

        const handleApiVersioning = (result) => {
            const apiVersions = result.apis.map( api => filterSwaggerPropertiesByType(api.properties, "X-Version").value);
            setVersions(apiVersions);
            setCurrentVersion(apiVersions[0]);
        }

        const getSwaggerHubData = () => {
            return axios.get(`${swaggerHubUrl}/${currentVersion || ''}`);
        }
        
        const getApiData = () => {
            return axios.get(apiUrl, {
                headers: {
                    'Authorization': Cookies.get('hackneyToken')
                }
            });
        }
        window.scrollTo(0, 0);
        resetState();

        Promise.all([getSwaggerHubData(), getApiData()])
            .then((results) => {
                const swaggerData  = results[0];
                const apiData  = results[1];
                currentVersion ? handleSwaggerData(swaggerData) : handleApiVersioning(swaggerData);
                handleApiData(apiData);
            })
            .catch((error) => {
                setError(error);
                setIsLoaded(true);
            });

    }, [swaggerHubUrl, apiUrl, currentVersion]);

    const formatApiData = () => {
        const changeVersion = (versionFormatted) => { 
            const version = versionFormatted.replace(/^((\d\.?)*) \[PUBLISHED]/gm, "$1")
            setCurrentVersion(version); 
        }
        const SelectVersion = <Select name={"VersionNo"} options={versions.map(v => v.replace(/^\*(.*)/gm, '$1 [PUBLISHED]'))} selectedOption={currentVersion} onChange={changeVersion} />;

        const Links = [
            {linkText: `${apiData.swaggerData.info.title} Specification`, url: apiData.apiSpecificationLink},
            {linkText: `${apiData.swaggerData.info.title} on SwaggerHub`, url: `${swaggerHubUrl}/${currentVersion}`.replace("api", "app").replace("/apis", "/apis-docs") },
            {linkText: `${apiData.swaggerData.info.title} GitHub Repository`, url: apiData.githubLink }
        ];

        TableData.push(
            ["Version", SelectVersion],
            ["Development Base URL", apiData.developmentBaseUrl],
            ["Staging Base URL", apiData.stagingBaseUrl],
            ["Relevant Links", Links.map(link => (
                <li key={link} >   
                    <a className="lbh-link lbh-link--no-visited-state" href={link.url} >{link.linkText} {!link.url && "(TBC)"}</a>
                </li>
            ))]
        );
    }

    const TableData = [];
    if (isLoaded && !error){
        formatApiData();
    }

    return (
        <main className="lbh-main-wrapper" id="main-content" role="main">
            <div id="api-info-page" className="lbh-container">
                {isLoaded ? ( 
                    error ? 
                        <Error title="Oops! Something went wrong!" summary={error.message} /> 
                        :
                        <>
                            <div className="sidePanel">
                                <Breadcrumbs />
                                <h1>{apiData.swaggerData.info.title}</h1>
                                <EnvironmentTags tags={apiData.swaggerData.tags && apiData.swaggerData.tags.map(tag =>(tag.name))} />
                                <p className="lbh-body-m">{apiData.swaggerData.info.description}</p>
                            </div>
                            <div className="main-container table-container">
                                    <span className="govuk-caption-xl lbh-caption">API Information</span>
                                    <hr/>
                                    <Table tableData={TableData} />
                            </div>
                        </>
                )
                : 
                <h3>Loading..</h3>}
            </div>
        </main>
    );
};

export default withUser(ApiInformationPage);
