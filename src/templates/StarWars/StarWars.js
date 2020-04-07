import React, { useEffect, useState, useRef } from "react";
import {useParams, Redirect} from "react-router-dom";

import Button from "@material-ui/core/Button";
import withRoot from "../../helpers/withRoot";
import { makeStyles } from "@material-ui/core/styles";

import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import RedditIcon from "@material-ui/icons/Reddit";
import EmailIcon from "@material-ui/icons/Email";
import { db } from "../../services/firebase";
import "../../assets/css/component.css";
import StarWarsLoader from './StarWarsLoader';
import Appbar from '../Appbar';


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    height: "100vh",
  },
  textarea: {
    width: "250px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "white",
    background: 'none',
    border: 0,
    outline: 'none',    
    fontSize: '14px',
    paddingTop: '10px',
    resize: 'none'
  },
}));

const StarWars = ({ currentUserId, photoURL, displayName}) => {
  const classes = useStyles();
  const { gameId } = useParams();

  const [gameUrl, setGameUrl] = useState(null);
  const [redirectToGame, setRedirectToGame] = useState(false);
  const [copyBtnText, setCopyBtnText] = useState('copy');
  const [multiPlayerGame, setMultiPlayerGame] = useState(false);
  const textAreaRef = useRef(null);

  useEffect(() => {
    const dbRef = db.ref("games/" + gameId);
    dbRef.once("value").then((snapshot) => {
        const {playerOneId, status = {}, singlePlayer} = snapshot.val();
        updatePlayerDetails(playerOneId, currentUserId, photoURL, displayName).then(() => {
          if (!singlePlayer) {
            setMultiPlayerGame(true);
            setRedirectToGame(hasOppositePlayerStarted(status));
  
            if (status[currentUserId] && status[currentUserId].startedTime) {
              setRedirectToGame(true);
            }
  
            if (currentUserId === playerOneId) {  
              const url = `${window.location.origin}/game/${gameId}`;
              setGameUrl(url);
            } 
            dbRef.on('value', handleGameRef);
          } else {
            setTimeout(() => setRedirectToGame(true), 3000);
          } 
        });
      })
      .catch((error) => console.log(error));
  }, []);


  const updatePlayerDetails = (playerOneId, currentUserId, photoURL, displayName) => {
    if (playerOneId === currentUserId)
      return Promise.resolve();

    const ref = db.ref(`games/${gameId}/`);
    const updates = {};
    updates[`/playerDetails/${currentUserId}`] = {displayName, photoURL};
    return ref.update(updates);
  }

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

  function copyToClipboard(e) {
    setCopyBtnText('Copied!');              
    textAreaRef.current.select();
    document.execCommand('copy');    
    e.target.focus();    
    setTimeout(() => {
      setCopyBtnText('copy');          
    }, 2000); 
  };

  if (redirectToGame) {
    return <Redirect to={`/game/${gameId}`} />
  }

  return (
    <div className={classes.root}>
      <Appbar image={photoURL}/>
      <StarWarsLoader />
      <div
        lg={12}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "12px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
          visibility: multiPlayerGame ? 'visible': 'hidden'
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
                disableRipple
              >
                <textarea
                  className={classes.textarea} 
                  ref={textAreaRef} 
                  spellcheck="false"
                  value={gameUrl} />
              </Button>
              {document.queryCommandSupported('copy') &&
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: "6px" }}
                  onClick={copyToClipboard}
                >
                  {copyBtnText}
                </Button>
              }
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
