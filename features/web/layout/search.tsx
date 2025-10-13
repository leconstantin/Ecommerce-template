"use client";

import { SearchIcon } from "lucide-react";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export default function Search({ onSubmit }: { onSubmit?: () => void }) {
  const searchParams = useSearchParams();

  return (
    <Form
      action="/search"
      className="relative w-full w-max-[550px] lg:w-80 xl:w-full"
      onSubmit={onSubmit}
    >
      <input
        autoComplete="off"
        className="w-full rounded-lg border bg-white px-4 py-2 text-black text-md placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        defaultValue={searchParams?.get("q") || ""}
        key={searchParams?.get("q")}
        name="q"
        placeholder="Search for products..."
        type="text"
      />
      <div className="absolute top-0 right-0 mr-3 flex h-full items-center">
        <SearchIcon className="h-4" />
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full w-max-[550px] lg:w-80 xl:w-full">
      <input
        className="w-full rounded-lg border bg-white px-4 py-2 text-black text-sm placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        placeholder="Search for products..."
      />
      <div className="absolute top-0 right-0 mr-3 flex h-full items-center">
        <SearchIcon className="h-4" />
      </div>
    </form>
  );
}
