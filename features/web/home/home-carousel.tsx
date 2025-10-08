import { getCollectionProducts } from "@/shopify";
import CarouselCards from "./carousel-cards";
export async function HomeCarousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({
    collection: "hidden-home-carousel-products",
  });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto px-4 pt-1 pb-6">
      <CarouselCards carouselProducts={carouselProducts} />
    </div>
  );
}
