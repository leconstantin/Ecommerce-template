import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/dashboard/layout/app-sidebar";

// No need to import LayoutProps - globally available
export default function DashboardLayout(props: LayoutProps<"/">) {
  return (
    <SidebarProvider
      className="has-data-[variant=inset]:bg-sidebar dark:has-data-[variant=inset]:bg-background"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>{props.children}</SidebarInset>
    </SidebarProvider>
  );
}
