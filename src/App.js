import React from "react";
import "./App.css";

import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { auth } from './services/firebase';

import { PrivateRoute, PublicRoute } from './helpers/routes';
//import SignUp from './templates/SignUp';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Signup from './components/Signup';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });
  }


  render(){    
    return this.state.loading ? 
      (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute
            path="/quiz"
            authenticated={this.state.authenticated}
            component={Quiz}
          />
          <PublicRoute
            path="/signup"
            authenticated={this.state.authenticated}
            component={Signup}
          />
        </Switch>
      </Router> 
    );
  }
  
}

  
export default App;
