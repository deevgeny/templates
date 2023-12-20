import React from 'react';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AuthProvider from './AuthProvider';
import ErrorProvider from './ErrorProvider';
import DrawerProvider from './DrawerProvider';
import theme from '../themes/tealTheme';

type AppProvidersProps = {
  children: React.ReactNode
};

function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ErrorProvider>
          <DrawerProvider>
            {children}
          </DrawerProvider>
        </ErrorProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default AppProviders;