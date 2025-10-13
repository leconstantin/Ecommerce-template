"use client";
import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Cart, CartItem, Product } from "@/shopify/types";

type TShoppingCartContext = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (product: Product) => number;
  addItemToCart: (product: Product) => void;
  increaseCartQuantity: (item: CartItem) => void;
  decreaseCartQuantity: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  cartQuantity: number;
  cart: Cart;
};

const ShoppingCartContext = createContext({} as TShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useLocalStorage<Cart>("shopping-cart", {
    id: undefined,
    checkoutUrl: "",
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "USD" },
      totalAmount: { amount: "0", currencyCode: "USD" },
      totalTaxAmount: { amount: "0", currencyCode: "USD" },
    },
    lines: [],
    totalQuantity: 0,
  });

  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  /** 🧮 Get quantity of a product in cart */
  function getItemQuantity(product: Product) {
    return (
      cart.lines.find((item) => item.merchandise.product.id === product.id)
        ?.quantity || 0
    );
  }

  /** ➕ Add or increase a product in cart */
  function addItemToCart(product: Product) {
    setIsOpen(true);
    setCart((currCart) => {
      const existingItem = currCart.lines.find(
        (item) => item.merchandise.product.id === product.id
      );

      let updatedLines: CartItem[];

      if (existingItem) {
        updatedLines = currCart.lines.map((item) =>
          item.merchandise.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: product.id,
          quantity: 1,
          cost: {
            totalAmount: {
              amount: product.priceRange.maxVariantPrice.amount,
              currencyCode: product.priceRange.maxVariantPrice.currencyCode,
            },
          },
          merchandise: {
            id: product.variants[0]?.id || crypto.randomUUID(),
            title: product.variants[0]?.title || product.title,
            selectedOptions: product.variants[0]?.selectedOptions || [],
            product: {
              id: product.id,
              handle: product.handle,
              title: product.title,
              featuredImage: product.featuredImage,
            },
          },
        };

        updatedLines = [...currCart.lines, newItem];
      }
      const totals = updateCartTotals(updatedLines);

      return {
        ...currCart,
        lines: updatedLines,
        ...totals,
      };
    });
  }

  function increaseCartQuantity(item: CartItem) {
    setCart((currCart) => {
      const existingItem = currCart.lines.find(
        (line) => line.merchandise.product.id === item.merchandise.product.id
      );

      if (!existingItem) return currCart;

      const updatedLines = currCart.lines.map((line) =>
        line.merchandise.product.id === item.merchandise.product.id
          ? { ...line, quantity: line.quantity + 1 }
          : line
      );
      return {
        ...currCart,
        lines: updatedLines,
        totalQuantity: updatedLines.reduce((t, i) => t + i.quantity, 0),
      };
    });
  }

  /** ➖ Decrease quantity or remove product */
  function decreaseCartQuantity(item: CartItem) {
    setCart((currCart) => {
      const existingItem = currCart.lines.find(
        (line) => line.merchandise.product.id === item.merchandise.product.id
      );

      if (!existingItem) return currCart;

      let updatedLines: CartItem[];

      if (existingItem.quantity === 1) {
        updatedLines = currCart.lines.filter(
          (line) => line.merchandise.product.id !== item.merchandise.product.id
        );
      } else {
        updatedLines = currCart.lines.map((line) =>
          line.merchandise.product.id === item.merchandise.product.id
            ? { ...line, quantity: line.quantity - 1 }
            : line
        );
      }

      return {
        ...currCart,
        lines: updatedLines,
        totalQuantity: updatedLines.reduce((t, i) => t + i.quantity, 0),
      };
    });
  }

  /** ❌ Remove product completely */
  function removeFromCart(item: CartItem) {
    setCart((currCart) => {
      const updatedLines = currCart.lines.filter(
        (line) => line.merchandise.product.id !== item.merchandise.product.id
      );
      return {
        ...currCart,
        lines: updatedLines,
        totalQuantity: updatedLines.reduce((t, i) => t + i.quantity, 0),
      };
    });
  }

  function updateCartTotals(
    lines: CartItem[]
  ): Pick<Cart, "totalQuantity" | "cost"> {
    const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = lines.reduce(
      (sum, item) => sum + Number(item.cost.totalAmount.amount),
      0
    );
    const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? "USD";
    return {
      totalQuantity,
      cost: {
        subtotalAmount: { amount: totalAmount.toString(), currencyCode },
        totalAmount: { amount: totalAmount.toString(), currencyCode },
        totalTaxAmount: { amount: "0", currencyCode },
      },
    };
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        isOpen,
        openCart,
        closeCart,
        getItemQuantity,
        addItemToCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,

        cartQuantity: cart.totalQuantity,
        cart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
