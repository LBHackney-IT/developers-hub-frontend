import { React, useEffect, useState } from "react";
import { useLocation } from "react-router";

import withUser from "../../HOCs/with-user.hoc.js";
// import { hyphenatedToTitleCase } from "../../utility/utility.js";

import Table from "../../components/table/table.component.jsx";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component.jsx";
import Select from "../../components/select/select.component.jsx";
import Error from "../../components/error/error.component";
import EnvironmentTags from "../../components/environmentTags/environmentTags.component.jsx";
import { camelToTitleCase } from "../../utility/utility.js";

const ApiInformationPage = () => {
    //const { apiName } = useParams();
    const { SwaggerLink, Versions, SelectedVersion } = useLocation().state; 
    const apiRequestUrl = SwaggerLink.replace(SelectedVersion, "");

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [apiData, setApiData] = useState({});
    const [currentVersion, setCurrentVersion] = useState(SelectedVersion);


    const resetState = () => {
        setError(null);
        setIsLoaded(false);
        setApiData(null);
      }

    useEffect(() => {
        resetState();
        fetch(`${apiRequestUrl}${currentVersion}`)
            .then(res => res.json())
            .then((result) => {
                setApiData(result);
                setIsLoaded(true);
            })
            .catch((error) => {
                setError(error);
                setIsLoaded(true);
            })
        }, [apiRequestUrl, currentVersion]);

    const ApiData = {
        // apiName: "",
        // description: "",
        githubLink: "",
        swaggerLink: `${apiRequestUrl}${currentVersion}`.replace("api", "app").replace("/apis", "/apis-docs"),
        developmentBaseUrl: "",
        stagingBaseUrl: "",
        apiSpecificationLink: ""
    } // mocking API call
    
    const changeVersion = (version) => {
        setCurrentVersion(version);
        // placeholder
    }

    const SelectVersion = <Select name={"VersionNo"} options={Versions} selectedOption={currentVersion} onChange={changeVersion} />;
    const TableData = [
        ["Version", SelectVersion]
    ];

    for (const [key, value] of Object.entries(ApiData)) {
        TableData.push(
            [camelToTitleCase(key), value]
        );
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
                            <h1>{apiData.info.title}</h1>
                            <EnvironmentTags tags={apiData.tags ? apiData.tags.map(tag => tag.Name) : null} />
                            <p className="lbh-body-m">{apiData.info.description}</p>
                        </div>
                        <div className="main-container table-container">
                            <div className="inner-container">
                                <span className="govuk-caption-xl lbh-caption">API Information</span>
                                <hr/>
                                <Table tableData={TableData} />
                            </div>
                        </div>
                    </>
            )
            : 
            <h3>Loading..</h3>}
        </div>
    );
};

export default withUser(ApiInformationPage);
