import React from 'react';
import {
  IconButton
}from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDrawerContext } from '../../hooks/useDrawerContext';

function NavbarDrawerButton() {
  const {open, setOpen} = useDrawerContext();
  
  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <IconButton
      size='large'
      edge='start'
      aria-label='open-drawer'
      sx={{ mr: 2 }}
      onClick={toggleDrawer}
    >
      {open ? <CloseIcon /> : <MenuIcon />}
    </IconButton>
  );
}

export default NavbarDrawerButton;