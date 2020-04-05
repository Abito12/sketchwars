import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({show, handleClose, handleInvitationClick}) {
  return (
    <div>
      <Dialog
        fullWidth
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
            <Button fullWidth variant="contained" color="secondary" onClick={handleInvitationClick}>
                Play with a friend
            </Button>
            <Divider variant="middle" style={{"marginTop": "20px", "marginBottom": "20px"}}/>
            <Button fullWidth variant="contained" color="secondary">
                Find random opponent
            </Button>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
