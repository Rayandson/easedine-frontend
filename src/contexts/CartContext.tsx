import React from "react";
import { createContext, useState } from "react";

type CartProviderProps = {
    children: React.ReactNode
}

type CartType = {
    quantity: number;
    total: number;
    items: {
      id: number | undefined;
      itemName: string | undefined;
      image: string | null;
      description: string | undefined;
      note: string;
      price: number | null;
      type: string | undefined;
      quantity: number | undefined;
    }[] | [];
}

export type CartContextType = {
    cart: CartType,
    setCart: React.Dispatch<React.SetStateAction<CartType>>
    showCart: boolean;
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartType>({quantity: 0, total: 0, items: []});
  const [showCart, setShowCart] = useState(false);

  return (
    <CartContext.Provider value={{ cart, setCart, showCart, setShowCart }}>
      {children}
    </CartContext.Provider>
  );
}