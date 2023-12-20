import React, { createContext, useContext } from 'react';

export type TUser = {
  role?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  photo?: string
};

interface IAuthContext {
  user: TUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<TUser | undefined>>;
};

const initialState = {
  user: undefined,
  setUser: () => {}
};

export const AuthContext = createContext<IAuthContext>(initialState);

/**
 * useAuthContext - custom hook to manage user authentication state.
 * @returns {{
 *  {TUser | undefined} user,
 *  {() => void} setUser
 * }}
 * 
 * * user - user object.
 * * setUser - setter function for user object.
 */
export function useAuthContext() {
  return useContext(AuthContext);
}
