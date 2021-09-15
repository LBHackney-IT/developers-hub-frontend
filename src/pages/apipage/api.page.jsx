import React from "react";
import withUser from "../../HOCs/with-user.hoc.js";
import Table from "../../components/table/table.component.jsx";

const ApiPage = () => {
    
    const ApiData = {
        name: "Test API",
        description: "The default paragraph font size is 19px on large screens and 16px on small screens. A 19px body copy paragraph. This includes even more text to give a good representation of a more average length paragraph.That way you can see more than one line wrapping.",
        tags: ["Development", "Staging"]
    }
    
    const TableData = [
        ["Version", "Select"],
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

  return (
      <div id="api-info-page" className="page">
          <div className="sidebar">
            <h1>{ApiData.name}</h1>
            <div className="tags">
                <span class={`govuk-tag lbh-tag lbh-tag--${ApiData.tags.includes("Development") ? "green" : "grey"}`}>Development</span>
                <span class={`govuk-tag lbh-tag lbh-tag--${ApiData.tags.includes("Staging") ? "green": "grey"}`}>Staging</span>
                <span class={`govuk-tag lbh-tag lbh-tag--${ApiData.tags.includes("Production") ? "green": "grey"}`}>Production</span>
            </div>
            <p className="lbh-body-m">{ApiData.description}</p>
          </div>
          <div className="main-container table-container">
                <span class="govuk-caption-xl lbh-caption">API Information</span>
                <Table tableData={TableData} />
          </div>
      </div>
  );
};

export default withUser(ApiPage);
