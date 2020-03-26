import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function LinearDeterminate({playerOneProgress, playerTwoProgress}) {
  const classes = useStyles();
  const [playerOneCompleted, setPlayerOneCompleted] = React.useState(0);
  const [playerTwoCompleted, setPlayerTwoCompleted] = React.useState(0);

  React.useEffect(() => {
    
  }, []);

  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={playerOneProgress} />
      <LinearProgress variant="determinate" value={playerTwoProgress} color="secondary" />
    </div>
  );
}