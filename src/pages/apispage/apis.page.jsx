import React, { useState, useEffect } from "react";
import APP_PATHS from "../../APP_PATHS.js";
import { withRouter } from "react-router-dom";
import { API_TABLE, API_GROUP_TABLE, API_TAG_TABLE } from "../../mock_data/API_MOCK_DATA.js";

const ApisPage = ({ history, currentUser: user }) => {
  if (!user) history.push(APP_PATHS.home);

  const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    fetch("https://api.swaggerhub.com/apis/Hackney?page=2&limit=10")
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
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name}: {item.description}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default withRouter(ApisPage);
