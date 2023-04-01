import React from "react";
import { createContext, useState } from "react";
import { MenuItemType } from '../types'

type ChosenItemProviderProps = {
    children: React.ReactNode
}

export type ChosenItemContextType = {
    chosenItem: MenuItemType | null,
    setChosenItem: React.Dispatch<React.SetStateAction<MenuItemType | null>>
}

export const ChosenItemContext = createContext<ChosenItemContextType | null>(null);

export function ChosenItemProvider({ children }: ChosenItemProviderProps) {
  const [chosenItem, setChosenItem] = useState<MenuItemType | null>(null);

  return (
    <ChosenItemContext.Provider value={{ chosenItem, setChosenItem }}>
      {children}
    </ChosenItemContext.Provider>
  );
}