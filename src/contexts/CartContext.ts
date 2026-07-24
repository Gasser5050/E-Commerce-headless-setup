import { createContext } from "react";
import type { CartItem } from "../types/Types";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem, availableStock: number) => void;
  removeFromCart: (itemID: CartItem["cartItemId"]) => void;
  updateItemQuantity: (
    itemId: CartItem["cartItemId"],
    quantity: number
  ) => void;
  clearCart: () => void;
  totalCartCount: number;
};

export const CartContext = createContext<CartContextType | null>(null);
