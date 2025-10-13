import type { Metadata } from "next";
import CheckoutCartItems from "@/features/web/checkout/cart-items";
import CheckoutInfoFormSection from "@/features/web/checkout/info-form-section";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout your cart items.",
};

export default function CheckOutPage() {
  return (
    <div className="relative mx-auto w-full max-w-[1536px] px-4 py-4">
      <div className="relative grid grid-cols-2 rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
        <CheckoutInfoFormSection />
        <CheckoutCartItems />
      </div>
    </div>
  );
}
