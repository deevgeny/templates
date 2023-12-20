import React  from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid
} from '@mui/material';
import ProfileEditForm from './ProfileEditForm';
import PasswordChangeForm from './PasswordChangeForm';


function AccountEdit() {

  return (
    <Grid
      container
      sx={{ px: 8, py: 2}}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}
      justifyContent='space-around'
    >
      <Grid item xs={4} sm={8} md={4} lg={4} xl={4}>
        <Card>
          <CardHeader title='Профиль' sx={{ textAlign: 'center' }} />
          <Divider variant='middle' />
          <CardContent>
            <ProfileEditForm />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} sm={8} md={4} lg={4} xl={4}>
        <Card>
          <CardHeader title='Пароль' sx={{ textAlign: 'center' }} />
          <Divider variant='middle' />
          <CardContent>
            <PasswordChangeForm />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AccountEdit;