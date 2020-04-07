import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {Card, CardContent, CardActions, Typography, Grid, Divider} from '@material-ui/core';

import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import GameDialog from '../GameDialog';

const useStyles = makeStyles(theme => ({
  root: {
    background: props => `linear-gradient(to right, ${props.leftColor}, ${props.rightColor})`,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bolder'
  },
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const CategoryCard = props => {

  const [showDialog, toggleDialog] = useState(false); 
  const {className, leftColor, rightColor, category, handleInvitationClick, handleSinglePlayer} = props;
  const classes = useStyles({leftColor, rightColor});

  return (
    <>
    <GameDialog 
      show={showDialog}
      handleClose={() => toggleDialog(false)}
      handleInvitationClick ={() => handleInvitationClick(category.id)}
      handleSinglePlayer={() => handleSinglePlayer(category.id)}
    />
    <Card className={clsx(classes.root, className)} onClick = {() => toggleDialog(!showDialog)}>
      <CardContent>
        <Typography align="center" gutterBottom variant="h6">
          {category.name}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <TrendingUpIcon className={classes.statsIcon} />
            <Typography display="inline"variant="body2">
              {Math.floor(Math.random() * 100) + 12} People played 
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
    </>
  );
};

CategoryCard.propTypes = {
  className: PropTypes.string,
  category: PropTypes.object.isRequired
};

export default CategoryCard;