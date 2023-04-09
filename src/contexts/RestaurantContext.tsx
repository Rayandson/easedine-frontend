import React from "react";
import { createContext, useState } from "react";
import { RestaurantInfo } from '../types'

type RestaurantProviderProps = {
    children: React.ReactNode
}

export type RestaurantContextType = {
    restaurant: RestaurantInfo | undefined,
    setRestaurant: React.Dispatch<React.SetStateAction<RestaurantInfo | undefined>>
}

export const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export function RestaurantProvider({ children }: RestaurantProviderProps) {
  const [restaurant, setRestaurant] = useState<RestaurantInfo | undefined>(undefined);

  return (
    <RestaurantContext.Provider value={{ restaurant, setRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
}