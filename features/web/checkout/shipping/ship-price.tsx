import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Price from "../../_components/price";
import { useShoppingCart } from "../../cart/cart-context";

type TshippingOptions = {
  id: string;
  name: string;
  description: string;
  price: number;
};
export default function ShipPrice() {
  const { setShippingAmount, shipping } = useShoppingCart();
  const router = useRouter();
  const shippingOptions: TshippingOptions[] = [
    {
      id: "economy",
      name: "Economy",
      description: "5 to 8 business days",
      price: 4.9,
    },
    {
      id: "standard",
      name: "Standard",
      description: "3 to 4 business days",
      price: 6.9,
    },
  ];

  const handleContinue = () => {
    if (shipping.amount > 0) {
      router.push("/checkout/payment");
    } else {
      toast("Choose shipping type");
    }
  };
  return (
    <section className="flex flex-col gap-6">
      <h3 className="font-semibold text-foreground text-xl tracking-tight">
        Shipping Method
      </h3>

      <RadioGroup className="grid gap-3" defaultValue="economy">
        {shippingOptions.map((option) => (
          <Label
            className="flex cursor-pointer items-start justify-between gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
            htmlFor={option.id}
            key={option.id}
            onClick={() => setShippingAmount(option.id, option.price)}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                id={option.id}
                value={option.id}
              />
              <div className="space-y-1 font-normal">
                <p className="font-medium text-foreground text-sm leading-none">
                  {option.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {option.description}
                </p>
              </div>
            </div>

            <Price
              amount={option.price.toFixed(2)}
              className="text-right font-semibold text-foreground"
              currencyCode="RWF"
            />
          </Label>
        ))}
      </RadioGroup>

      <div className="flex w-full justify-between">
        <Button asChild size="lg" variant={"link"}>
          <Link href="/checkout/information">
            <ChevronLeftIcon />
            Return to Information
          </Link>
        </Button>
        <Button onClick={handleContinue} size="lg" type="submit">
          Continue to Payment
        </Button>
      </div>
    </section>
  );
}
