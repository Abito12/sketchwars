import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      fontWeight: 'bolder'
    },
  },
  avatar: {
    color: props => theme.palette.getContrastText(props.invert ? '#be2edd' : '#f9ca24'),
    backgroundColor: props => props.invert ? '#be2edd' : '#f9ca24',
    textTransform: 'uppercase',
    fontWeight: 'bolder'
  }
}));

const UserAvatar = ({initials, invert=false, score}) => {
  const classes = useStyles({invert});

  const renderUserDetails = (initials, score, invert) => {
      const avatarEl = <Avatar className={classes.avatar}>{initials}</Avatar>;
      const scoreEl = <p>{score * 2}</p>;
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