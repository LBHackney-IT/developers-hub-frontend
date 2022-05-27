import { useEffect, useState } from "react";
import axios from "axios";
import { filterSwaggerPropertiesByType } from "../utility/utility";
import Error from "../components/error/error.component";

function useSwaggerHubApi(params, addAlert) {
    const [status, setStatus] = useState({
        isLoaded: false,
        error: null
    });

    const [data, setData] = useState({});
    const [versions, setVersions] = useState([]);
    const [currentVersion, setCurrentVersion] = useState(params.currentVersion);

    const requestUrl = `https://api.swaggerhub.com/apis/Hackney/${params.id}`;

    // Get all API Versions from SwaggerHub
    useEffect(() => {
        function handleVersioning(result) {
            var publishedVersionIndex;

            const apiVersions = result.apis?.map((api, index) => {
                const versionData = {
                    version: filterSwaggerPropertiesByType(api.properties, "X-Version").value,
                    isPublished: filterSwaggerPropertiesByType(api.properties, "X-Published").value === "true"
                };
                if (versionData.isPublished) publishedVersionIndex = index;
                return versionData;
            });

            setVersions(apiVersions);
            setCurrentVersion(apiVersions[publishedVersionIndex || 0]);
            // default to first version if no versions of the API are published
        };

        setStatus({ isLoaded: false, error: null });
        axios.get(requestUrl)
            .then(result => {
                handleVersioning(result.data)
            })
            .catch((error) => {
                setStatus({ isLoaded: true, error: error });
                const errorMessage = <Error title="Oops! Something went wrong!" summary={error.message} />
                addAlert(errorMessage);
            });
    }, [requestUrl, addAlert]);

    // Get current version API data from SwaggerHub
    useEffect(() => {
        if (currentVersion?.version)
            axios.get(`${requestUrl}/${currentVersion.version}`)
                .then(result => {
                    setData(result.data);
                    setStatus({ isLoaded: true, error: null });
                })
                .catch((error) => {
                    setStatus({ isLoaded: true, error: error });
                    const errorMessage = <Error title="Oops! Something went wrong!" summary={error.message} />
                    addAlert(errorMessage);
                });
    }, [currentVersion, requestUrl, addAlert])

    function getSwaggerHubSpecification() {
        return `${requestUrl.replace("api", "app").replace("/apis", "/apis-docs")}/${currentVersion.version}`;
    }

    function changeVersion(versionString) {
        setCurrentVersion({
            version: versionString,
            isPublished: versions.find(x => x.version === versionString)?.isPublished
        });
    }

    return [status, data, versions, currentVersion, [getSwaggerHubSpecification], [changeVersion]];
}

export default useSwaggerHubApi;