import React, { useState } from 'react';
import { DrawerContext } from '../../hooks/useDrawerContext';


type DrawerProviderProps = {
  children: React.ReactNode
};

function DrawerProvider({ children }: DrawerProviderProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DrawerContext.Provider value={{ open, setOpen }} >
      {children}
    </DrawerContext.Provider>
  );
}

export default DrawerProvider;