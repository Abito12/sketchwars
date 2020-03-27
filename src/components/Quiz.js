import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../templates/CopyRight";
import { db } from "../services/firebase";

const style = theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
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
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
});

class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectURL: null
    };
  }


  getRandomIndex = arr => Math.floor(Math.random() * arr.length);

  fetchQuestions = async () => {
    const { numQuestions } = this.props;
    const questionsRef = db.ref("questionBank");
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
      while (selected[randomIndex])
        randomIndex = this.getRandomIndex(questionBank);
      selected[randomIndex] = true;
      questions[i] = questionBank[randomIndex];
    }
    return questions;
  };

  handleInvitationClick = async () => {
    const { currentUserId } = this.props;
    const questions = await this.fetchQuestions();

    const initialGameData = {
      playerOneId: currentUserId,
      creationTime: Date.now(),
      expired: false,
      questions: questions.map(({ id }) => ({ id }))
    };

    db.ref("games")
      .push(initialGameData)
      .then(docRef => {
        console.log(docRef.id);
        this.setState({ redirectURL: "/game/" + docRef.key });
      });
  };

  render() {
    const { classes } = this.props;
    const { redirectURL } = this.state;
    return redirectURL ? (
      <Redirect to={redirectURL} />
    ) : (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Home
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h2"
                variant="h3"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Description
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don&apos;t simply skip over it entirely.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleInvitationClick}
                    >
                      Invite Friend
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Play against bot
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        </main>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Lorem Ipsum
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </footer>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(QuizComponent);
