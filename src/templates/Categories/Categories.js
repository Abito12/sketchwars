import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import CategoryCard from './CategoryCard';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: "white"
  }
}));

const CategoriesList = ({categories, handleInvitationClick, handleSinglePlayer}) => {
  const classes = useStyles();

  const gradients = [
    ['#2193b0', '#6dd5ed'],
    ['#3a7bd5', '#3a6073'],
    ['#005c97', '#363795'],
    ['#1488cc', '#2b32b2'],
    ['#02aab0', '#00cdac']
];

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          <Grid item lg={12} md={12} xs={12}>
            <Typography variant="subtitle2" align="center" style={{color: 'white'}}>
              Choose a category
            </Typography>
          </Grid>
          {categories.map((category, i) => {
              const color = gradients[i % gradients.length];
              
              return (
                <Grid item key={category.id} lg={4} md={6} xs={12}>
                    <CategoryCard 
                      leftColor={color[0]}
                      rightColor={color[1]}
                      category={category} 
                      handleInvitationClick={handleInvitationClick}
                      handleSinglePlayer={handleSinglePlayer}
                    />
                </Grid>
              );
          })}
        </Grid>
      </div>
      {/* <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon style={{ color: 'white'}} />
        </IconButton>
        <IconButton>
          <ChevronRightIcon style={{ color: 'white'}} />
        </IconButton>
      </div> */}
    </div>
  );
};

export default CategoriesList;