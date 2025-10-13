"use client";
import { MenuIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Menu } from "@/shopify/types";
import Search, { SearchSkeleton } from "./search";

const { SITE_NAME } = process.env;

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button size={"icon-lg"} variant={"outline"}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>Menu - {SITE_NAME}</SheetTitle>
          <SheetDescription>
            Explore our products and find what you need.For any questions,
            please contact us.
          </SheetDescription>
        </SheetHeader>
        <div className="w-full p-4">
          <Suspense fallback={<SearchSkeleton />}>
            <Search onSubmit={() => setOpen(false)} />
          </Suspense>
        </div>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            {menu.map((item) => (
              <Link href={item.path as Route} key={item.title}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Cart</Button>
          <SheetClose asChild>
            <Button variant="outline">Contact us</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
