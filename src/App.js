import React from "react";
import {BrowserRouter as Router, Switch } from "react-router-dom";
import { auth } from "./services/firebase";

import { PrivateRoute, PublicRoute } from "./helpers/routes";
import Quiz from "./components/Quiz";
import Signup from "./components/Signup";
import Loader from './templates/Loader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: true
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
        this.setState({
          authenticated: !!user,
          loading: false
        });
    });
  }

  render() {
    const {loading, authenticated} = this.state;
    return loading ? 
      <Loader /> : 
      <Router>
        <Switch>
          <PrivateRoute exact path="/" authenticated={authenticated} component={Quiz} />
          <PrivateRoute path="/quiz" authenticated={authenticated} component={Quiz} />
          <PublicRoute path="/signup" authenticated={authenticated} component={Signup} />
        </Switch>
      </Router>;
  }
}

export default App;
