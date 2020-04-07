import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CopyRight from '../templates/CopyRight';
import AppIcon from '../assets/images/appIcon.png'
import withRoot from '../helpers/withRoot';
// import FacebookIcon from '@material-ui/icons/Facebook';
// import GTranslateIcon from '@material-ui/icons/GTranslate';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    background: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  image: {
    backgroundImage: 'url(https://wallpaperaccess.com/full/27839.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  google: {
    margin: theme.spacing(1),
    width: theme.spacing(2),
    height: theme.spacing(2),
  }
}));

const SignUp = ({signUpHandler}) => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5}>
        <div className={classes.paper}>
          <Avatar sizes="" className={classes.avatar} src={AppIcon}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Buzzle
          </Typography>
          <Typography variant="subtitle2" align="center" paragraph style={{marginTop: '8px'}}>
              Learn, grow and have fun challenging friends and players online on interests you’re best at!
          </Typography>
          <form className={classes.form} noValidate>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              style={{backgroundColor: '#3b5998', color: 'white'}}
            >
              Sign In with Facebook
            </Button>
            <Divider variant="middle" />
            <div>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick = {() => signUpHandler('google')}
                    style={{backgroundColor: '#EA4335', color: 'white'}}
                    >
                    Sign in with Google
                </Button>
            </div>
            <Box mt={5}>
              <CopyRight />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default withRoot(SignUp);
