/** biome-ignore-all lint/nursery/noShadow: <explanation> */
/** biome-ignore-all lint/performance/noAccumulatingSpread: <explanation> */
"use client";

import clsx from "clsx";
import type { ProductOption, ProductVariant } from "@/shopify/types";
import { useProduct, useUpdateURL } from "./product-context";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateUrl = useUpdateURL();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        [option.name.toLowerCase()]: option.value,
        ...accumulator,
      }),
      {}
    ),
  }));

  return options.map((option) => (
    <form key={option.id}>
      <dl className="mb-8">
        <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
        <dd className="flex flex-wrap gap-3">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();

            // Base option params on current selectedOptions so we can preserve any other param state.
            const optionParams = { ...state, [optionNameLowerCase]: value };

            // Filter out invalid options and check if the option combination is available for sale.
            const filtered = Object.entries(optionParams).filter(
              ([key, value]) =>
                options.find(
                  (option) =>
                    option.name.toLowerCase() === key &&
                    option.values.includes(value)
                )
            );
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) =>
                  combination[key] === value && combination.availableForSale
              )
            );

            // The option is active if it's in the selected options.
            const isActive = state[optionNameLowerCase] === value;

            return (
              <button
                aria-disabled={!isAvailableForSale}
                className={clsx(
                  "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900",
                  {
                    "cursor-default ring-2 ring-blue-600": isActive,
                    "ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-blue-600":
                      !isActive && isAvailableForSale,
                    "before:-z-10 before:-rotate-45 relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:h-px before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 dark:before:bg-neutral-700":
                      !isAvailableForSale,
                  }
                )}
                disabled={!isAvailableForSale}
                formAction={() => {
                  const newState = updateOption(optionNameLowerCase, value);
                  updateUrl(newState);
                }}
                key={value}
                title={`${option.name} ${value}${isAvailableForSale ? "" : " (Out of Stock)"}`}
                type="submit"
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}
