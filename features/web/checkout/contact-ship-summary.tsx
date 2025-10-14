import { DotIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Price from "../_components/price";

type Address = {
  city: string;
  state: string;
  zip: string;
  country?: string;
};
type Shipping = {
  type: string;
  amount: number;
};

type Props = {
  email: string;
  address: Address;
  shipping?: Shipping;
  onChangeContact?: () => void; // opens contact modal / page
  onChangeShipping?: () => void; // opens shipping modal / page
  onChangeMehod?: () => void;
};

export default function ContactShipSummary({
  email,
  address,
  shipping,
  onChangeContact,
  onChangeShipping,
  onChangeMehod,
}: Props) {
  const formattedAddress = `${address.city}, ${address.state} ${address.zip}${
    address.country ? `, ${address.country}` : ""
  }`;

  return (
    <div className="my-10 w-full max-w-2xl rounded-lg border bg-transparent p-4 dark:border-[#33333]">
      <div className="flex items-center justify-between border-muted border-b pb-3">
        <div>
          <p className="text-muted-foreground text-sm">Contact</p>
          <p className="truncate text-sm" title={email}>
            {email}
          </p>
        </div>

        <Button
          aria-label="Change shipping address"
          className="text-blue-500"
          onClick={onChangeContact}
          variant={"link"}
        >
          Change
        </Button>
      </div>

      <div className="flex items-center justify-between pt-3">
        <div>
          <p className="text-muted-foreground text-sm">Ship to</p>
          <p className="truncate text-sm" title={formattedAddress}>
            {formattedAddress}
          </p>
        </div>

        <Button
          aria-label="Change shipping address"
          className="text-blue-500"
          onClick={onChangeShipping}
          variant={"link"}
        >
          Change
        </Button>
      </div>
      {shipping && (
        <div className="flex items-center justify-between border-t pt-3">
          <div>
            <p className="text-muted-foreground text-sm">Shipping method</p>
            <div className="flex items-center">
              <p className="truncate text-sm" title={shipping.type}>
                Standard
              </p>
              <DotIcon />
              <Price
                amount={shipping.amount.toString()}
                className="text-right text-sm"
                currencyCode="RWF"
              />
            </div>
          </div>

          <Button
            aria-label="Change shipping address"
            className="text-blue-500"
            onClick={onChangeMehod}
            variant={"link"}
          >
            Change
          </Button>
        </div>
      )}
    </div>
  );
}
