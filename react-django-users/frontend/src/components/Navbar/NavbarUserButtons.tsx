import React, { useState, useMemo, useEffect } from 'react';
import {
  Stack,
  Menu,
  MenuItem,
  IconButton,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TokenService from '../../services/token';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useApi } from '../../hooks/useApi';
import { useErrorContext } from '../../hooks/useErrorContext';

function NavbarUserButtons() {
  const { api, fetchError} = useApi();
  const { setError } = useErrorContext();
  const { user, setUser } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleAccount = () => {
    handleClose();
    navigate('/account');
  };

  const handleLogout = () => {
    handleClose();
    TokenService.clear();
    setUser(undefined);
    navigate('/');
  };
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userPhoto = useMemo(() => {
    if (user?.photo) {
      return `${process.env.API_URL}${user?.photo}`
    }
    return `${process.env.PUBLIC_URL}/default-user.png`
  }, [user?.photo])

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      const response = await api.getProfile(controller);
      if (response?.data) {
        setUser({
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          email: response.data.email,
          phone: response.data.phone,
          photo: response.data.photo,
          role: response.data.role
        });
      }
    };
    
    if (user && Object.keys(user).length === 1) {
      getData();
    }
    
    return () => controller.abort();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Send fetch error to error context to open ErrorDialog
    setError({ object: fetchError });

    // eslint-disable-next-line
  }, [fetchError]);

  return (
    <Stack spacing={1} direction='row' alignItems='center'>
      <IconButton
        aria-label='profile'
        color='primary'
        id='user-menu-button'
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{ height: 34, width: 34 }} src={userPhoto} />
      </IconButton>
      <Menu
        id='user-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
        'aria-labelledby': 'user-menu-button',
        }}
      >
        <MenuItem onClick={handleAccount}>Аккаунт</MenuItem>
        <MenuItem onClick={handleLogout}>Выход</MenuItem>
      </Menu>
    </Stack>
  );
}

export default NavbarUserButtons;