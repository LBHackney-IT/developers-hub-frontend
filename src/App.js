import React from "react";
import { UserProvider } from "./context/user.context";

import './App.scss';
import { Route, Switch } from "react-router-dom";

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
        <div className="lbh-container">
          <Switch>
          // if currentUser render particular routes
            {APP_PATHS.map(({ path, Component }, key) => (
              <Route exact path={path} key={key} render={() => (<Component currentUser={currentUser} />) } />
            ))}
          </Switch>
        </div>
      </main>
      <Footer />
    </UserProvider>
  );
};

export default App;
