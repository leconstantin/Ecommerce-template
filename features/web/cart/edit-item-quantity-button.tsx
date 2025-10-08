"use client";

import clsx from "clsx";
import { MinusIcon, PlusIcon } from "lucide-react";
import type { CartItem } from "@/shopify/types";

// import { updateItemQuantity } from "./actions";

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  return (
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
      type="submit"
    >
      {type === "plus" ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  type,
  item,
}: {
  item: CartItem;
  type: "plus" | "minus";
}) {
  return (
    <form>
      <SubmitButton type={type} />
      <p className="sr-only">{item.quantity}</p>
    </form>
  );
}
