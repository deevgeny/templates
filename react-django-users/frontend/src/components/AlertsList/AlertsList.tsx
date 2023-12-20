import React from 'react';
import { Stack, Alert } from '@mui/material';

export type TAlert = {
  severity: 'error' | 'info' | 'success' | 'warning';
  message: string;
};

type AlertsListProps = {
  alerts: TAlert[];
};

function AlertsList({ alerts }: AlertsListProps) {
  return (
    <Stack spacing={0.5} padding={1}>
      {alerts.map((alert, index) => (
        <Alert key={index} severity={alert.severity}>
          {alert.message}
        </Alert>
      ))}
    </Stack>
  );
}

export default AlertsList;