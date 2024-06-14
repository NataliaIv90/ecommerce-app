import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ICartDialogModal {
  handleApproveAction: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CartDialogModal: React.FC<ICartDialogModal> = ({ handleApproveAction, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Confirm deleting all items'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            This action will remove all items from the cart. Please note, it can't be reverse.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color='error'
          >
            Discard
          </Button>
          <Button
            onClick={handleApproveAction}
            color='info'
          >
            Remove all
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
