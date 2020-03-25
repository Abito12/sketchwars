import React from 'react';
import {Route, Redirect} from "react-router-dom";
  
export const PrivateRoute = ({
    component: Component,
    authenticated,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={(props) => authenticated ?
          <Component {...props} /> : 
          <Redirect to={{ pathname: "/signup", state: { from: props.location } }} />
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
        render={props => !authenticated ? <Component {...props} /> : <Redirect to="/quiz" />}
      />
    );
  };
  