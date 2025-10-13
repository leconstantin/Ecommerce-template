"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { GridTileImage } from "../grid/tile";
import { useProduct, useUpdateURL } from "./product-context";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const { state, updateImage } = useProduct();
  const updateUrl = useUpdateURL();
  const imageIndex = state.image ? Number.parseInt(state.image, 10) : 0;

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const buttonClassName =
    "h-full px-6 transition-all cursor-pointer ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

  return (
    <form className="flex flex-col-reverse items-center md:flex-row">
      {images.length > 1 ? (
        <ul className="overflow-none mt-12 mb-12 flex flex-wrap items-center justify-center gap-2 py-1 md:flex-col lg:mb-0">
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li className="h-20 w-20" key={image.src}>
                <button
                  aria-label="Select product image"
                  className="h-full w-full cursor-pointer"
                  formAction={() => {
                    const newState = updateImage(index.toString());
                    updateUrl(newState);
                  }}
                  type="submit"
                >
                  <GridTileImage
                    active={isActive}
                    alt={image.altText}
                    height={80}
                    src={image.src}
                    width={80}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {images[imageIndex] && (
          <Image
            alt={images[imageIndex]?.altText as string}
            className="h-full w-full object-contain"
            fill
            priority={true}
            sizes="(min-width: 1024px) 66vw, 100vw"
            src={images[imageIndex]?.src as string}
          />
        )}

        {images.length > 1 ? (
          <div className="absolute bottom-[0%] flex w-full justify-center md:bottom-[15%]">
            <div className="mx-auto flex h-10 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur-sm md:h-11 dark:border-black dark:bg-neutral-900/80">
              <button
                aria-label="Previous product image"
                className={buttonClassName}
                formAction={() => {
                  const newState = updateImage(previousImageIndex.toString());
                  updateUrl(newState);
                }}
                type="submit"
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500" />
              <button
                aria-label="Next product image"
                className={buttonClassName}
                formAction={() => {
                  const newState = updateImage(nextImageIndex.toString());
                  updateUrl(newState);
                }}
                type="submit"
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}
