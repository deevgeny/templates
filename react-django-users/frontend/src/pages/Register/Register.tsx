import React from 'react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container
}from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import AlertsList  from '../../components/AlertsList';
import { useApi } from '../../hooks/useApi';

type RegisterFormType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const schema = yup.object({
  firstName: yup.string().required('Укажите имя'),
  lastName: yup.string().required('Укажите фамилию'),
  email: yup
    .string()
    .email('Неверный формат адреса электронной почты')
    .required('Укажите адрес электронной почты'),
  password: yup
    .string()
    .min(8, 'Минимальная длина пароля 8 символов')
    .required('Укажите пароль'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Повторите пароль')
});

function Register() {
  const controller = new AbortController();
  const {api, alerts, resetAlerts, isFetching } = useApi();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormType>({
    resolver: yupResolver(schema)
  });

  const onSubmit = handleSubmit(async (formData) => {
    const response = await api.register(controller, {
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      password: formData.password
    });
    if (response) {
      resetAlerts([{
        severity: 'success',
        message: 'Поздравляем с успешной регистрацией! Через несколько секунд вы будете перенаправлены на страницу авторизации.'
      }]);
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 5000);
    }
  });

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isFetching
          ? <CircularProgress sx={{ m: 1 }}/>
          : <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
        }
        <Typography component='h1' variant='h5'>
          Регистрация
        </Typography>
        <Box component='form' noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                required
                fullWidth
                id='firstName'
                label='Имя'
                autoFocus
                { ...register('firstName') }
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Фамилия'
                autoComplete='family-name'
                { ...register('lastName') }
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Адрес электронной почты'
                autoComplete='email'
                { ...register('email') }
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Пароль'
                type='password'
                id='password'
                autoComplete='new-password'
                { ...register('password') }
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Повтор пароля'
                type='password'
                id='repeatPassword'
                autoComplete='new-password'
                { ...register('repeatPassword') }
                error={!!errors.repeatPassword}
                helperText={errors.repeatPassword?.message}
              />
            </Grid>
          </Grid>
          {alerts ? <AlertsList alerts={alerts} /> : null}
          <Button
            type='submit'
            variant='contained'
            sx={{ mt: 3, mb: 2, mx: 'auto', display: 'block' }}
          >
           Зарегистрироваться 
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;