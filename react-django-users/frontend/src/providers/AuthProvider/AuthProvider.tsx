import React, { useState } from 'react';
import { AuthContext, TUser } from '../../hooks/useAuthContext';
import TokenService from '../../services/token';

type AuthProviderProps = {
  children: React.ReactNode
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<TUser | undefined>(TokenService.getAuthContext());

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;