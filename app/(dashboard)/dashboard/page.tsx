import type { Metadata } from "next";
import { SectionCards } from "@/features/dashboard/home/cards";
import NewOrders from "@/features/dashboard/home/new-orders";
import { SiteHeader } from "@/features/dashboard/layout/site-header";

export const metadata: Metadata = {
  title: "Dashboard Page",
  description: "Dashboard",
};

export default function DashboardPage() {
  return (
    <main>
      <SiteHeader title="Dashboard" />
      <div className="@container/main flex flex-1 flex-col gap-2 p-4 md:p-6">
        <SectionCards />
        <NewOrders />
      </div>
    </main>
  );
}
