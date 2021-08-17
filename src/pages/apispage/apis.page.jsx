import React, { useState } from "react";
import APP_PATHS from "../../APP_PATHS.js";
import { withRouter } from "react-router-dom";
import { API_TABLE, API_GROUP_TABLE, API_TAG_TABLE } from "../../mock_data/API_MOCK_DATA.js";

const ApisPage = ({ history, currentUser: user }) => {
  if (!user) history.push(APP_PATHS.home);

  const [currentUser, setCurrentUser] = useState(user);

  return (
    <div id="apis-page" className="page">
      
    </div>
  );
};

export default withRouter(ApisPage);
