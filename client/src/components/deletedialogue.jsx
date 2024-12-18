import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Fade } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    backgroundColor: '#d32f2f',
    color: 'white',
    padding: '15px 20px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  dialogContent: {
    padding: '20px 30px',
  },
  dialogActions: {
    padding: '15px 20px',
  },
  button: {
    borderRadius: '20px',
    padding: '8px 20px',
    '&:hover': {
      backgroundColor: '#c2185b',
      color: 'white',
    },
  },
  cancelButton: {
    borderRadius: '20px',
    padding: '8px 20px',
    '&:hover': {
      backgroundColor: '#9e9e9e',
      color: 'black',
    },
  },
}));

export default function DeleteConfirmationDialog({ open, handleClose, handleConfirmDelete }) {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose} TransitionComponent={Fade} keepMounted fullWidth maxWidth="xs">
      <DialogTitle className={classes.dialogTitle}>Confirm Deletion</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <p style={{ color: '#555', fontSize: '16px' }}>
          Are you sure you want to delete this employee? This action cannot be undone.
        </p>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleClose} color="secondary" className={classes.cancelButton}>
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="error" className={classes.button}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
