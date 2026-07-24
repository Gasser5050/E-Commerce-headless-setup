import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../types/Types";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const localCart = localStorage.getItem("cart");
      return localCart ? JSON.parse(localCart) : [];
    } catch {
      return [];
    }
  });

  const totalCartCount = cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  function addToCart(item: CartItem, maxStock: number) {
    setCartItems(currentCart => {
      const existingItem = currentCart.find(
        cartItem => cartItem.cartItemId === item.cartItemId
      );

      const quantityInCart = existingItem ? existingItem.quantity : 0;
      const requestedStock = quantityInCart + item.quantity;

      if (requestedStock > maxStock) {
        const allowedToAdd = maxStock - quantityInCart;

        if (allowedToAdd < 1) {
          alert(
            `You already have the maximum available stock (${maxStock}) in your cart!`
          );
          return currentCart;
        }

        alert(
          `Only ${allowedToAdd} more available. Added ${allowedToAdd} to your cart.`
        );

        if (existingItem) {
          return currentCart.map(cartItem => {
            if (cartItem.cartItemId === item.cartItemId) {
              return { ...cartItem, quantity: maxStock };
            } else return cartItem;
          });
        } else return [...currentCart, { ...item, quantity: maxStock }];
      }

      if (existingItem) {
        return currentCart.map(cartItem => {
          if (cartItem.cartItemId === item.cartItemId) {
            return { ...cartItem, quantity: requestedStock };
          }
          return cartItem;
        });
      }

      return [...currentCart, item];
    });
  }

  function removeFromCart(itemId: CartItem["cartItemId"]) {
    setCartItems(currentCart =>
      currentCart.filter(item => item.cartItemId !== itemId)
    );
  }

  function updateItemQuantity(
    itemId: CartItem["cartItemId"],
    quantity: number
  ) {
    if (quantity < 1) {
      setCartItems(currentCart =>
        currentCart.filter(item => item.cartItemId !== itemId)
      );
      return;
    }

    setCartItems(currentCart =>
      currentCart.map(item => {
        if (item.cartItemId === itemId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        totalCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
