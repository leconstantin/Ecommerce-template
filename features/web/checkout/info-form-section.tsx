import BreadCrumbCheckout from "./bread-crumb";
import { InfoForm } from "./info-form";

export default function CheckoutInfoFormSection() {
  return (
    <div className="border-r border-r-[#333333] p-9">
      <BreadCrumbCheckout />
      <InfoForm />
    </div>
  );
}
