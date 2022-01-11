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
import ApiInformationLink from "../../components/apiInformationLink/apiInformationLink.component.jsx";

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
    const [apiData, setApiData] = useState();
    const [swaggerData, setSwaggerData] = useState();

    const resetState = () => {
        window.scrollTo(0, 0);
        setError(null);
        setIsLoaded(false);
    }

    // Get data from API
    useEffect(() => {
        resetState();

        axios.get(apiUrl, { 
            headers: { 'Authorization': Cookies.get('hackneyToken') }
        }).then((result) => {
                setApiData(result.data);
            })
            .catch((error) => {
                setError(error);
                setIsLoaded(true);
            });
    }, [apiUrl]);

    // Get SwaggerHub data
    useEffect(() => {
        const handleSwaggerData = (result) => {
            setSwaggerData(result);
            setIsLoaded(true);
        };
        const handleApiVersioning = (result) => {
            const apiVersions = result.apis.map( api => filterSwaggerPropertiesByType(api.properties, "X-Version").value);
            setVersions(apiVersions);
            setCurrentVersion(apiVersions[0]);
        };

        resetState();

        axios.get(`${swaggerHubUrl}/${currentVersion || ''}`)
            .then( result => { 
                currentVersion ? handleSwaggerData(result.data) : handleApiVersioning(result.data) 
            })
            .catch((error) => {
                setError(error);
                setIsLoaded(true);
            });
    }, [swaggerHubUrl, currentVersion]);


    const formatApiData = () => {

        const changeVersion = (versionFormatted) => { 
            const version = versionFormatted.replace(/^((\d\.?)*) \[PUBLISHED]/gm, "$1")
            setCurrentVersion(version); 
        }
        const SelectVersion = <Select name={"VersionNo"} options={versions.map(v => v.replace(/^\*(.*)/gm, '$1 [PUBLISHED]'))} selectedOption={currentVersion} onChange={changeVersion} />;

        const Links = [
            {linkText: `${apiData.apiName} Specification`, url: apiData.apiSpecificationLink},
            {linkText: `${apiData.apiName} on SwaggerHub`, url: `${swaggerHubUrl}/${currentVersion}`.replace("api", "app").replace("/apis", "/apis-docs") },
            {linkText: `${apiData.apiName} GitHub Repository`, url: apiData.githubLink }
        ];

        TableData.push(
            ["Version", SelectVersion],
            ["Development Base URL", (<ApiInformationLink linkText={apiData.developmentBaseURL} url={apiData.developmentBaseURL}/>)],
            ["Staging Base URL", (<ApiInformationLink linkText={apiData.stagingBaseURL} url={apiData.stagingBaseURL}/>)],
            ["Relevant Links", Links.map(linkData => (
                <li key={linkData.url} >
                    <ApiInformationLink {...linkData} /> 
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
                                <h1>{apiData.apiName}</h1>
                                <EnvironmentTags tags={swaggerData.tags && swaggerData.tags.map(tag =>(tag.name))} />
                                <p className="lbh-body-m">{apiData.description}</p>
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
