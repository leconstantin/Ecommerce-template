"use client";
import Autoplay from "embla-carousel-autoplay";
import type { Route } from "next";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { GridTileImage } from "@/features/web/grid/tile";
import type { Product } from "@/shopify/types";
export default function CarouselCards({
  carouselProducts,
}: {
  carouselProducts: Product[];
}) {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {carouselProducts.map((product, i) => (
          <CarouselItem
            className="md:basis-1/2 lg:basis-1/3"
            key={`${product.handle}${i}`}
          >
            <div className="relative aspect-square h-[30vh] max-h-[275px] w-full flex-none">
              <Link
                className="relative aspect-square h-full w-full"
                href={`/product/${product.handle}` as unknown as Route}
              >
                <GridTileImage
                  alt={product.title}
                  fill
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode:
                      product.priceRange.maxVariantPrice.currencyCode,
                  }}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  src={product.featuredImage?.url}
                />
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
