import { React, useEffect, useState } from "react";
import { useLocation } from "react-router";

import withUser from "../../HOCs/with-user.hoc.js";

import Table from "../../components/table/table.component.jsx";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component.jsx";
import Select from "../../components/select/select.component.jsx";
import Error from "../../components/error/error.component";
import EnvironmentTags from "../../components/environmentTags/environmentTags.component.jsx";

const ApiInformationPage = () => {
    //const { apiName } = useParams();
    // use to get API name from params for API call
    const { SwaggerLink, Versions, SelectedVersion } = useLocation().state; 
    const apiRequestUrl = SwaggerLink.replace(SelectedVersion, "");

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentVersion, setCurrentVersion] = useState(SelectedVersion);
    const [apiData, setApiData] = useState({
        githubLink: null,
        swaggerLink: `${apiRequestUrl}${currentVersion}`.replace("api", "app").replace("/apis", "/apis-docs"),
        developmentBaseUrl: null,
        stagingBaseUrl: null,
        apiSpecificationLink: null,
        // fields that will be populated by an API call later
    });
    const resetState = () => {
        setError(null);
        setIsLoaded(false);
        // setApiData(null);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        resetState();
        fetch(`${apiRequestUrl}${currentVersion}`)
            .then(res => res.json())
            .then((result) => {
                setApiData((previousData) => ({
                    ...previousData, 
                    swaggerData: result
                }));
                setIsLoaded(true);
            })
            .catch((error) => {
                setError(error);
                setIsLoaded(true);
            })
        }, [apiRequestUrl, currentVersion]);

    const formatApiData = () => {
        const changeVersion = (version) => { setCurrentVersion(version); }
        const SelectVersion = <Select name={"VersionNo"} options={Versions} selectedOption={currentVersion} onChange={changeVersion} />;

        const Links = [
            {linkText: `${apiData.swaggerData.info.title} Specification`, url: apiData.apiSpecificationLink},
            {linkText: `${apiData.swaggerData.info.title} on SwaggerHub`, url: apiData.swaggerLink },
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
        <div id="api-info-page" className="lbh-container">
            {isLoaded ? ( 
                error ? 
                    <Error title="Oops! Something went wrong!" summary={error.message} /> 
                    :
                    <>
                        <div className="sidebar">
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
    );
};

export default withUser(ApiInformationPage);
