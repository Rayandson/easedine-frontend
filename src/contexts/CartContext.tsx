import React from "react";
import { createContext, useState } from "react";

type CartProviderProps = {
    children: React.ReactNode
}

type CartType = {
    quantity: number;
}
export type CartContextType = {
    Cart: CartType,
    setCart: React.Dispatch<React.SetStateAction<CartType>>
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: CartProviderProps) {
  const [Cart, setCart] = useState<CartType>({quantity: 0});

  return (
    <CartContext.Provider value={{ Cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}