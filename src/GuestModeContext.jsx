import React, { createContext, useContext, useState ,useRef} from 'react';

// context for guestMode
export const GuestModeContext = createContext();

//custom hook to access guestMode
export const useGuestMode = () => useContext(GuestModeContext);

export const GuestModeProvider = ({ children }) => {
  const guestMode = useRef(true);

  return (
    <GuestModeContext.Provider value={{ guestMode }}>
      {children}
    </GuestModeContext.Provider>
  );
};
