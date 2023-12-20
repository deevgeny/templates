import React from 'react';
import Grid from '@mui/material/Grid';
import ProfileCard from './ProfileCard';

function Account() {
  return (
      <Grid
        container
        sx={{ px: 8, py: 2}}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}
        justifyContent='space-around'
      >
        <Grid item xs={4} sm={8} md={4} lg={4} xl={4}>
          <ProfileCard />
        </Grid>
        <Grid item xs={4} sm={8} md={8} lg={4} xl={4}>
        </Grid>
        <Grid item xs={4} sm={8} md={8} lg={4} xl={4}>
        </Grid>
      </Grid>
  );
}

export default Account;