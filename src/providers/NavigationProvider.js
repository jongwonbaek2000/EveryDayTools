import React, {useState, createContext} from 'react';

export const NavigationContext = createContext();

export function NavigationProvider({children, headerShown, setHeaderShown}) {
  const value = {
    headerShown,
    setHeaderShown,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
