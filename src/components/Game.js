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
import Fab from '@material-ui/core/Fab';
import {  
  useParams
} from "react-router-dom";


import withRoot from '../helpers/withRoot';
import VerticalProgress from '../templates/VerticalProgress';
import UserAvatar from '../templates/UserAvatar';
import Timer from '../templates/Timer';
import { db } from "../services/firebase";
import  { shuffleArray, isEmptyObj, decodeHtml } from "../helpers/utilities";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),    
  },
  heroContent: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(2, 0, 6),
  },
  heroButtons: {
    margin: theme.spacing(1)    
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
    backgroundColor: theme.palette.background,
    color: theme.palette.common.text,
    padding: theme.spacing(6),
    textAlign: "center"
  },
  question: {
      fontWeight: 'bolder',
      color: theme.palette.common.text
  },
  questionNumber: {
      color: theme.palette.common.grey,
      fontWeight: 'bolder'
  },
  questionNumberSpan: {
      fontSize: '14px'
  },
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    alignItems: "center"

  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  options: {
      margin: theme.spacing(2),
      textAlign: "center",
      marginTop: 0
  },
  option: {
    textTransform: 'none',
    width: '100%',
    wordBreak: 'break-word',
    border: '1px solid #efefef',
    borderRadius: '8px',
    color: theme.palette.common.white
  },
  flagButton: {
    marginTop: theme.spacing(2)
  },
  timerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  timers: {
      margin: '0 auto',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center'
  }
}));

const setIntervalIds = [];

const Game = ({ maxNumberOfQuestions=10, currentUserId, roundTime, questionScore, initials}) => {
  let { gameId } = useParams();

  const [counter, setCounter] = useState(null);
  const [questionIds, setQuestionIds] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionNumber, setQuestionNumber] = useState(-1);
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [optionsActive, setOptionsActive] = useState(true);
  const [totalScore, setTotalScore] = useState(0); 
  const [oppositeTotalScore, setOppositeTotalScore] = useState(0);

  const classes = useStyles();


  useEffect(() => {
    if(!gameId) return;
    db.ref("games").child(gameId).once('value')
        .then(snapshot => {            
            const qids = snapshot.val().questions;                                
            setQuestionIds(qids);
            let total = 0;
            let oppositeTotal = 0;
            let currentQIndex = 0;
            qids.forEach((q, i) => {
              const playerScore = (q.scores || []).find(sc => sc.playerId === currentUserId);
                if(playerScore){
                  currentQIndex = i;  
                  total += playerScore.score;
                  const oppositePlayerScore = (q.scores || []).find(sc => sc.playerId !== currentUserId);
                  if(oppositePlayerScore){
                    oppositeTotal += oppositePlayerScore.score;
                  }
                }
            });  
            setQuestionNumber(currentQIndex);      
            setTotalScore(total);    
            setOppositeTotalScore(oppositeTotal);
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
        ref.set(questions).then(() => setIsLoading(false));
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
                className={classes.option}
                disabled={!optionsActive}    
                value={opt[0].id}                
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
    if(Number(answerId) !== correctOption){
      handleScoreUpdate(calculateScore());
      e.currentTarget.style.background = '#388e3c';
    } else {
      handleScoreUpdate(0);
      e.currentTarget.style.background = '#f44336';
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
    setTotalScore(totalScore + score);    
    const ref = db.ref(`games/${gameId}/questions`);
    ref.once('value').then(snapshot => {
      const questions = snapshot.val();
      const currentQuestion = questions[questionNumber];

      const playerScore = {playerId: currentUserId, score};
      if (currentQuestion.scores) {
        setOppositeTotalScore(oppositeTotalScore + currentQuestion.scores[0].score);
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
    } else { //10th ques
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
            <div className={classes.timerContainer}>
              <UserAvatar score={totalScore/2} initials={initials} />
              <div className={classes.timer}><Timer counter={counter}/> </div>
              <UserAvatar score={oppositeTotalScore/2} invert={true} p2={true}/>
            </div>            
             <Typography variant="h6" align="left" paragraph className={classes.questionNumber}>
                {initials} {questionNumber+1}<span className={classes.questionNumberSpan}>/{maxNumberOfQuestions}</span>
              </Typography>                         
              <Typography variant="h6" align="center" color="textSecondary" paragraph className={classes.question}>
                {(question && !isEmptyObj(question)) ? decodeHtml(question.question) : "Question Placeholder"}
              </Typography>
              <div className={classes.heroButtons}>
                <Grid justify="space-around" className={classes.container}>                  
                    <VerticalProgress progress={totalScore/2} p1={true}/>
                  <div className={classes.optionsContainer}>
                    {options && renderOptions()}                          
                  </div>
                  <VerticalProgress progress={oppositeTotalScore/2}/>
                </Grid>
                <Grid container justify="center" className={classes.options}>
                    <Fab color="secondary" aria-label="flag" className={classes.flagButton}>
                      <FlagIcon />
                    </Fab>
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

export default withRoot(Game);