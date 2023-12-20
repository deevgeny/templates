import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ErrorDialog from '../../components/ErrorDialog';
import SideDrawer from '../../components/SideDrawer';


function Home() {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <Box component='main' sx={{ flexGrow: 1 }}>
        <SideDrawer />
        <Outlet />
      </Box>
      <Box component='footer'>
        <Footer />
      </Box>
      <ErrorDialog />
    </Box>
  );
}

export default Home;