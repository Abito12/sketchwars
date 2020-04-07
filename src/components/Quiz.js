import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import withRoot from "../helpers/withRoot";
import Copyright from "../templates/CopyRight";
import { db } from "../services/firebase";
import CategoryListView from "../templates/Categories";
import BottomNavigation from "../templates/BottomNavigationBar";
import Loader from "../templates/Loader";
import Appbar from '../templates/Appbar';


const style = theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    color: theme.palette.common.text
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    padding: theme.spacing(6),
    color: theme.palette.common.text
  }
});

class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectURL: null,
      categories: [],
      isLoading: true
    };
  }

  componentDidMount() {
    db.ref("questionBank")
      .orderByChild("name")
      .once("value")
      .then(snapshot => {
        const snapshotVal = snapshot.val();
        const categories = [];

        Object.keys(snapshotVal).forEach(key => {
          categories.push({
            name: snapshotVal[key].name,
            id: key
          });
        });

        this.setState({
          categories,
          isLoading: false
        });
      });
  }

  getRandomIndex = arr => Math.floor(Math.random() * arr.length);

  fetchQuestions = async (categoryId) => {
    const { numQuestions } = this.props;
    const questionsRef = db.ref("questionBank/" + categoryId);
    const snapshot = await questionsRef.once("value");
    const snapshotVal = snapshot.val();
    const questionBank = [];
    Object.keys(snapshotVal).forEach(key =>
      questionBank.push({ ...snapshotVal[key], id: key })
    );

    const questions = [];
    const selected = {};
    for (let i = 0; i < numQuestions; i++) {
      let randomIndex = this.getRandomIndex(questionBank);
      while (selected[randomIndex] || !questionBank[randomIndex].choices)
        randomIndex = this.getRandomIndex(questionBank);
      selected[randomIndex] = true;
      questions[i] = questionBank[randomIndex];
    }
    return questions;
  };

  handleInvitationClick = async categoryId => {
    const {currentUserId, displayName, photoURL} = this.props;
    const {categories} = this.state;

    const catId = categoryId || categories[Math.floor(Math.random() * categories.length)].id;

    const questions = await this.fetchQuestions(catId);

    const gameQuestions = {};
    questions.forEach(ques => gameQuestions[ques.id] = {
      // To be removed later
      createdTime: Date.now()
    });

    const initialGameData = {
      playerOneId: currentUserId,
      creationTime: Date.now(),
      expired: false,
      questions: gameQuestions,
      categoryId: catId,
      playerDetails: {
        [currentUserId]: {displayName, photoURL}
      }
    };

    db.ref("games")
      .push(initialGameData)
      .then(docRef => this.setState({ redirectURL: "/starwars/" + docRef.key }));
  };

  /**
   * Handler function to start 'Find a random opponent' game
   */
  handleSinglePlayer = async categoryId => {
    const {currentUserId} = this.props;
    const {categories} = this.state;

    const catId = categoryId || categories[Math.floor(Math.random() * categories.length)].id;

    const questions = await this.fetchQuestions(catId);

    const gameQuestions = {};
    questions.forEach(ques => gameQuestions[ques.id] = {
      // To be removed later
      createdTime: Date.now(),
      scores: {
        'singlePlayerId': Math.floor(Math.random() * 10) + 10
      },
    });

    const initialGameData = {
      playerOneId: currentUserId,
      creationTime: Date.now(),
      expired: false,
      questions: gameQuestions,
      categoryId: catId,
      singlePlayer: true,
      status: {
        'singlePlayerId': {
          completed: true
        }
      }
    };

    db.ref("games")
      .push(initialGameData)
      .then(docRef => this.setState({ redirectURL: "/starwars/" + docRef.key }));
  };


  render() {
    const { classes, photoURL } = this.props;
    const { redirectURL, categories, isLoading } = this.state;

    return redirectURL ? (
      <Redirect to={redirectURL} />
    ) : (
      <React.Fragment>
        <CssBaseline />
        <Appbar image={photoURL}/>
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h2"
                variant="h3"
                align="center"
                gutterBottom
              >
                BUZZLE
              </Typography>
              <Typography variant="subtitle2" align="center" paragraph>
                Invite a friend to play against or test your knowledge playing against a random opponent online.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => this.handleInvitationClick()}
                    >
                      Play with a friend
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="secondary" onClick={() => this.handleSinglePlayer()}>
                      Find random opponent
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        </main>
        {isLoading ? (
          <Loader minHeight={"50vh"} />
        ) : (
          <CategoryListView 
            handleInvitationClick={this.handleInvitationClick}
            categories={categories}
            handleSinglePlayer={this.handleSinglePlayer}  
          />
        )}
        <footer className={classes.footer}>
          <Copyright />
        </footer>
        <BottomNavigation />
      </React.Fragment>
    );
  }
}

export default withRoot(withStyles(style)(QuizComponent));
