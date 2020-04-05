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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {  
  useParams,
  Link
} from "react-router-dom";
import ErrorIcon from '@material-ui/icons/Error';

import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import RedditIcon from '@material-ui/icons/Reddit';
import EmailIcon from '@material-ui/icons/Email';

import withRoot from '../helpers/withRoot';
import UserAvatar from '../templates/UserAvatar';
import { db } from "../services/firebase";
import  { shuffleArray, isEmptyObj, decodeHtml } from "../helpers/utilities";


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

const setIntervalIds = [];

const Result = ({ maxNumberOfQuestions=10, currentUserId, initials, displayName, photoURL}) => {
  let { gameId } = useParams();

  const [resultUrl, setResultUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playerCompleted, setPlayerCompleted] = useState(false);
  const [oppositeCompleted, setOppositeCompleted] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [oppositeScore, setOppositeScore] = useState(0);
  const [copyBtnText, setCopyBtnText] = useState('copy');
  const textAreaRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    const url = `${window.location.origin}/result/${gameId}`;
    setResultUrl(url);
    const ref = db.ref(`games/${gameId}`);
    ref.once('value').then(snapshot => {
      const playerOneId = snapshot.val().playerOneId;
      const questionData = Object.values(snapshot.val().questions);
      // public page - if accessed before game started no questionData
      if(!questionData.length) return;

      let [playerTotal, oppPlayerTotal] = [0, 0];
      const playerTwoId = Object.keys(questionData[0].scores || {}).find(id => id !== playerOneId);
      questionData.forEach(ques => {    
        if(ques.scores) {
          playerTotal += ques.scores[playerOneId] || 0;
          oppPlayerTotal += (playerTwoId && ques.scores[playerTwoId]) || 0;
        }
      });
      
      setPlayerScore(currentUserId === playerOneId ? playerTotal : oppPlayerTotal);
      setOppositeScore(currentUserId === playerOneId ? oppPlayerTotal : playerTotal);
      
      const {status} = snapshot.val();
      setPlayerCompleted(status[playerOneId] || false);
      setOppositeCompleted(status[playerTwoId] || false);      
    });
  }, []);

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
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Home
          </Typography>
        </Toolbar>
      </AppBar>
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
                      image={photoURL}
                      invert={true} />
                    <UserAvatar 
                      height={'100px'}
                      width={'100px'}
                      textSize={'40px'}
                      flexDirection={'column'}
                      initials={initials} 
                      score={oppositeScore} 
                      image={photoURL}
                      p2={true}
                      invert={true} />
                  </div>
                  <div className={classes.scoreContainer}>
                    <Typography variant="p" className={classes.displayName} gutterBottom>
                      {displayName}
                    </Typography>
                    <Typography variant="p" className={classes.displayName} gutterBottom>
                      {displayName}
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
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '16px', justifyContent: 'space-around'}}>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${resultUrl}`} target="_blank" rel="noopener noreferrer"> 
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{border: 'none'}}
                >
                                   
                    <FacebookIcon style={{ color: '#3b5998' }} fontSize="large" />
                  
                </Button>
                </a>
                <a href={`https://api.whatsapp.com/send?text=Hi, Play with me on Quizup! Click here: ${resultUrl}`} target="_blank" rel="noopener noreferrer">                    
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{border: 'none'}}
                >                  
                      <WhatsAppIcon style={{ color: '#128C7E' }} fontSize="large" />                                    
                </Button>
                </a>
                <a href={`http://www.reddit.com/submit?url=${resultUrl}&title=Play with me on Quizup. Click on the URL`} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{border: 'none'}}
                >                  
                    <RedditIcon style={{ color: '#FF4301' }} fontSize="large" />                  
                </Button>
                </a>
                <a href="mailto:friend@site.com?subject=I challenge you to a game of quizup" rel="noopener noreferrer">
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{border: 'none'}}
                >
                  
                    <EmailIcon style={{ color: '#E2E2E2' }} fontSize="large" />                  
                </Button>
                </a>
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