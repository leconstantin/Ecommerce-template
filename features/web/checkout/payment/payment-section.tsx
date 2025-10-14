"use client";
import { useRouter } from "next/navigation";
import { useShoppingCart } from "../../cart/cart-context";
import BreadCrumbCheckout from "../bread-crumb";
import ContactShipSummary from "../contact-ship-summary";
import PaymentOPtions from "./payment-options";

export default function CheckoutPaymentSection() {
  const router = useRouter();
  const { shipping } = useShoppingCart();
  return (
    <div className="border-t px-4 py-6 md:border-t-0 md:border-r md:p-9 dark:border-[#333333]">
      <BreadCrumbCheckout />
      <ContactShipSummary
        address={{
          city: "Springfield",
          state: "CO",
          zip: "81073",
          country: "United States",
        }}
        email="icon69184@gmail.com"
        onChangeContact={() => router.push("/checkout/information")}
        onChangeMehod={() => router.push("/checkout/shipping")}
        onChangeShipping={() => router.push("/checkout/information")}
        shipping={{
          type: shipping.type,
          amount: shipping.amount,
        }}
      />
      <PaymentOPtions />
    </div>
  );
}
