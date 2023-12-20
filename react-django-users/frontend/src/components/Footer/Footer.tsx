import React from 'react';
import { Box, Container, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        maxHeight: 75,
        py: 1,
        px: 1,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'grey.400',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="body1" color='text.secondary' >
          React Django Users
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;