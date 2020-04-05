import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: props => props.flexDirection,
    '& > *': {
      margin: theme.spacing(1),
      fontWeight: 'bolder'
    },
  },
  avatar: {
    color: props => theme.palette.getContrastText(props.p2 ? '#be2edd' : '#f9ca24'),
    backgroundColor: props => props.p2 ? '#be2edd' : '#f9ca24',
    textTransform: 'uppercase',
    fontWeight: 'bolder',
    width: props => props.width,
    height: props => props.height
  },
  score: {
    fontSize: props => props.textSize
  }
}));

const UserAvatar = ({initials, 
  score, 
  textSize='20px',
  invert=false, 
  height='50px', 
  width='50px',
  flexDirection='row',
  image,
  p2=false
}) => {
  const classes = useStyles({invert, height, width, flexDirection, textSize, p2});

  const renderUserDetails = (initials, score, invert) => {
      const avatarEl = <Avatar className={classes.avatar} src={image}>{initials}</Avatar>;
      const scoreEl = <p className={classes.score}>{score}</p>;
      if(invert) {
        return [avatarEl, scoreEl];
      } 
      return [scoreEl, avatarEl];
  }

  return (
    <div className={classes.root}>
      {renderUserDetails(initials, score, invert)}
    </div>
  );
}

export default UserAvatar;