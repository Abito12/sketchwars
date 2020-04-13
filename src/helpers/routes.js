import React from 'react';
import {Route, Redirect} from "react-router-dom";
  
export const PrivateRoute = ({
    component: Component,
    authenticated,
    currentUserId,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={(props) => authenticated ?
          <Component {...props} {...rest} currentUserId={currentUserId} /> : 
          <Redirect to={{ pathname: "/signup", state: { from: props.location } }} />
        }
      />
    );
  };
  
  export const PublicRoute = ({
    component: Component,
    authenticated,
    location,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={props => !authenticated ? <Component {...props} /> : <Redirect to={location.state &&  location.state.from && location.state.from.pathname || '/quiz'} />}
      />
    );
  };