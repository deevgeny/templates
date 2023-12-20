import React from 'react';
import {
  Stack,
  Button,
  Divider 
}from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

function NavbarGuestButtons() {
  const location = useLocation();

  return (
    <Stack spacing={1} direction='row'>
      <Button
        color='primary'
        component={RouterLink}
        to='/login'
        disabled={location.pathname === '/login'}
      >
        Вход
      </Button>
      <Divider orientation='vertical' variant='middle' flexItem />
      <Button
        color='primary'
        component={RouterLink}
        to='/register'
        disabled={location.pathname === '/register'}
      >
        Регистрация
      </Button>
    </Stack>
  );
}

export default NavbarGuestButtons;