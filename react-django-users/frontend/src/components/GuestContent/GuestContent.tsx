import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

function GuestContent() {
  return (
    <Box>
      <Typography
        variant='h3'
        component='h3'
        sx={{ textAlign: 'center', mt: 10 }}
      >
        React Django Users
      </Typography>
      <Typography
        variant='h5'
        component='h5'
        sx={{ textAlign: 'center', mt: 4 }}
      >
        Базовое веб приложение с регистрацией и авторизацией
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }}
        spacing={{ xs: 6, sm: 6, md: 24, lg: 24, xl: 24 }}
        alignItems='center'
        justifyContent='center'
        sx={{ my: 10 }}
      >
        <Box>
          <img 
            src={`${process.env.PUBLIC_URL}/always-by-hand.svg`}
            alt='always by hand'
            loading='lazy'
            height={250}
          />
          <Typography sx={{ textAlign: 'center', mt: 4, fontSize: 20 }}>
            Всегда под рукой
          </Typography>
        </Box>
        <Box>
          <img 
            src={`${process.env.PUBLIC_URL}/easy-to-use.svg`}
            alt='easy to use'
            loading='lazy'
            height={250}
          />
          <Typography sx={{ textAlign: 'center', mt: 4, fontSize: 20 }}>
            Легко использовать
          </Typography>
        </Box>
        <Box>
          <img 
            src={`${process.env.PUBLIC_URL}/analytics.svg`}
            alt='analytics'
            loading='lazy'
            height={250}
          />
          <Typography sx={{ textAlign: 'center', mt: 4, fontSize: 20 }}>
            Анализ и статистика
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default GuestContent;