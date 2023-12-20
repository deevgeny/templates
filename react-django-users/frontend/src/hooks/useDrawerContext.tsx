import React, { createContext, useContext } from 'react';

interface IDrawerContext {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState = {
  open: false,
  setOpen: () => {}
};

export const DrawerContext = createContext<IDrawerContext>(initialState);

/**
 * useDrawerContext - custom hook to manage drawer close open state.
 * @returns {{
 *  {bolean} open,
 *  {() => void} setOpen
 * }}
 * 
 * * open - drawer state false/true close/open.
 * * setOpen - setter function for drawer state.
 */
export function useDrawerContext() {
  return useContext(DrawerContext);
}