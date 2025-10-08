"use client";

import { XIcon } from "lucide-react";
import type { CartItem } from "@/shopify/types";

export function DeleteItemButton({ item }: { item: CartItem }) {
  return (
    <form>
      <button
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500"
        type="submit"
      >
        <XIcon className="mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
      <p className="sr-only">{item.quantity}</p>
    </form>
  );
}
