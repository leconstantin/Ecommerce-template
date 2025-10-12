"use client";

import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import type { Product, ProductVariant } from "@/shopify/types";
import { useProduct } from "../product/product-context";
import { useShoppingCart } from "./cart-context";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  onClick,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  onClick: () => void;
}) {
  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button
        className={clsx(buttonClasses, disabledClasses)}
        disabled
        type="button"
      >
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        className={clsx(buttonClasses, disabledClasses)}
        disabled
        type="button"
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        "hover:opacity-90": true,
      })}
      onClick={onClick}
      type="button"
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { openCart, addItemToCart } = useShoppingCart();

  const handleAddToCart = () => {
    addItemToCart(product);
    openCart();
  };
  // const { addCartItem } = useCart();
  const { state } = useProduct();
  // const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((v: ProductVariant) =>
    v.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  // const actionWithVariant = formAction.bind(null, selectedVariantId);
  // const finalVariant = variants.find((v) => v.id === selectedVariantId);

  // const handleSubmit = async () => {
  //   // First, update the optimistic cart
  //   if (finalVariant) {
  //     addCartItem(finalVariant, product);
  //   }
  //   // Then execute the server action
  //   await actionWithVariant();
  // };

  return (
    <form>
      <SubmitButton
        availableForSale={availableForSale}
        onClick={handleAddToCart}
        selectedVariantId={selectedVariantId}
      />
    </form>
  );
}
