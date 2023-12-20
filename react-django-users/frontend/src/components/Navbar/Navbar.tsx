import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
}from '@mui/material';
import NavbarUserButtons from './NavbarUserButtons';
import NavbarGuestButtons from './NavbarGuestButtons';
import NavbarDrawerButton from './NavbarDrawerButton';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

function Navbar() {
  const { user } = useAuthContext();

  return (
    <Box sx={{ flexGrow: 1, maxHeight: 75 }}>
      <AppBar
        component='nav'
        sx={{ 
          bgcolor: 'common.white',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          {user ? <NavbarDrawerButton /> : null}
          <Box sx={{ flexGrow: 1}}>
            <Typography
              variant='h6'
              component={RouterLink}
              to='/'
              sx={{ textDecoration: 0 }}
              color='primary.main'
            >
              React Django Users
            </Typography>
          </Box>
          {user ? <NavbarUserButtons /> : <NavbarGuestButtons /> }
       </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

export default Navbar;