import React from "react";
import {BrowserRouter as Router, Switch } from "react-router-dom";
import { auth } from "./services/firebase";

import { PrivateRoute, PublicRoute } from "./helpers/routes";
import Quiz from "./components/Quiz";
import Signup from "./components/Signup";
import Loader from './templates/Loader';

import { db } from "./services/firebase";
import { seedUser } from "./helpers/seed";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: true,
      roundTime: 10,
      numQuestions: 10,
      questionScore: 20,
      theme: "light"
    };
  }

  componentDidMount() {

    auth().onAuthStateChanged(user => {
        this.setState({
          authenticated: !!user,
          loading: false,
          currentUserId: (user && user.uid) || ''        
        });
        if(user) {          
          db.ref("users").orderByChild("uid").equalTo(user.uid).once("value", snapshot => {
            if (!snapshot.exists()){
              seedUser("users", user);        
            }
          });            
        }
        
    });

    this.getAppConfig();
    
  }

  getAppConfig = () => {
    db.ref("appConfig").once('value').then(snapshot => {
      const values = Object.values(snapshot.val()).pop();
      this.setState({        
        ...values,        
      }, () => console.log(this.state));
    });
  }

  render() {
    const {loading, authenticated} = this.state;
    return loading ? 
      <Loader /> : 
      <Router>
        <Switch>
          <PrivateRoute exact path="/" {...this.state} component={Quiz} />
          <PrivateRoute path="/quiz" {...this.state} component={Quiz} />
          <PublicRoute path="/signup" authenticated={authenticated} component={Signup} />
        </Switch>
      </Router>;
  }
}

export default App;
