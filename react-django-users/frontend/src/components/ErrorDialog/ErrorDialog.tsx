import React, { useEffect, useState } from 'react';
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useErrorContext } from '../../hooks/useErrorContext';
import { AxiosError } from 'axios';
import { TErrorMessage } from '../../services/error/baseError';
import { AxiosErrorService } from '../../services/error/axiosError';

function ErrorDialog() {
  const { error, setError } = useErrorContext();
  const [ errorMessage, setErrorMessage ] = useState<TErrorMessage>();
  
  function handleClose() {
    // ADD FEATURE: send log to server
    setError(undefined);
    setErrorMessage(undefined);
  };

  useEffect(() => {
    if (!error?.object && error?.message) {
      setErrorMessage(error.message);
    } else if (error?.object instanceof AxiosError) {
      setErrorMessage(new AxiosErrorService(error.object).message)
    }
    // eslint-disable-next-line
  }, [error])

  return (
    <Dialog
      open={errorMessage ? true : false}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {errorMessage?.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {errorMessage?.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Назад</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorDialog;