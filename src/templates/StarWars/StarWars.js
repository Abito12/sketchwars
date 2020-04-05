import React, { useEffect, useState } from "react";
import {useParams, Redirect} from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withRoot from "../../helpers/withRoot";
import { makeStyles } from "@material-ui/core/styles";

import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import RedditIcon from "@material-ui/icons/Reddit";
import EmailIcon from "@material-ui/icons/Email";
import { db } from "../../services/firebase";
import "../../assets/css/component.css";
import StarWarsLoader from './StarWarsLoader';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    height: "100vh",
  },
  linkStyle: {
    width: "250px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "white",
  },
}));

const StarWars = ({ currentUserId }) => {
  const classes = useStyles();
  const { gameId } = useParams();

  const [gameUrl, setGameUrl] = useState(null);
  // const [pOneId, setPlayerOneId] = useState(null);
  const [redirectToGame, setRedirectToGame] = useState(false);


  useEffect(() => {
    const dbRef = db.ref("games/" + gameId);

    dbRef.once("value").then((snapshot) => {
        const {playerOneId, status} = snapshot.val();
        setRedirectToGame(hasOppositePlayerStarted(status));

        if (currentUserId === playerOneId) {  
          const url = `${window.location.origin}/game/${gameId}`;
          setGameUrl(url);
        }

        dbRef.on('value', handleGameRef);

      })
      .catch((error) => console.log(error));
  }, []);


  const handlePlayNow = async () => {
    const ref = db.ref(`games/${gameId}/`);
    ref.once('value').then(snapshot => {
      const gameData = snapshot.val();
      const status = gameData.status || {};
      status[currentUserId] = {
        startedTime: Date.now(),
        completed: false
      };
      gameData.status = status;
      console.log(gameData);
      ref.update(gameData).then(() => setRedirectToGame(true));
    });
  };

  const hasOppositePlayerStarted = (status) => {
    if (!status)
      return false;
    const playerStatus = Object.keys(status);
    return playerStatus.length && playerStatus.some(id => id !== currentUserId);
  }

  const handleGameRef = (snapshot) => {
    const {status} = snapshot.val();
    setRedirectToGame(hasOppositePlayerStarted(status));
  };

  if (redirectToGame) {
    return <Redirect to={`/game/${gameId}`} />
  }

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="text" noWrap>
            Home
          </Typography>
        </Toolbar>
      </AppBar>
      <StarWarsLoader />
      <div
        lg={12}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "12px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Link to={`/game/${gameId}`} style={{ textDecoration: "none" }}> */}
          <Button
            variant="contained"
            color="secondary"
            style={{ maxWidth: "400px", marginBottom: "16px" }}
            onClick={handlePlayNow}
          >
            Play now
          </Button>
        {/* </Link> */}
        {gameUrl && (
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button
                color="secondary"
                variant="outlined"
                size="small"
                style={{ textTransform: "lowercase" }}
              >
                <span className={classes.linkStyle}>{gameUrl}</span>
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: "6px" }}
              >
                Copy
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "16px",
                justifyContent: "space-around",
              }}
            >
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${gameUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ border: "none" }}
                >
                  <FacebookIcon style={{ color: "#3b5998" }} fontSize="large" />
                </Button>
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=Hi, Play with me on Quizup! Click here: ${gameUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ border: "none" }}
                >
                  <WhatsAppIcon style={{ color: "#128C7E" }} fontSize="large" />
                </Button>
              </a>
              <a
                href={`http://www.reddit.com/submit?url=${gameUrl}&title=Play with me on Quizup. Click on the URL`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ border: "none" }}
                >
                  <RedditIcon style={{ color: "#FF4301" }} fontSize="large" />
                </Button>
              </a>
              <a
                href="mailto:friend@site.com?subject=I challenge you to a game of quizup"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ border: "none" }}
                >
                  <EmailIcon style={{ color: "#E2E2E2" }} fontSize="large" />
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRoot(StarWars);