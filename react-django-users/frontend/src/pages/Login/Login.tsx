import React, { useEffect } from 'react';
import { 
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as yup from 'yup';
import * as jose from 'jose';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import AlertsList  from '../../components/AlertsList';
import TokenService from '../../services/token';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useApi } from '../../hooks/useApi';
import { useErrorContext } from '../../hooks/useErrorContext';

type TLoginForm = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email('Неверный формат адреса электронной почты')
    .required('Укажите адрес электронной почты'),
  password: yup.string().required('Укажите пароль'),
});

function Login() {
  const controller = new AbortController();
  const { api, alerts, isFetching, fetchError, resetAlerts } = useApi();
  const { setError } = useErrorContext();
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TLoginForm>({
    resolver: yupResolver(schema)
  });

  const handleLogin = (data: any) => {
    // Jose error handler
    try {
      const decodedToken = jose.decodeJwt(data?.access);
      setUser({ role: decodedToken?.role as string });
      TokenService.updateAccessToken(data?.access);
      TokenService.updateRefreshToken(data?.refresh);
      navigate('/', { replace: true });
    } catch(error) {
      setError({
        message: {
          title: 'Ошибка токена',
          text: 'Не удалось прочитать токен доступа'
        }});
    }
  }
  
  const onSubmit = handleSubmit(async (data) => {
    resetAlerts();
    const response = await api.login(controller, data);
    if (response?.data) {
      handleLogin(response.data);
    } else if (response && !fetchError) {
      setError({
        message: {
          title: 'Ошибка сервера',
          text: 'В ответе нет данных'
        }});
    }
  });

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          marginY: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isFetching
          ? <CircularProgress sx={{ m: 1 }} />
          : <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
        }
        <Typography component='h1' variant='h5'>
          Вход
        </Typography>
        <Box component='form' onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            fullWidth
            id='email'
            label='Адрес электронной почты'
            autoComplete='email'
            autoFocus
            { ...register('email') }
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin='normal'
            fullWidth
            label='Пароль'
            type='password'
            id='password'
            autoComplete='current-password'
            { ...register('password') }
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          {alerts ? <AlertsList alerts={alerts} /> : null}
          <Button
            type='submit'
            variant='contained'
            sx={{ mt: 3, mb: 2, mx: 'auto', display: 'block' }}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                Ещё нет аккаунта?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;