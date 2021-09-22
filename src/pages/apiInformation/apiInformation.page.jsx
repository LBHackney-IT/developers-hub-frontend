import { React, useEffect, useState } from "react";
import { useLocation } from "react-router";

import withUser from "../../HOCs/with-user.hoc.js";
// import { parseApiName } from "../../utility/utility.js";

import Table from "../../components/table/table.component.jsx";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component.jsx";
import Select from "../../components/select/select.component.jsx";
import Error from "../../components/error/error.component";
import EnvironmentTags from "../../components/environmentTags/environmentTags.component.jsx";

const ApiInformationPage = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [apiData, setApiData] = useState({});

    //const { apiName } = useParams();
    const { SwaggerLink } = useLocation().state; 

    useEffect(() => {
        fetch(SwaggerLink)
            .then(res => res.json())
            .then((result) => {
                setApiData(result);
                setIsLoaded(true);
            })
            .catch((error) => {
                setError(error);
                setIsLoaded(true);
            })
        }, [SwaggerLink]);
    
    const changeVersion = (version) => {
        console.log(version);
        // placeholder
    }

    const TableData = [
        ["Version", <Select name={"VersionNo"} options={["V1.0.0", "V2.0.0"]} onChange={changeVersion} />],
        ["Development Base URL", "https://test-api.service.hmrc.gov.uk"],
        ["Staging Base URL", "https://test-api.service.hmrc.gov.uk"],
        ["SwaggerHub Specification", <a href={`https://swaggerhub.com/apis${apiData.basePath}`}>https://swaggerhub.com/apis{apiData.basePath}</a>],
        ["API Specification", "https://playbook.hackney.gov.uk/api-specifications/"],
        ["GitHub Repository", "https://github.com/LBHackney-IT/abcdefghijkl"],
        ["Contacts",
            <ul>
                <li>sarah.phillips@example.com</li>
                <li>claudia.phillips@example.com</li>
                <li>sarah.john@example.com</li>
            </ul>
        ],
    ];

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
