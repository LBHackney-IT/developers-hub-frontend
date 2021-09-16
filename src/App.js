import React, { useState, useEffect, useContext } from "react";
import { UserProvider } from "./context/user.context";

import './App.scss';
import { Route, Switch, Redirect } from "react-router-dom";

import APP_PATHS from "./APP_PATHS.js";

// Components
import Header from "./components/header/header.component.jsx";
import Footer from "./components/footer/footer.component.jsx";

const App = () => {
  const currentUser = null;
  return (
    <UserProvider>
      <Header />
      <main className="lbh-main-wrapper" id="main-content" role="main">
          <Switch>
            {APP_PATHS.map(({ path, Component }, key) => (
              <Route exact path={path} key={key} render={() => (<Component currentUser={currentUser} />) } />
            ))}
          </Switch>
      </main>
      <Footer />
    </UserProvider>
  );
};

export default App;
