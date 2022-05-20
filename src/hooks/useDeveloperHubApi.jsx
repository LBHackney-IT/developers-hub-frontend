import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Announcement from "../components/announcement/announcement.component";
import Error from "../components/error/error.component";

function useDeveloperHubApi(apiId, addAlert) {
    const [status, setStatus] = useState({
        isLoaded: false,
        error: null
    });

    const [data, setData] = useState({});

    const apiUrl = `${process.env.REACT_APP_API_URL || `http://${window.location.hostname}:8000/api/v1`}/${apiId}`;
    
    // Get data from API
    useEffect(() => {
        axios.get(apiUrl, {
            headers: { 'Authorization': Cookies.get('hackneyToken') }
        }).then((result) => {
            setData(result.data);
            setStatus({ isLoaded: true, error: null });
        }).catch((error) => {
            setStatus({ isLoaded: true, error: error });
            const errorMessage = <Error title="Oops! Something went wrong!" summary={error.message} key={apiUrl}/>
            addAlert(errorMessage);
        });
    }, [apiUrl, addAlert]);


    const deleteApplication = (id, name) => {
        axios.delete(`${apiUrl}/application/${id}`, {
            headers: { 'Authorization': Cookies.get('hackneyToken') }
        }).then(() => {
            let updatedApplications = data.applications.filter(x => x.id !== id);
            setData({ ...data, applications: updatedApplications }); // visually removing application
            
            const announcement = <Announcement title="Deletion successful!">
                You have successfully removed <b className='lbh-body lbh-!-font-weight-bold'>{name}</b> from this API.
            </Announcement>
            addAlert(announcement);
        }).catch((error) => {
            setStatus({ isLoaded: true, error: error });

            const deleteError = <Error title="Oops! Something went wrong when deleting this application!" summary={error.message} key={id}/>
            addAlert(deleteError);
        });
    }

    return [status, data, [deleteApplication]];
}

export default useDeveloperHubApi;