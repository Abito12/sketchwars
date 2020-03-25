import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
  
  export const PrivateRoute = ({
    component: Component,
    authenticated,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={props =>
          authenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/signup", state: { from: props.location } }}
            />
          )
        }
      />
    );
  };
  
  export const PublicRoute = ({
    component: Component,
    authenticated,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={props =>
          authenticated === false ? (
            <Component {...props} />
          ) : (
            <Redirect to="/quiz" />
          )
        }
      />
    );
  };
  