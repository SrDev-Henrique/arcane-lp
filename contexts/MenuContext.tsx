"use client";

import React, { createContext, useContext, useState } from "react";

interface MenuContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isAudioOn: boolean;
  setIsAudioOn: (isOn: boolean) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);

  return (
    <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen, isAudioOn, setIsAudioOn }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu precisa ser usado dentro de um MenuProvider");
  }
  return context;
};
