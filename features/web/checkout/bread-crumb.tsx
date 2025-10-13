"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadCrumbCheckout() {
  const pathname = usePathname();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage
            className={
              pathname === "/checkout/information"
                ? "font-semibold"
                : "text-muted-foreground"
            }
          >
            Information
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage
            className={
              pathname === "/checkout/shipping"
                ? "font-semibold"
                : "text-muted-foreground"
            }
          >
            Shipping
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage
            className={
              pathname === "/checkout/payment"
                ? "font-semibold"
                : "text-muted-foreground"
            }
          >
            Payment
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
