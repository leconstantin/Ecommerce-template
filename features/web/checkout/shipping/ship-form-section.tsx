"use client";
import { useRouter } from "next/navigation";
import BreadCrumbCheckout from "../bread-crumb";
import ContactShipSummary from "../contact-ship-summary";
import ShipPrice from "./ship-price";

export default function CheckoutShippingFormSection() {
  const router = useRouter();
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
        onChangeShipping={() => router.push("/checkout/information")}
      />
      <ShipPrice />
      {/* <InfoForm /> */}
    </div>
  );
}
