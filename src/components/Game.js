import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../templates/CopyRight';
import Loader from '../templates/Loader';
import FlagIcon from '@material-ui/icons/Flag';
import {  
  useParams
} from "react-router-dom";

import ProgressBar from '../templates/ProgressBar';
import { db } from "../services/firebase";
import  { shuffleArray, isEmptyObj, decodeHtml } from "../helpers/utilities";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),    
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    margin: theme.spacing(4)    
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    textAlign: "center"
  },
  options: {
      margin: theme.spacing(2),
      textAlign: "center"
  },
  option: {
    textTransform: 'none',
    width: '100%',
    wordBreak: 'break-all'
  },
  flagButton: {
    marginTop: theme.spacing(2),
    background: 'yellow'
  }  
}));

const setIntervalIds = [];

export default function Game({ maxNumberOfQuestions=10, currentUserId, roundTime, questionScore}) {
  let { gameId } = useParams();
  const classes = useStyles();

  const [counter, setCounter] = useState(null);
  const [questionIds, setQuestionIds] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionNumber, setQuestionNumber] = useState(-1);
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [optionsActive, setOptionsActive] = useState(true);  


  useEffect(() => {
    if(!gameId) return;
    db.ref("games").child(gameId).once('value')
        .then(snapshot => {            
            const qids = snapshot.val().questions;                                
            setQuestionIds(qids);
            const currentQIndex = qids.findIndex(q => {
              if (!q.scores) return true;
              return q.scores.every(score => score.playerId !== currentUserId);
            });
            setQuestionNumber(currentQIndex > -1 ? currentQIndex : 0);      
        })
        .catch(error => console.log(error));
  }, [gameId]);


  useEffect(() => {
    if(questionIds.length <= 0 || questionNumber < 0) return;    
    const handleSetQuestion = () => {        
       db.ref("questionBank").child(questionIds[questionNumber].id).once('value')
        .then(snapshot => {          
            setQuestion(snapshot.val());
            setCounter(null);
            setCorrectOption(snapshot.val().answerId);
        })
        .catch(error => console.log(error));
    }    
    handleSetQuestion();
  }, [questionIds, questionNumber]);

  useEffect(() => {
    if(isEmptyObj(question)) return;
    const handleSetOptions = () => {
        const choices = question.choices;          
        const shuffledOptions = shuffleArray(choices);          
        setOptions(shuffledOptions);
        setIsLoading(false);
    }
    handleSetOptions();
    setQuestionEndTime();
  }, [question])

  const setQuestionEndTime = () => {
    const ref = db.ref(`games/${gameId}/questions`);
    ref.once('value').then(snapshot => {
      const questions = snapshot.val();
      const currentQuestion = questions[questionNumber];

      const {endTimes} = currentQuestion;

      let endsAt;
      if (endTimes && endTimes[currentUserId]) {
        endsAt = endTimes[currentUserId];
      } else {
        endsAt = Date.now() + (roundTime * 1000) + 1000;
        currentQuestion['endTimes'] = {
          [currentUserId]: endsAt
        }
        ref.set(questions)
      }

      const timeout = setInterval(countDown, 1000);

      setIntervalIds.push(timeout);

      function countDown() {
        const remainingTime = Math.round((endsAt - Date.now())/1000);
        if (remainingTime <= 0) {
          clearInterval(timeout);
          handleScoreUpdate(0);
        } else {
          setCounter(remainingTime);
        }
      }
    });
  }

  const renderOptions = () => {   
    return options.map(opt => {
      return (
          <Grid item fullWidth className={classes.options} key={opt[0].id}>
              <Button 
                variant="contained" 
                disabled={!optionsActive}
                color="primary"            
                value={opt[0].id}
                className={classes.option}
                onClick={handleOptionClick}>
                  {decodeHtml(opt[0].text)}
              </Button>
          </Grid>
      );
    })     
  }

  const handleOptionClick = e => {
    setIntervalIds.forEach(clearInterval);
    setOptionsActive(false);    
    const answerId = e.currentTarget.value;
    if(Number(answerId) === correctOption){
      handleScoreUpdate(calculateScore());
      e.currentTarget.style.background = 'green';
    } else {
      handleScoreUpdate(0);
      e.currentTarget.style.background = 'red';
    }
    e.currentTarget.style.color = 'white';
  }


  const calculateScore = () => {
    if (counter >= 8)
      return questionScore;
    else 
      return questionScore - (roundTime - counter) * 2;
  }

  const handleScoreUpdate = async (score) => {
    console.log(questionNumber, score);
    const ref = db.ref(`games/${gameId}/questions`);
    ref.once('value').then(snapshot => {
      const questions = snapshot.val();
      const currentQuestion = questions[questionNumber];

      const playerScore = {playerId: currentUserId, score};
      if (currentQuestion.scores) {
        if (currentQuestion.scores.every(sc => sc.playerId !== currentUserId))
          currentQuestion.scores.push(playerScore);
      } else {
        currentQuestion.scores = [playerScore];
      }
      return ref.set(questions).then(handleGameStatus);
    });
  };

  const handleNextQuestion = () => {
    setQuestionNumber(questionNumber + 1);
  }

  const handleGameStatus = () => {
    if(questionNumber < maxNumberOfQuestions - 1){
      setIsLoading(true);      
      setOptionsActive(true); 
      handleNextQuestion();
    } else {
      console.log("GAME OVER> GO TO NEXT SCREEN");
    }

  }
  
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
            <p>{counter}</p>           
              <ProgressBar />
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                {(question && !isEmptyObj(question)) ? decodeHtml(question.question) : "Question Placeholder"}
              </Typography>
              <div className={classes.heroButtons}>
                <Grid justify="space-around">
                  {options && renderOptions()}                          
                </Grid>
                <Grid container justify="center" className={classes.options}>
                  <Button variant="contained" className={classes.flagButton}>
                      <FlagIcon />
                  </Button>
              </Grid>
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