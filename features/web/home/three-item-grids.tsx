import { getCollectionProducts } from "@/shopify";
import { ThreeItemGridItem } from "../grid/three-items";

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
