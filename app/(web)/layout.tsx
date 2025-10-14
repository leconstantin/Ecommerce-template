import { SiteFooter } from "@/features/web/layout/site-footer";
import { SiteHeader } from "@/features/web/layout/site-header";

export default function WebLayout(props: LayoutProps<"/">) {
  return (
    <div className="relative z-10 flex min-h-svh flex-col bg-background dark:bg-black">
      <SiteHeader />
      <main className="relative flex min-h-svh flex-1 flex-col items-center justify-center bg-muted selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        {props.children}
      </main>
      <SiteFooter />
    </div>
  );
}
