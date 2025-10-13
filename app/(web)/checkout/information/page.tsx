import type { Metadata } from "next";
import CheckoutCartItems from "@/features/web/checkout/cart-items";
import CheckoutCartItemsMobile from "@/features/web/checkout/cart-items-mobile";
import CheckoutInfoFormSection from "@/features/web/checkout/info-form-section";

export const metadata: Metadata = {
  title: "Information - Checkout",
  description: "Give information to be used for checkout your cart items.",
};

export default function CheckOutPage() {
  return (
    <div className="relative mx-auto w-full max-w-[1536px] px-0 py-4 md:px-4">
      <div className="relative mx-auto grid max-w-2xl grid-cols-1 rounded-lg border border-neutral-200 bg-white lg:max-w-7xl lg:grid-cols-2 dark:border-neutral-800 dark:bg-black">
        <CheckoutCartItemsMobile />
        <CheckoutInfoFormSection />
        <CheckoutCartItems />
      </div>
    </div>
  );
}
