import React, { useState, useEffect, useContext } from "react";
import { UserProvider } from "./context/user.context";

import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";

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
  const currentUser = null;
  return (
    <UserProvider>
      <Header />
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
    </UserProvider>
  );
};

export default App;
