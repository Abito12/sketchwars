import React from "react";
import {BrowserRouter as Router, Switch } from "react-router-dom";
import { auth } from "./services/firebase";

import { PrivateRoute, PublicRoute } from "./helpers/routes";
import Quiz from "./components/Quiz";
import Signup from "./components/Signup";
import Game from "./components/Game";
import Loader from './templates/Loader';

import { db } from "./services/firebase";
import { seedUser, seedCategory, testSeeder} from "./helpers/seed";
import { getInitials } from "./helpers/utilities";
import StarWars from './templates/StarWars';
import Result from './components/Result';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: true,
      roundTime: 10,
      numQuestions: 10,
      questionScore: 20,
      initials: "--",
      theme: "light"
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
        this.setState({
          authenticated: !!user,
          loading: false,
          currentUserId: (user && user.uid) || '',
          displayName: (user && user.displayName) || '',
          initials: (user && user.displayName) ? getInitials(user.displayName) : this.state.initials,
          photoURL: (user && user.photoURL) || ''    
        });
        if(user) {          
          db.ref("users").orderByChild("uid").equalTo(user.uid).once("value", snapshot => {
            if (!snapshot.exists()){
              seedUser("users", user);        
            }
          });            
        }
    });

    const appConfig = localStorage.getItem('appConfig');

    if (appConfig) {
      this.setState({...JSON.parse(appConfig)});
    } else {
      this.getAppConfig();
    }
  }

  getAppConfig = () => {
    db.ref("appConfig").once('value').then(snapshot => {
      const values = Object.values(snapshot.val()).pop();
      this.setState({        
        ...values      
      });
      localStorage.setItem('appConfig', JSON.stringify(values));
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
          <PrivateRoute path="/game/:gameId" {...this.state} authenticated={authenticated} component={Game} />
          <PrivateRoute path="/starwars/:gameId" {...this.state} authenticated={authenticated} component={StarWars} />  
          <PrivateRoute path="/result/:gameId" {...this.state} authenticated={authenticated} component={Result} />    
          <PublicRoute path="/signup" authenticated={authenticated} component={Signup} />
        </Switch>
      </Router>;
  }
}

export default App;
