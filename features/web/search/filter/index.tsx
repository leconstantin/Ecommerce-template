import { Suspense } from "react";
import type { SortFilterItem } from "@/shopify/constants";
import FilterItemDropdown from "./dropdown";
import { FilterItem } from "./item";

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem item={item} key={i} />
      ))}
    </>
  );
}

export default function FilterList({
  list,
  title,
}: {
  list: ListItem[];
  title?: string;
}) {
  return (
    <nav>
      {title ? (
        <h3 className="hidden text-neutral-500 text-xs md:block dark:text-neutral-400">
          {title}
        </h3>
      ) : null}
      <ul className="hidden md:block">
        <Suspense fallback={null}>
          <FilterItemList list={list} />
        </Suspense>
      </ul>
      <ul className="md:hidden">
        <Suspense fallback={null}>
          <FilterItemDropdown list={list} />
        </Suspense>
      </ul>
    </nav>
  );
}
