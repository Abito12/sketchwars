import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../templates/CopyRight';
import Loader from '../templates/Loader';

import {useParams,Redirect} from "react-router-dom";

import Appbar from '../templates/Appbar';
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

const Game = ({ maxNumberOfQuestions=10, currentUserId, roundTime, questionScore, initials, photoURL}) => {
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
  const [categoryId, setCategoryId] = useState(null);
  const [redirectToResult, setRedirectToResult] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const classes = useStyles();


  useEffect(() => {
    if(!gameId) return;
    db.ref("games").child(gameId).once('value')
        .then(snapshot => {            
            const {questions: questionMap, categoryId: catId, playerDetails} = snapshot.val();                                
            setQuestionIds(Object.keys(questionMap));
            setCategoryId(catId);
            setUserDetails(playerDetails);
            let [total, oppositeTotal, currentQIndex] = [0, 0, 0];
            Object.keys(questionMap).forEach((key, i) => {
              const questionScores = questionMap[key].scores || {};
              if (typeof questionScores[currentUserId] === 'number') {
                  currentQIndex = i;  
                  total += questionScores[currentUserId];
                  const oppPlayerId = Object.keys(questionScores).find(key => key !== currentUserId);
                  if (oppPlayerId) oppositeTotal += questionScores[oppPlayerId];
              }
            });

            setQuestionNumber(currentQIndex);      
            setTotalScore(total);    
            setOppositeTotalScore(oppositeTotal);
          })   
          .catch(error => console.log(error));
  }, [gameId]);


  useEffect(() => {
    if(questionIds.length <= 0 || questionNumber < 0 || !categoryId) return;    
    const handleSetQuestion = () => {        
       db.ref("questionBank/" + categoryId).child(questionIds[questionNumber])
        .once('value')
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
    const currentQuestionId = questionIds[questionNumber];
    const ref = db.ref(`games/${gameId}/questions/${currentQuestionId}`);

    ref.once('value').then(snap => {
      const currentQuestionStats = snap.val();
      const {endTimes} = currentQuestionStats;

      let endsAt;
      if (endTimes && endTimes[currentUserId]) {
        endsAt = endTimes[currentUserId];
      } else {
        endsAt = Date.now() + (roundTime * 1000) + 1000;
        const updates = {};
        updates[`/endTimes/${currentUserId}`] = endsAt;
        ref.update(updates).then(() => setIsLoading(false));
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
    if(Number(answerId) === correctOption){
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

    const currentQuestionId = questionIds[questionNumber];
    const ref = db.ref(`games/${gameId}/questions`);

    ref.once('value').then(snapshot => {  
      const updates = {};
      updates[`/${currentQuestionId}/scores/${currentUserId}`] = score;
      ref.update(updates).then(handleGameStatus);

      const questions = Object.values(snapshot.val()); 
      let oppScore = 0;
      for (let i = 0; i <= questionNumber; i++) {
        const scores = questions[i].scores ||  {};
        const oppPlayerId = Object.keys(scores).find(key => key !== currentUserId);
        if (oppPlayerId) oppScore += questions[i].scores[oppPlayerId];
      }
      setOppositeTotalScore(oppScore);
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
      const ref = db.ref(`games/${gameId}/`);
      const updates = {};
      updates[`/status/${currentUserId}`] = {completed: true};
      ref.update(updates).then(() => setRedirectToResult(true));      
    }
  }

  if (redirectToResult) {
    return <Redirect to={`/result/${gameId}`} />
  }

  const oppositePlayerId = Object.keys(userDetails).find(key => key !== currentUserId);
  const oppositePlayerDetails = (oppositePlayerId && userDetails[oppositePlayerId]) || {};

  const currentUserDetails = userDetails[currentUserId] || {};

  return (
    <React.Fragment>
      <CssBaseline />
      <Appbar image={photoURL}/>
      {isLoading ? <Loader minHeight={'50vh'}/> : 
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm"> 
            <div className={classes.timerContainer}>
              <UserAvatar 
                displayName={currentUserDetails.displayName}
                score={totalScore}
                initials={initials}
                image={currentUserDetails.photoURL} />
              <div className={classes.timer}><Timer counter={counter}/> </div>
              <UserAvatar 
                displayName={oppositePlayerDetails.displayName}
                score={oppositeTotalScore}
                invert={true}
                p2={true}
                initials={'P2'}
                image={oppositePlayerDetails.photoURL}
              />
            </div>            
             <Typography variant="h6" align="left" paragraph className={classes.questionNumber}>
                Question {questionNumber+1}<span className={classes.questionNumberSpan}>/{maxNumberOfQuestions}</span>
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
                {/* <Grid container justify="center" className={classes.options}>
                    <Fab color="secondary" aria-label="flag" className={classes.flagButton}>
                      <FlagIcon />
                    </Fab>
              </Grid> */}
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