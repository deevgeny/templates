import React, { useEffect, useState, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useErrorContext } from '../../hooks/useErrorContext';

export type UserDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  photo?: string
};

function ProfileCard() {
  const { api, fetchError } = useApi();
  const { setError } = useErrorContext();
  const [userData, setUserData] = useState<UserDataType>();

  const userPhoto = useMemo(() => {
    if (userData?.photo) {
      return `${process.env.API_URL}${userData?.photo}`
    }
    return `${process.env.PUBLIC_URL}/default-user.png`
  }, [userData?.photo])

  useEffect(() => {
    const controller = new AbortController();
    const getProfileData = async () => {
      const response = await api.getProfile(controller);
      if (response?.data) {
        setUserData({
          firstName: response?.data.first_name,
          lastName: response?.data.last_name,
          email: response?.data.email,
          phone: response?.data.phone,
          photo: response?.data.photo,
        });
      } else {
        setError({ object: fetchError });
      }
    }

    getProfileData();

    return () => controller.abort();

    // eslint-disable-next-line
  }, []);

  return (
    <Card>
      <CardHeader title='Мой профиль' />
      <Divider orientation='horizontal' variant='middle'/>
      <CardMedia
        component='img'
        image={userPhoto}
        alt='User avatar'
        sx={{
          width: '100px',
          height: '100px',
          ml: 2,
          borderRadius: 2
        }}
      />
      <CardContent sx={{ color: 'text.secondary'}}>
        <Typography
          variant='h6'
          component='div'
          gutterBottom
        >
          {`${userData?.firstName || ''} ${userData?.lastName || ''}`}
        </Typography>
        <Typography>
          {userData?.email || '-'}
        </Typography>
        <Typography>
          {userData?.phone || '-'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          component={RouterLink}
          to='/account/edit'
        >
          Редактировать
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProfileCard;