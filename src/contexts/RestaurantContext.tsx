import React from "react";
import { createContext, useState } from "react";
import { RestaurantResponse } from '../types'

type RestaurantProviderProps = {
    children: React.ReactNode
}

export type RestaurantContextType = {
    restaurant: RestaurantResponse | null,
    setRestaurant: React.Dispatch<React.SetStateAction<RestaurantResponse | null>>
}

export const RestaurantContext = createContext<RestaurantContextType | null>(null);

export function RestaurantProvider({ children }: RestaurantProviderProps) {
  const [restaurant, setRestaurant] = useState<RestaurantResponse | null>(null);

  return (
    <RestaurantContext.Provider value={{ restaurant, setRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
}