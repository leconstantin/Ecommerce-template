"use client";
import { DotIcon } from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DEFAULT_OPTION } from "@/shopify/constants";
import Price from "../_components/price";
import { useShoppingCart } from "../cart/cart-context";
export default function CheckoutCartItemsMobile() {
  const { cart, cartQuantity } = useShoppingCart();
  return (
    <section className="h-fit w-full lg:hidden">
      <Accordion collapsible type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer bg-muted/50 px-4 hover:no-underline">
            <div className="flex w-full items-center justify-between">
              <span>Order Summary</span>
              <Price
                amount={cart.cost.totalAmount.amount}
                className="text-right font-bold text-lg"
                currencyCode={cart.cost.totalAmount.currencyCode}
              />
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-9">
            <div className="mb-6 flex flex-col gap-5">
              {cart.lines.map((item) => (
                <li className="list-none" key={item.id}>
                  <div className="relative flex w-full flex-row items-center justify-between px-1">
                    <div className="flex flex-row items-center gap-3 lg:gap-6">
                      <div className="relative h-16 w-16 rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                        <Image
                          alt={
                            item.merchandise.product.featuredImage.altText ||
                            item.merchandise.product.title
                          }
                          className="h-full w-full object-cover"
                          height={64}
                          src={item.merchandise.product.featuredImage.url}
                          width={64}
                        />
                        <div className="-top-2 -right-2 absolute z-40">
                          <Button className="size-6" size={"icon"}>
                            {item.quantity}
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col text-base">
                        <span className="leading-tight">
                          {" "}
                          {item.merchandise.product.title}
                        </span>
                        {item.merchandise.title !== DEFAULT_OPTION ? (
                          <p className="text-neutral-500 text-sm dark:text-neutral-400">
                            {item.merchandise.title}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <Price
                      amount={item.cost.totalAmount.amount}
                      className="flex justify-end space-y-2 text-right text-sm"
                      currencyCode={item.cost.totalAmount.currencyCode}
                    />
                  </div>
                </li>
              ))}
            </div>
            <div className="mb-6 flex flex-col gap-2 text-foreground/90">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  Subtotal
                  <DotIcon />
                  {cartQuantity} items
                </div>
                <Price
                  amount={cart.cost.totalAmount.amount}
                  className="text-right text-base"
                  currencyCode={cart.cost.totalAmount.currencyCode}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">Shipping</div>
                <p className="text-muted-foreground">Calculated at next step</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold text-lg">Total</p>
              <Price
                amount={cart.cost.totalAmount.amount}
                className="text-right font-bold text-lg"
                currencyCode={cart.cost.totalAmount.currencyCode}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
