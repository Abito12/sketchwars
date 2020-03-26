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
    textTransform: 'none'
  },
  flagButton: {
    marginTop: theme.spacing(2),
    background: 'yellow'
  }  
}));


export default function Game({ maxNumberOfQuestions=10 }) {
  let { gameId } = useParams();
  const classes = useStyles();

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
            setQuestionNumber(questionNumber + 1);         
        })
        .catch(error => console.log(error));
  }, [gameId]);  

  useEffect(() => {
    if(questionIds.length <= 0 || questionNumber < 0) return;    
    const handleSetQuestion = () => {        
       db.ref("questionBank").child(questionIds[questionNumber].id).once('value')
        .then(snapshot => {            
            setQuestion(snapshot.val());
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
  }, [question])
    

  

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
    setOptionsActive(false);    
    const answerId = e.currentTarget.value;
    if(Number(answerId) === correctOption){
      e.currentTarget.style.background = 'green';
    } else {
      e.currentTarget.style.background = 'red';
    }
    e.currentTarget.style.color = 'white';
    setTimeout(() => {       
      handleGameStatus();
    }, 1000);
  }

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
              <ProgressBar />
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                {(question && !isEmptyObj(question)) ? decodeHtml(question.question) : "Question Placeholder"}
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container justify="space-around">
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