import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import './App.scss';
import "./utility/utility";
import APP_PATHS from "./APP_PATHS.js";
import { useUser } from "./context/user.context";

// Components
import Header from "./components/header/header.component.jsx";
import Footer from "./components/footer/footer.component.jsx";
import NotFoundPage from "./pages/error/NotFound.page";

const PrivateRoute = ({component: Component, currentUser, ...rest}) => {
  return (
    <Route
      {...rest}
      render={ (props) => currentUser === null
        ? <Redirect to={{pathname: '/login', state: {referrer: props.location}}} />
        : <Component {...props} />
      }
    />
  )
}

const App = () => {
  const currentUser = useUser();
  return (
    <>
      <Header />
          <Switch>
            {
              APP_PATHS.map(({path, Component, isPrivate}, key) => (
                isPrivate
                ? <PrivateRoute exact path={path} component={Component} currentUser={currentUser} key={key} />
                : <Route exact path={path} component={Component} key={key} />
              ))
            }
            <Route component={NotFoundPage}/>
          </Switch>
      <Footer />
    </>
  );
};

export default App;