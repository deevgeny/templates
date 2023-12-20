import React, { useEffect } from 'react';
import {
  InputAdornment,
  Button,
  TextField,
  Box,
  CircularProgress,
} from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AlertsList  from '../../components/AlertsList';
import PhoneMask from './PhoneMask';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useApi } from '../../hooks/useApi';

type FieldNames = 'firstName' | 'lastName' | 'phone';

type ProfileEditFormType = {
  firstName: string;
  lastName: string;
  phone?: string;
};

const schema = yup.object({
  firstName: yup.string().required('Укажите имя'),
  lastName: yup.string().required('Укажите фамилию'),
  phone: yup
    .string()
    .matches(/^$|^\+\d{1}[^\S\r\n\t]\(\d{3}\)[^\S\r\n\t]\d{3}-\d{2}-\d{2}$/,
      'Неверный формат номера')
});

function ProfileEditForm() {
  const { api, alerts, resetAlerts, isFetching } = useApi();
  const { setUser } = useAuthContext();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields }
  } = useForm<ProfileEditFormType>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const tickMarkAdornment = (fieldName: FieldNames) => {
    if (Object.keys(dirtyFields).includes(fieldName)) {
      return {
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{ "& .MuiTypography-root": { color: "primary.main" } }}
          >
            &#10004;
          </InputAdornment>
        )
      }
    }
  }

  const onSubmit = handleSubmit(async (formData) => {
    const controller = new AbortController();
    const response = await api.updateProfile(controller, {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone
    });
    if (response?.data) {
      // Reset form alerts with successful message
      resetAlerts([{
        severity: 'success',
        message: 'Данные обновлены'
      }]);
      // Reset form
      reset({
        firstName: response.data.first_name || '',
        lastName: response.data.last_name || '',
        phone: response.data.phone || ''
      });
      // Update user context
      setUser({
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        email: response.data.email,
        phone: response.data.phone,
        photo: response.data.photo,
        role: response.data.role
      });
    }
  })

  useEffect(() => {
    const controller = new AbortController();
    const getUserProfile = async () => {
      const response = await api.getProfile(controller);
      if (response?.data) {
        reset({
          firstName: response?.data.first_name || '',
          lastName: response?.data.last_name || '',
          phone: response?.data.phone || ''
        }, {keepTouched: false});
      }
    }

    getUserProfile();

    return () => controller.abort();
    // eslint-disable-next-line
  }, []);

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
        id='firstName'
        label='Имя'
        { ...register('firstName') }
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        InputLabelProps={{ shrink: true }}
        InputProps={{ ...tickMarkAdornment('firstName') }}
      />
      <TextField
        margin='dense'
        size='small'
        fullWidth
        id='lastName'
        label='Фамилия'
        { ...register('lastName') }
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        InputLabelProps={{ shrink: true }}
        InputProps={{ ...tickMarkAdornment('lastName') }}
      />
      <TextField
        margin='dense'
        size='small'
        fullWidth
        id='phone'
        label='Номер телефона'
        { ...register('phone') }
        error={!!errors.phone}
        helperText={errors.phone?.message}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          ...tickMarkAdornment('phone'),
          inputComponent: PhoneMask as any
        }}
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

export default ProfileEditForm;