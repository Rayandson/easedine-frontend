import React from "react";
import { createContext, useState } from "react";
import { OrderResponse } from "../types";

type OrderProviderProps = {
    children: React.ReactNode
}

export type OrderContextType = {
    order: OrderResponse | undefined,
    setOrder: React.Dispatch<React.SetStateAction<OrderResponse | undefined>>
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: OrderProviderProps) {
  const [order, setOrder] = useState<OrderResponse | undefined>();

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}