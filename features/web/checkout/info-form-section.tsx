import BreadCrumbCheckout from "./bread-crumb";
import { InfoForm } from "./info-form";

export default function CheckoutInfoFormSection() {
  return (
    <div className="border-[#333333] border-t px-4 py-6 md:border-t-0 md:border-r md:p-9">
      <BreadCrumbCheckout />
      <InfoForm />
    </div>
  );
}
