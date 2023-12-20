import React  from 'react';
import {
  Button,
  TextField,
  Box,
  CircularProgress,
} from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AlertsList  from '../../components/AlertsList';
import { useApi } from '../../hooks/useApi';

type PasswordChangeFormType = {
  newPassword: string;
  repeatPassword: string;

};

const schema = yup.object({
  newPassword: yup
    .string()
    .min(8, 'Минимальная длина пароля 8 символов')
    .required('Укажите пароль'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Пароли не совпадают')
    .required('Повторите пароль')
});

function PasswordChangeForm() {
  const { api, alerts, resetAlerts, isFetching} = useApi();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<PasswordChangeFormType>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      newPassword: '',
      repeatPassword: ''
    }
  });

  const onSubmit = handleSubmit(async (formData) => {
    const controller = new AbortController();
    const response = await api.changePassword(controller, {
      new_password: formData.newPassword,
      re_password: formData.repeatPassword,
    });
    if (response) {
      resetAlerts([{
        severity: 'success',
        message: 'Пароль обновлен'
      }]);
      reset();
    }
  })
  
  return (
    <Box
      component='form'
      noValidate
      onSubmit={onSubmit}
      maxWidth={350}
      mx='auto'
    >
      <TextField
        margin='dense'
        size='small'
        fullWidth
        id='newPassword'
        type='password'
        autoComplete='new-password'
        label='Новый пароль'
        { ...register('newPassword') }
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
      />
      <TextField
        margin='dense'
        size='small'
        fullWidth
        id='repeatPassword'
        type='password'
        autoComplete='new-password'
        label='Повтор пароля'
        { ...register('repeatPassword') }
        error={!!errors.repeatPassword}
        helperText={errors.repeatPassword?.message}
      />
      {alerts ? <AlertsList alerts={alerts} /> : null}
      {isFetching
        ? <CircularProgress
            size={37}
            sx={{ my: 1, mx: 'auto', display: 'block'}}
          />
        : <Button
            type='submit'
            sx={{ mt: 2, mx: 'auto', display: 'block' }}
            disabled={!isDirty}
          >
            Сохранить
          </Button>
      }
    </Box>
  );
}

export default PasswordChangeForm;