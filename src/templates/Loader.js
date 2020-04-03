import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import withRoot from '../helpers/withRoot';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function CircularIndeterminate({minHeight='100vh'}) {
  const classes = useStyles();

  return (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight }}
    >
        <div className={classes.root}>
            <CircularProgress color="secondary" />
        </div>
    </Grid>
  );
}

export default withRoot(CircularIndeterminate);