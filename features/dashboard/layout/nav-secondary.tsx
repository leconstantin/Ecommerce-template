"use client";

import type { UrlObject } from "node:url";
import type { LucideProps } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type * as React from "react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavSecondary({
  items,
  pathname,
  ...props
}: {
  items: {
    title: string;
    url: string | URL | UrlObject | Route<string>;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }[];
  pathname: string;
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link
                className={
                  pathname === item.url
                    ? "bg-sidebar text-primary"
                    : "text-muted-foreground"
                }
                href={item.url as Route<string>}
              >
                <SidebarMenuButton asChild className="[&>svg]:size-[18px]">
                  <SidebarMenuButton
                    className={
                      pathname === item.url
                        ? "bg-sidebar text-primary"
                        : "text-muted-foreground"
                    }
                  >
                    <item.icon
                      className={
                        pathname === item.url
                          ? "text-blue-600"
                          : "text-muted-foreground"
                      }
                    />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
