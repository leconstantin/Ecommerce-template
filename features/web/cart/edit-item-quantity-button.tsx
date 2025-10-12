"use client";

import clsx from "clsx";
import { MinusIcon, PlusIcon } from "lucide-react";

import type { CartItem } from "@/shopify/types";
import { useShoppingCart } from "./cart-context";

export function EditItemQuantityButton({
  type,
  item,
}: {
  item: CartItem;
  type: "plus" | "minus";
}) {
  const { decreaseCartQuantity, increaseCartQuantity } = useShoppingCart();

  const handleClick = () => {
    if (type === "plus") {
      increaseCartQuantity(item);
    } else {
      decreaseCartQuantity(item);
    }
  };

  return (
    <div>
      <button
        aria-label={
          type === "plus" ? "Increase item quantity" : "Reduce item quantity"
        }
        className={clsx(
          "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
          {
            "ml-auto": type === "minus",
          }
        )}
        onClick={handleClick}
        type="button"
      >
        {type === "plus" ? (
          <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
        ) : (
          <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
        )}
      </button>
      <p className="sr-only">{item.quantity}</p>
    </div>
  );
}
