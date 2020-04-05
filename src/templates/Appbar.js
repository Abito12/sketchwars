import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    appbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '10px',
        paddingRight: '10px',
        alignItems: 'center'
    }
}));

const Appbar = ({image}) => {

  const classes = useStyles();

  return (
    <AppBar position="relative" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Buzzle
          </Typography>
        </Toolbar>
        <Avatar className={classes.avatar} src={image}>{'P1'}</Avatar>
    </AppBar>
  );
}

export default Appbar;