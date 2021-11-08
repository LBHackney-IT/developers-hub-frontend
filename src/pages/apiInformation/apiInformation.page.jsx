import { React, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";

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
    const apiRequestUrl = `https://api.swaggerhub.com/apis/Hackney/${apiName}`;
    const passedParams = useLocation().state || {versions: null, currentVersion: null };

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

        const handleApiData = (result) => {
            setApiData((previousData) => ({ ...previousData, swaggerData: result}));
            setIsLoaded(true);
        }

        const handleApiVersioning = (result) => {
            const versions = result.apis.map( api => filterSwaggerPropertiesByType(api.properties, "X-Version").value);
            setVersions(versions);
            setCurrentVersion(versions[0]);
        }

        window.scrollTo(0, 0);
        resetState();

        fetch(`${apiRequestUrl}/${currentVersion || ''}`)
            .then(res => res.json())
            .then( result => { currentVersion ? handleApiData(result) : handleApiVersioning(result) })
            .catch((error) => {
                setError(error);
                setIsLoaded(true);
            })

    }, [apiRequestUrl, currentVersion]);

    const formatApiData = () => {
        const changeVersion = (version) => { setCurrentVersion(version); }
        const SelectVersion = <Select name={"VersionNo"} options={versions} selectedOption={currentVersion} onChange={changeVersion} />;

        const Links = [
            {linkText: `${apiData.swaggerData.info.title} Specification`, url: apiData.apiSpecificationLink},
            {linkText: `${apiData.swaggerData.info.title} on SwaggerHub`, url: `${apiRequestUrl}/${currentVersion}`.replace("api", "app").replace("/apis", "/apis-docs") },
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
