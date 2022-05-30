import Skeleton from "react-loading-skeleton";

import Table from '../table/table.component';
import Select from '../select/select.component';
import ApiInformationLink from "../apiInformationLink/apiInformationLink.component";

const ApiInformationTable = ({ apiStatus, apiData, swaggerStatus, swaggerData, swaggerUtils }) => {
    const [getSwaggerHubSpecification, changeVersion] = swaggerUtils;

    const tableData = {
        "Version": <Skeleton />,
        "SwaggerHub Specification": <Skeleton />,
        "Development Base URL": <Skeleton />,
        "Staging Base URL": <Skeleton />,
        "Relevant Links": <ul>
            <li><Skeleton /></li>
            <li><Skeleton /></li>
        </ul>
    }; // default to unloaded

    if (swaggerStatus.isLoaded && !swaggerStatus.error) {
        tableData["Version"] = <Select name={"VersionNo"} options={swaggerData.versions?.map(x => x.version)} selectedOption={swaggerData.currentVersion?.version} onChange={changeVersion} />;
    }

    if (apiStatus.isLoaded && !apiStatus.error) {
        tableData["Development Base URL"] = <ApiInformationLink linkText={apiData.developmentBaseURL} url={apiData.developmentBaseURL} />;
        tableData["Staging Base URL"] = <ApiInformationLink linkText={apiData.stagingBaseURL} url={apiData.stagingBaseURL} />;
        tableData["Relevant Links"] = <ul>
            <li><ApiInformationLink linkText={`${apiData.apiName} Specification`} url={apiData.apiSpecificationLink} /></li>
            <li><ApiInformationLink linkText={`${apiData.apiName} GitHub Repository`} url={apiData.githubLink} /></li>
        </ul>;
    }

    if(swaggerStatus.isLoaded && apiStatus.isLoaded){
        if(!swaggerStatus.error){
            tableData["SwaggerHub Specification"] = <ApiInformationLink linkText={`${apiStatus.error ? swaggerData.info.title : apiData.apiName} v${swaggerData.currentVersion?.version} on SwaggerHub`} url={getSwaggerHubSpecification()} />;
        } else {
            tableData["SwaggerHub Specification"] = "We are having difficulty loading this data.";
            tableData["Version"] = "We are having difficulty loading this data.";
        }

        if(apiStatus.error){
            tableData["Development Base URL"] = "We are having difficulty loading this data.";
            tableData["Staging Base URL"] = "We are having difficulty loading this data.";
            tableData["Relevant Links"] = <ul>
                <li>We are having difficulty loading this data.</li>
                <li>We are having difficulty loading this data.</li>
            </ul>;
        }
    }

    return (
        <Table tableData={Object.entries(tableData)} />
    );
}

export default ApiInformationTable;