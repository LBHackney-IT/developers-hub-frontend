import React, { useState, useEffect, useContext } from "react";
import UserContext from "./context/user.context.js";

import './App.css';
import { Router, Route, Switch, Redirect } from "react-router-dom";

import APP_PATHS from "./APP_PATHS.js";

// Components
import Header from "./components/header/header.component.jsx";
import Footer from "./components/footer/footer.component.jsx";

// Pages
import HomePage from "./pages/home/home.page.jsx";
import LoginPage from "./pages/login/login.page.jsx"
import RegisterPage from "./pages/register/register.page.jsx";
import ApisPage from "./pages/apispage/apis.page.jsx";
import ContactPage from "./pages/contact/contact.page.jsx";

const App = () => {
  const [currentUser, setCurrentUser] = useState(useContext(UserContext));

  useEffect(() => {
    (async () => {
      // Swap with API call after it is implemented
      const loggedIn = false;
      if (loggedIn) {
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
    <UserContext.Provider value={currentUser}>
      <Header currentUser={currentUser} />
      <Switch>
        <Route
          exact
          path={APP_PATHS.home}
          component={HomePage}
          />
        <Route
          exact
          path={APP_PATHS.login}
          component={LoginPage}
          />
        <Route
          exact
          path={APP_PATHS.register}
          component={RegisterPage}
          />
        <Route
          exact
          path={APP_PATHS.allApis}
          component={ApisPage}
          />
        <Route
          exact
          path={APP_PATHS.contact}
          component={ContactPage}
          />
      </Switch>
      <Footer />
    </UserContext.Provider>
  );
};

export default App;
