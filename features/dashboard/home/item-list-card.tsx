import { format } from "date-fns";
import { FilePenLineIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ItemCardActions } from "./item-card-actions";

export default function ItemListCard() {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 rounded-lg p-4 leading-5 shadow-2xs ring-1 ring-ring/20 hover:ring xl:flex-row xl:items-center dark:ring-ring/40 [&_a]:z-10 [&_button]:z-10"
      )}
    >
      <div className="mr-24 flex min-w-0 flex-row items-center gap-4 xl:mr-0 xl:w-[calc(25%+48px)]">
        <Image
          alt="product image"
          className="hidden aspect-square size-10 rounded-sm dark:block"
          height={40}
          src="/shirt-white.avif"
          width={40}
        />
        <Image
          alt="product image"
          className="aspect-square size-10 rounded-sm dark:hidden"
          height={40}
          src="/shirt-black.avif"
          width={40}
        />
        <div className="flex flex-col gap-0.5">
          <Link className="font-medium text-sm" href="/">
            Acme Drawstring Bag
          </Link>
          <div className="flex items-center gap-1">
            <p className="text-muted-foreground text-sm">White / Short</p>
          </div>
        </div>
      </div>
      <div className="order-2 flex min-w-0 flex-1 flex-col justify-between gap-0.5 xl:order-1">
        <div className="flex items-center gap-1">
          <FilePenLineIcon className="size-4 text-muted-foreground" />

          <p className="font-medium text-sm capitalize tracking-tight">
            Pending
          </p>
        </div>
        <p className="text-muted-foreground text-sm">
          An order placed on{" "}
          {format(new Date("2025-07-25T15:30:00Z"), "dd MMM yyyy")}
        </p>
      </div>
      <div className="order-1 flex h-5 w-fit items-center gap-2">
        <p className="text-muted-foreground text-sm">
          <span className="font-medium">Placed by</span>{" "}
          <span className="font-semibold text-primary">Leo Constantin</span>
        </p>
      </div>
      <div className="absolute top-[21px] right-4 order-1 flex shrink-0 flex-row gap-4 xl:static">
        <ItemCardActions />
      </div>
    </div>
  );
}
