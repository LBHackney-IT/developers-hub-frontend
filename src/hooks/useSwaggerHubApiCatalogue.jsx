import { useState, useEffect } from "react";
import axios from "axios";

function useSwaggerHubApiCatalogue(searchQuery) {
    // From SwaggerHub Registry API Documentation
    // Map visual values to query params for API
    const queryParamsOptions = {
        state: {
            "All APIs": "ALL",
            "Live APIs": "PUBLISHED",
            "APIs in development": "UNPUBLISHED",
        },
        sort: {
            "Last Modified": { sort: "UPDATED", order: "DESC" },
            "A-Z": { sort: "TITLE", order: "ASC" },
            "Z-A": { sort: "TITLE", order: "DESC" },
            ...(searchQuery && { "Relevance": "BEST_MATCH" })

        }
    }

    const [status, setStatus] = useState({
        isLoaded: false,
        error: null
    });

    const [data, setData] = useState({
        apis: [],
        offset: 0
    });

    const [queryParams, setQueryParams] = useState({
        specType: "API",
        owner: "Hackney",
        page: 0,
        limit: 5,
        state: "ALL",
        sort: (searchQuery ? "BEST_MATCH" : "UPDATED"),
        order: "DESC",
        ...(searchQuery && { query: searchQuery })
    });

    useEffect(() => {
        function reset() {
            setStatus({ isLoaded: false, error: null });
            setData({ apis: [], offset: 0 });
        }

        function parseQueryParams() {
            return Object.keys(queryParams)
                .map(x => x + '=' + queryParams[x])
                .join('&');
        }

        reset();

        axios.get(`https://api.swaggerhub.com/specs?${parseQueryParams()}`)
            .then((result) => {
                var data = result.data;
                if (data.totalCount === 0) {
                    setStatus({
                        isLoaded: true,
                        error: { code: "No results", message: "No results found." }
                    });
                } else {
                    setData(data);
                    setStatus({ isLoaded: true, error: false });
                }
            })
            .catch((error) => {
                setStatus({ isLoaded: true, error: error });
            })
    }, [queryParams, searchQuery]);

    // public functions

    const getFormattedParamOptions = (paramName) => {
        const parameterOptions = queryParamsOptions[paramName];
        return Object.keys(parameterOptions);
    }

    const formatSelectedParam = (paramName) => {
        const selectedValue = queryParams[paramName]; // currently selected e.g. published
        const formattedOptions = queryParamsOptions[paramName]; // possible options

        return Object.keys(formattedOptions)
            .find(key => formattedOptions[key] === selectedValue);

    }

    const getPaginationData = () => {
        return {
            limit: queryParams.limit,
            offset: data.offset,
            totalCount: data.totalCount
        }
    }

    const updatePagination = (newPage) => {
        setQueryParams({ ...queryParams, page: newPage });
    }

    const updateApiFilter = (newApiFilter) => {
        setQueryParams({
            ...queryParams,
            state: queryParamsOptions.state[newApiFilter],
            page: 0
        });
    }

    const updateSortBy = (sortBy) => {
        setQueryParams({
            ...queryParams,
            ...queryParamsOptions.sort[sortBy],
            page: 0
        });
    }

    return [status, data, [getFormattedParamOptions, getPaginationData, formatSelectedParam], [updatePagination, updateApiFilter, updateSortBy]];
}

export default useSwaggerHubApiCatalogue;