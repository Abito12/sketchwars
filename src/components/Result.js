import React, {useState, useEffect} from 'react';
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
    fontSize: '20px'
  }
}));

const setIntervalIds = [];

const Result = ({ maxNumberOfQuestions=10, currentUserId, initials, displayName}) => {
  let { gameId } = useParams();
  
  const [isLoading, setIsLoading] = useState(false);
  const [playerCompleted, setPlayerCompleted] = useState(true);
  const [oppositeCompleted, setOppositeCompleted] = useState(true);
  const [playerScore, setPlayerScore] = useState(10);
  const [oppositeScore, setOppositeScore] = useState(0);

  const classes = useStyles();


  const renderStatus = () => {
    if(!oppositeCompleted) return "WAITING FOR OPPONENT TO COMPELETE THE MATCH!";
    if(playerScore > oppositeScore)
      return "YOU WON!";
    if(playerScore < oppositeScore)
      return "YOU LOST!";
    return "MATCH TIED!";
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
              {!playerCompleted ? 
                <div className={classes.errorContainer}>
                  <ErrorIcon />
                  <p>You haven't completed the quiz!</p>
                  <Button
                    variant="contained"
                    color="secondary"
                  >
                    <Link to={`/game/${gameId}`} className={classes.link}>
                        Play the Game now
                    </Link>
                  </Button>
                </div> 
                : 
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
                      invert={true} />
                    <UserAvatar 
                      height={'100px'}
                      width={'100px'}
                      textSize={'40px'}
                      flexDirection={'column'}
                      initials={initials} 
                      score={oppositeScore} 
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
                   <Card className={classes.root} variant="outlined">
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Word of the Day
                      </Typography>
                      <Typography variant="h5" component="h2">                        
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        adjective
                      </Typography>
                      <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </div>
                }
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