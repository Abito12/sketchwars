import React, {useState, useEffect, useRef} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../templates/CopyRight';
import Loader from '../templates/Loader';
import {useParams} from "react-router-dom";

import Appbar from '../templates/Appbar';
import withRoot from '../helpers/withRoot';
import UserAvatar from '../templates/UserAvatar';
import { db } from "../services/firebase";
import  {getInitials} from "../helpers/utilities";


const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(2, 0, 6),
    textAlign: "center",
    marginTop: theme.spacing(2)
  },  
  footer: {
    backgroundColor: theme.palette.background,
    color: theme.palette.common.text,
    padding: theme.spacing(6),
    textAlign: "center"
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.white
  },
  errorContainer: {
    marginTop: theme.spacing(10)
  },
  status: {
    fontWeight: 'bolder',
    fontSize: '24px',
    letterSpacing: '2px'
  },
  scoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  displayName: {
    fontSize: '12px'
  },
  textarea: {
    width: '250px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'white',
    background: 'none',
    border: 0,
    outline: 'none',    
    fontSize: '14px',
    paddingTop: '10px',
    resize: 'none'
  }
}));


const Result = ({currentUserId, initials, displayName, photoURL}) => {
  let { gameId } = useParams();

  const [resultUrl, setResultUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playerCompleted, setPlayerCompleted] = useState(false);
  const [oppositeCompleted, setOppositeCompleted] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [oppositeScore, setOppositeScore] = useState(0);
  const [copyBtnText, setCopyBtnText] = useState('copy');
  const [oppPlayerDetails, setOppPlayerDetails] = useState({});
  const textAreaRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    const url = `${window.location.origin}/result/${gameId}`;
    setResultUrl(url);
    const ref = db.ref(`games/${gameId}`);
    ref.once('value').then(snapshot => {
      const {status, playerOneId, questions, playerDetails} = snapshot.val();

      const questionData = Object.values(questions);
      // public page - if accessed before game started no questionData
      if(!questionData.length) return;

      let [playerTotal, oppPlayerTotal] = [0, 0];
      const playerTwoId = Object.keys(questionData[0].scores || {}).find(id => id !== playerOneId);

      if (playerTwoId) fetchUserDetails(playerDetails, playerTwoId)

      questionData.forEach(ques => {    
        if(ques.scores) {
          playerTotal += ques.scores[playerOneId] || 0;
          oppPlayerTotal += (playerTwoId && ques.scores[playerTwoId]) || 0;
        }
      });

      setPlayerScore(currentUserId === playerOneId ? playerTotal : oppPlayerTotal);
      setOppositeScore(currentUserId === playerOneId ? oppPlayerTotal : playerTotal);

      
      setPlayerCompleted((status[playerOneId] && status[playerOneId].completed) || false);
      setOppositeCompleted((status[playerTwoId] && status[playerTwoId].completed)|| false);      
    });

    ref.on('value', handleGameDataChange);

  }, []);

  const fetchUserDetails = (playerDetails, userId) => {
    // db.ref("users").orderByChild("uid").equalTo(userId).once('value').then(snapshot => {
    //     const {name, photoURL} = Object.values(snapshot.val()).pop();
    //     setOppPlayerDetails({name, photoURL});
    // });
    if (playerDetails[userId]) {
      const {displayName, photoURL} = playerDetails[userId];
      setOppPlayerDetails({name: displayName, photoURL});
    }
  }

  const handleGameDataChange = (snapshot) => {
    const {playerOneId, status, questions} = snapshot.val();

    const questionData = Object.values(questions);
    const playerTwoId = Object.keys(questionData[0].scores || {}).find(id => id !== playerOneId);

    if (playerTwoId && status[playerTwoId]) {
      if (status[playerTwoId].completed) {
        setOppositeCompleted(true);

        let oppPlayerTotal = 0;
        questionData.forEach(ques => {    
          if(ques.scores) {
            oppPlayerTotal += (playerTwoId && ques.scores[playerTwoId]) || 0;
          }
        });
        setOppositeScore(oppPlayerTotal);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2400);
  }, [playerScore, oppositeScore]);
  
  const classes = useStyles();

  const renderStatus = () => {
    if(!playerCompleted || !oppositeCompleted) 
      return "MATCH NOT COMPLETED!"; 
    if(playerScore > oppositeScore)
      return "YOU WON!";
    if(playerScore < oppositeScore)
      return "YOU LOST!";
    return "MATCH TIED!";
  }

  function copyToClipboard(e) {
    setCopyBtnText('Copied!');              
    textAreaRef.current.select();
    document.execCommand('copy');    
    e.target.focus();    
    setTimeout(() => {
      setCopyBtnText('copy');          
    }, 2000); 
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Appbar />
      {isLoading ? <Loader minHeight={'50vh'}/> : 
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">            
                <div>
                  <Typography className={classes.status} color="white" gutterBottom>
                    {renderStatus()}
                  </Typography>
                  <div className={classes.scoreContainer}>
                    <UserAvatar 
                      height={'100px'}
                      width={'100px'}
                      textSize={'40px'}
                      flexDirection={'column'}
                      initials={initials} 
                      score={playerScore} 
                      invert={true}
                      image={photoURL}
                      />
                    <UserAvatar 
                      height={'100px'}
                      width={'100px'}
                      textSize={'40px'}
                      flexDirection={'column'}
                      initials={oppPlayerDetails.name ? getInitials(oppPlayerDetails.name) : 'P2'} 
                      score={oppositeScore} 
                      p2={true}
                      invert={true} 
                      image={oppPlayerDetails.photoURL}
                      />
                  </div>
                  <div className={classes.scoreContainer}>
                    <Typography variant="p" className={classes.displayName} gutterBottom>
                      {displayName}
                    </Typography>
                    <Typography variant="p" className={classes.displayName} gutterBottom>
                      {oppPlayerDetails.name || 'Player 2'}
                    </Typography>
                  </div>
                  <div style={{display: 'flex', marginTop: '14px', flexDirection: 'row', justifyContent: 'center'}}>
                    <Button
                      color="secondary"
                      variant="outlined"
                      size='small'
                      style={{textTransform: 'lowercase'}}
                      disableRipple
                    >
                      <textarea 
                        className={classes.textarea} 
                        ref={textAreaRef} 
                        spellcheck="false"
                        value={resultUrl} />
                      
                    </Button>
                    {document.queryCommandSupported('copy') &&
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{marginLeft: '6px'}}
                        onClick={copyToClipboard}
                      >
                        {copyBtnText}
                      </Button>
                    }
                </div>
              </div>             
            </Container>
          </div>
        </main>
      }
      {/* Footer */}
      <footer className={classes.footer}>        
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default withRoot(Result);