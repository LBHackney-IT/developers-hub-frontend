import React from "react";
import withUser from "../../HOCs/with-user.hoc.js";
import Table from "../../components/table/table.component.jsx";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component.jsx";
import Select from "../../components/select/select.component.jsx";
import EnvironmentTags from "../../components/environmentTags/environmentTags.component.jsx";

const ApiInformationPage = () => {
    
    const ApiData = {
        name: "Test API",
        description: "The default paragraph font size is 19px on large screens and 16px on small screens. A 19px body copy paragraph. This includes even more text to give a good representation of a more average length paragraph.That way you can see more than one line wrapping.",
        tags: ["Development", "Staging"]
    }
    
    const TableData = [
        ["Development Base URL", "https://test-api.service.hmrc.gov.uk"],
        ["Staging Base URL", "https://test-api.service.hmrc.gov.uk"],
        ["SwaggerHub Specification", "https://swaggerhub.com/apis/Hackney/abcdefg/1.0"],
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


    const changeVersion = (version) => {
        console.log(version);
        // placeholder
    }

    TableData.unshift(["Version", <Select name={"VersionNo"} options={["V1.0.0", "V2.0.0"]} onChange={changeVersion} />]);

    return (
        <div id="api-info-page" className="lbh-container">
            <div className="sidebar">
                <Breadcrumbs />
                <h1>{ApiData.name}</h1>
                <EnvironmentTags tags={ApiData.tags} />
                <p className="lbh-body-m">{ApiData.description}</p>
            </div>
            <div className="main-container table-container">
                <div className="inner-container">
                    <span className="govuk-caption-xl lbh-caption">API Information</span>
                    <hr/>
                    <Table tableData={TableData} />
                </div>
            </div>
        </div>
    );
};

export default withUser(ApiInformationPage);
