import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { useEffect, useState } from 'react';

const Message = (): JSX.Element => {
  const snackbarInfo = useAppSelector((state) => state.products.snackbarInfo);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    if (!!snackbarInfo.message || !!snackbarInfo.errorMessage) {
      setOpen(true);
    }
  }, [snackbarInfo]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Snackbar
        data-testid={'message'}
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarInfo.errorMessage ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {snackbarInfo.errorMessage ? snackbarInfo.errorMessage : `${snackbarInfo.message}`}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Message;
