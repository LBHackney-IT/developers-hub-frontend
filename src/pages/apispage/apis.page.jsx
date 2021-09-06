import React, { useState, useEffect } from "react";
// import APP_PATHS from "../../APP_PATHS.js";
import { withRouter } from "react-router-dom";
// import { API_TABLE, API_GROUP_TABLE, API_TAG_TABLE } from "../../mock_data/API_MOCK_DATA.js";
import ApiPreview from "../../components/apiPreview/apiPreview.component";

const ApisPage = ({ history, currentUser: user }) => {
  // if (!user) history.push(APP_PATHS.home);

  // const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://api.swaggerhub.com/apis/Hackney?page=0&limit=5")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.apis);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div id="apis-page" className="page">
        <h3>Loading....</h3>
      </div>);
  } else {
    return (
      <div id="apis-page" className="page">
        <h1>All APIs</h1>
        <ul id="apisList">
          {items.map((item, index) => (
            < ApiPreview key={index} {...item} />
          ))}
        </ul>
      </div>
    );
  }
};

export default withRouter(ApisPage);
