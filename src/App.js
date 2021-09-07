import React, { useState, useEffect, useContext } from "react";
import UserContext from "./context/user.context.js";
import { Route, Switch } from "react-router-dom";

import APP_PATHS from "./APP_PATHS";

// Components
import Header from "./components/header/header.component.jsx";
import Footer from "./components/footer/footer.component.jsx";


const App = () => {
  const [currentUser, setCurrentUser] = useState(useContext(UserContext));

  useEffect(() => {
    (async () => {
      // Swap with API call after it is implemented
      const loggedIn = false;
      if (!loggedIn) {
        setCurrentUser({
          name: "Alex",
          email: "a@gmail.com",
          password: "aeCEHu374AUHi",
          passwordKey: "advhieahvia"
        })
      }
    })();
  }, []);

  return (
    <React.Fragment>
      <Header currentUser={currentUser} />
      <main className="lbh-main-wrapper" id="main-content" role="main">
        <div className="lbh-container">
          <Switch>
            {APP_PATHS.map(({ path, Component }, key) => (
              <Route exact path={path} key={key} render={() => (<Component currentUser={currentUser} />) } />
            ))}
          </Switch>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default App;
