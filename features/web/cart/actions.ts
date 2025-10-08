"use server";
import { revalidateTag } from "next/cache";
import { TAGS } from "@/shopify/constants";

export async function addItem(
  _prevState: unknown,
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    //   console.error("No variant selected");
    return "Error adding item to cart";
  }

  try {
    // await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    await revalidateTag(TAGS.cart);
    return "Item added successfully";
  } catch {
    //   console.error("Error adding item to cart", e);
    return "Error adding item to cart";
  }
}
