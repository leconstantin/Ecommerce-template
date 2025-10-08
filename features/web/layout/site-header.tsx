// import CartModal from 'components/cart/modal';

import type { Route } from "next";
import Link from "next/link";
import { Suspense } from "react";
import LogoSquare from "@/components/custom/logo-square";
import MobileMenu from "@/features/web/layout/mobile-menu";
import Search, { SearchSkeleton } from "@/features/web/layout/search";
import { getMenu } from "@/shopify/index";
import type { Menu } from "@/shopify/types";
import { CartModal } from "../cart/modal";

const { SITE_NAME } = process.env;

export async function SiteHeader() {
  const menu = await getMenu("frontend-header-menu");

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            href="/"
            prefetch={true}
          >
            <LogoSquare />
            <div className="ml-2 flex-none font-medium text-sm uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                    href={item.path as Route}
                    prefetch={true}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3">
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
