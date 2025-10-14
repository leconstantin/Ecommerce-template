import { BanknoteXIcon, ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentOPtions() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-foreground text-xl tracking-tight">
          Payment
        </h3>
        <p className="text-muted-foreground">
          All transactions are secure and encrypted.
        </p>
      </div>
      <div className="flex min-h-56 flex-col items-center justify-center gap-5 rounded-lg bg-muted p-6">
        <BanknoteXIcon className="size-10 text-muted-foreground" />
        <p className="text-muted-foreground text-sm tracking-tight">
          This store can&apos;t accept payments right now.
        </p>
      </div>

      <div className="flex w-full justify-between">
        <Button asChild size="lg" variant={"link"}>
          <Link href="/checkout/shipping">
            <ChevronLeftIcon />
            Return to Shipping
          </Link>
        </Button>
        <Button disabled size="lg" type="submit">
          Pay
        </Button>
      </div>
    </section>
  );
}
