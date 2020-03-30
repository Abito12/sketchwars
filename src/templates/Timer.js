import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { red } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonClass: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bolder',
    fontSize: '20px'
  },
  fabProgress: {
    color: red[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  }
}));

export default function Timer({counter=5}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"          
          className={classes.buttonClass}          
        >
          {counter}
        </Fab>
        <CircularProgress variant="static" size={68} className={classes.fabProgress} value={counter*10}/>
      </div>   
    </div>
  );
}
