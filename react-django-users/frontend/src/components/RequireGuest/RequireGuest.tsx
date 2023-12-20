import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

type RequireGuestProps = {
  children: React.ReactNode;
};

function RequireGuest({ children }: RequireGuestProps) {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to='/' state={{ replace: true }} />;
  } else {
    return <>{children}</>;
  }
}

export default RequireGuest;