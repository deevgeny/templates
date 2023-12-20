import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import GuestContent from '../GuestContent';
import { useAuthContext } from '../../hooks/useAuthContext';

type RequireAuthProps = {
  children: React.ReactNode;
};

function RequireAuth({ children }: RequireAuthProps) {
  const { user } = useAuthContext();
  const location = useLocation();

  if (location.pathname === '/' && !user) {
    return <GuestContent />
  } else if (!user) {
    return <Navigate to='/login' state={{ path: location.pathname }} />;
  } else {
    return <>{children}</>;
  }
}

export default RequireAuth;