import type { Metadata } from "next";
import CheckoutCartItems from "@/features/web/checkout/cart-items";
import CheckoutCartItemsMobile from "@/features/web/checkout/cart-items-mobile";
import CheckoutPaymentSection from "@/features/web/checkout/payment/payment-section";

export const metadata: Metadata = {
  title: "Payment - Checkout",
  description: "Choose your payment type to pay for your products.",
};

export default function CheckOutPaymentPage() {
  return (
    <div className="relative mx-auto w-full max-w-[1536px] px-0 py-4 md:px-4">
      <div className="relative mx-auto grid max-w-2xl grid-cols-1 rounded-lg border border-neutral-200 bg-white lg:max-w-7xl lg:grid-cols-2 dark:border-neutral-800 dark:bg-black">
        <CheckoutCartItemsMobile />
        <CheckoutPaymentSection />
        <CheckoutCartItems />
      </div>
    </div>
  );
}
