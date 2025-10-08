import { Suspense } from "react";
import Collections from "@/features/web/search/collections";
import FilterList from "@/features/web/search/filter";
import { sorting } from "@/shopify/constants";
import ChildrenWrapper from "./children-wrapper";

export default function SearchLayout(props: LayoutProps<"/search">) {
  return (
    <div className="mx-auto flex w-full max-w-(--breakpoint-2xl) flex-col gap-8 p-4 text-black md:flex-row dark:text-white">
      <div className="order-first w-full flex-none md:max-w-[125px]">
        <Collections />
      </div>
      <div className="order-last min-h-screen w-full md:order-none">
        <Suspense fallback={null}>
          <ChildrenWrapper>{props.children}</ChildrenWrapper>
        </Suspense>
      </div>
      <div className="order-none flex-none md:order-last md:w-[125px]">
        <FilterList list={sorting} title="Sort by" />
      </div>
    </div>
  );
}
