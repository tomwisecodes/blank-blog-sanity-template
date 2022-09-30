import React, { useState } from "react";
export const MenuContext = React.createContext();

export const MenuContextProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
};
