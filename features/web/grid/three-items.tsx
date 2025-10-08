import type { Route } from "next";
import Link from "next/link";
import { GridTileImage } from "@/features/web/grid/tile";
import { getCollectionProducts } from "@/shopify";
import type { Product } from "@/shopify/types";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}` as unknown as Route}
        prefetch={true}
      >
        <GridTileImage
          alt={item.title}
          fill
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode,
          }}
          priority={priority}
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          src={item.featuredImage.url}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: "frontpage",
  });

  if (!(homepageItems[0] && homepageItems[1] && homepageItems[2])) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid w-full max-w-(--breakpoint-2xl) gap-4 p-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem item={firstProduct} priority={true} size="full" />
      <ThreeItemGridItem item={secondProduct} priority={true} size="half" />
      <ThreeItemGridItem item={thirdProduct} size="half" />
    </section>
  );
}
