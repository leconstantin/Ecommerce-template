"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Cart, CartItem, Product, ProductVariant } from "@/shopify/types";

type TShoppingCartContext = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (product: Product) => number;
  addCartItem: (product: Product, variant: ProductVariant) => void;
  increaseCartQuantity: (item: CartItem) => void;
  decreaseCartQuantity: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  cartQuantity: number;
  shipping: {
    type: string;
    amount: number;
  };
  setShippingAmount: (type: string, amount: number) => void;
  cart: Cart;
};

const ShoppingCartContext = createContext({} as TShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

/** 🧮 Helper to calculate totals for the whole cart */
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

/** 🆕 Helper to create a new CartItem */
function createCartItem(product: Product, variant: ProductVariant): CartItem {
  return {
    id: variant.id,
    quantity: 1,
    cost: {
      totalAmount: {
        amount: variant.price.amount,
        currencyCode: variant.price.currencyCode,
      },
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
      },
    },
  };
}

export function ShoppingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useLocalStorage<Cart>("shopping-cart", {
    id: undefined,
    checkoutUrl: "",
    lines: [],
    totalQuantity: 0,
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "USD" },
      totalAmount: { amount: "0", currencyCode: "USD" },
      totalTaxAmount: { amount: "0", currencyCode: "USD" },
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [shipping, setShipping] = useState<{
    type: string;
    amount: number;
  }>({
    type: "",
    amount: 0,
  });
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  /** 🧮 Get quantity of a product in cart */
  function getItemQuantity(product: Product) {
    return (
      cart.lines.find((item) => item.merchandise.product.id === product.id)
        ?.quantity || 0
    );
  }

  /** ➕ Add or increase product in cart */
  function addCartItem(product: Product, variant: ProductVariant) {
    if (!variant) return;

    setIsOpen(true);
    setCart((currCart) => {
      const existingItem = currCart.lines.find(
        (item) => item.merchandise.id === variant.id
      );

      let updatedLines: CartItem[];

      if (existingItem) {
        // Update quantity and cost for existing item
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          cost: {
            ...existingItem.cost,
            totalAmount: {
              ...existingItem.cost.totalAmount,
              amount: (
                Number(existingItem.cost.totalAmount.amount) +
                Number(variant.price.amount)
              ).toString(),
            },
          },
        };

        updatedLines = currCart.lines.map((item) =>
          item.merchandise.id === variant.id ? updatedItem : item
        );
      } else {
        // Add new item
        const newItem = createCartItem(product, variant);
        updatedLines = [...currCart.lines, newItem];
      }

      if (updatedLines.length === 0) {
        return {
          ...currCart,
          lines: [],
          totalQuantity: 0,
          cost: {
            subtotalAmount: { amount: "0", currencyCode: "USD" },
            totalAmount: { amount: "0", currencyCode: "USD" },
            totalTaxAmount: { amount: "0", currencyCode: "USD" },
          },
        };
      }

      const totals = updateCartTotals(updatedLines);
      return { ...currCart, lines: updatedLines, ...totals };
    });
  }

  /** ⬆️ Increase quantity */
  function increaseCartQuantity(item: CartItem) {
    setCart((currCart) => {
      const updatedLines = currCart.lines.map((line) =>
        line.merchandise.id === item.merchandise.id
          ? {
              ...line,
              quantity: line.quantity + 1,
              cost: {
                ...line.cost,
                totalAmount: {
                  ...line.cost.totalAmount,
                  amount: (
                    Number(line.cost.totalAmount.amount) +
                    Number(line.cost.totalAmount.amount) / line.quantity
                  ).toString(),
                },
              },
            }
          : line
      );

      const totals = updateCartTotals(updatedLines);
      return { ...currCart, lines: updatedLines, ...totals };
    });
  }

  /** ⬇️ Decrease quantity or remove */

  function decreaseCartQuantity(item: CartItem) {
    setCart((currCart) => {
      const existingItem = currCart.lines.find(
        (line) => line.merchandise.id === item.merchandise.id
      );
      if (!existingItem) return currCart;

      let updatedLines: CartItem[];

      if (existingItem.quantity === 1) {
        updatedLines = currCart.lines.filter(
          (line) => line.merchandise.id !== item.merchandise.id
        );
      } else {
        const singleItemPrice =
          Number(existingItem.cost.totalAmount.amount) / existingItem.quantity;
        updatedLines = currCart.lines.map((line) =>
          line.merchandise.id === item.merchandise.id
            ? {
                ...line,
                quantity: line.quantity - 1,
                cost: {
                  ...line.cost,
                  totalAmount: {
                    ...line.cost.totalAmount,
                    amount: (
                      Number(line.cost.totalAmount.amount) - singleItemPrice
                    ).toString(),
                  },
                },
              }
            : line
        );
      }

      if (updatedLines.length === 0) {
        return {
          ...currCart,
          lines: [],
          totalQuantity: 0,
          cost: {
            subtotalAmount: { amount: "0", currencyCode: "USD" },
            totalAmount: { amount: "0", currencyCode: "USD" },
            totalTaxAmount: { amount: "0", currencyCode: "USD" },
          },
        };
      }

      const totals = updateCartTotals(updatedLines);
      return { ...currCart, lines: updatedLines, ...totals };
    });
  }

  /** ❌ Remove item completely */
  function removeFromCart(item: CartItem) {
    setCart((currCart) => {
      const updatedLines = currCart.lines.filter(
        (line) => line.merchandise.id !== item.merchandise.id
      );

      const totals = updateCartTotals(updatedLines);
      return { ...currCart, lines: updatedLines, ...totals };
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        isOpen,
        openCart,
        closeCart,
        getItemQuantity,
        addCartItem,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity: cart.totalQuantity,
        shipping,
        setShippingAmount(type, amount) {
          setShipping({ type, amount });
        },
        cart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
