"use client";

import { ShoppingCartIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Price from "../_components/price";
import { useShoppingCart } from "./cart-context";
import CartItemSummary from "./cart-item";
import LoadingDots from "./loading-dots";

export type MerchandiseSearchParams = {
  [key: string]: string;
};
export function CartModal() {
  const { cartQuantity, cart, openCart, closeCart, isOpen } = useShoppingCart();
  const quantity = cartQuantity;
  // Use the context-controlled `isOpen` so external callers (like ItemCard)
  // which call `openCart()` will correctly open the Sheet.
  const open = isOpen;
  const total = 100;
  //   tax is 18% on each item
  const tax = total * 0.18;
  const grandTotal = total + tax;

  return (
    <Sheet
      onOpenChange={(next) => {
        // Sync the sheet's open state with the shopping cart context
        if (next) {
          openCart();
        } else {
          closeCart();
        }
      }}
      open={open}
    >
      <SheetTrigger asChild>
        <Button className="relative" size={"icon-lg"} variant={"outline"}>
          <ShoppingCartIcon />
          {quantity ? (
            <div className="-mr-2 -mt-2 absolute top-0 right-0 h-4 w-4 rounded-sm bg-blue-600 font-medium text-[11px] text-white">
              {quantity}
            </div>
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full p-4 md:w-3/4 dark:bg-black">
        <SheetHeader className="p-0">
          <SheetTitle className="text-xl">My Cart</SheetTitle>
          <SheetDescription className="sr-only">
            View your cart and checkout.
          </SheetDescription>
        </SheetHeader>
        {!cart || cart.lines.length === 0 ? (
          <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
            <ShoppingCartIcon className="h-16" />
            <p className="mt-6 text-center font-bold text-2xl">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between overflow-hidden p-1">
            <ul className="grow overflow-auto py-4">
              {cart.lines.map((item) => (
                <CartItemSummary item={item} key={item.id} />
              ))}
            </ul>
            <div className="px-2 py-4 text-neutral-500 text-sm dark:text-neutral-400">
              <div className="mb-3 flex items-center justify-between border-neutral-200 border-b pb-1 dark:border-neutral-700">
                <p>Taxes</p>
                <Price
                  amount={tax.toString()}
                  className="text-right text-base text-black dark:text-white"
                  currencyCode={"USD"}
                />
              </div>
              <div className="mb-3 flex items-center justify-between border-neutral-200 border-b pt-1 pb-1 dark:border-neutral-700">
                <p>Shipping</p>
                <p className="text-right">Calculated at checkout</p>
              </div>
              <div className="mb-3 flex items-center justify-between border-neutral-200 border-b pt-1 pb-1 dark:border-neutral-700">
                <p>Total</p>
                <Price
                  amount={grandTotal.toString()}
                  className="text-right text-base text-black dark:text-white"
                  currencyCode={"USD"}
                />
              </div>
            </div>
            <SheetFooter>
              <form>
                <CheckoutButton />
              </form>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="block w-full rounded-full bg-blue-600 p-3 text-center font-medium text-sm text-white opacity-90 hover:opacity-100"
      disabled={pending}
      type="submit"
    >
      {pending ? <LoadingDots className="bg-white" /> : "Proceed to Checkout"}
    </button>
  );
}
