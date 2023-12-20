import React from 'react';
import { Stack, Typography } from '@mui/material';

function NotFound() {
  return (
    <Stack alignItems='center' spacing={6} my={6}>
        <img
          className='img-scale-down'
          src={`${process.env.PUBLIC_URL}/page-not-found.svg`}
          alt='page not found'
          loading='lazy'
        />
        <Typography color='text.secondary'>
          Страница не найдена
        </Typography>
    </Stack>
  );
}

export default NotFound;