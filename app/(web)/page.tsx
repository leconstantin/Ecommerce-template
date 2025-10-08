import type { Metadata } from "next";
import Link from "next/link";
import { ThreeItemGrid } from "@/features/web/grid/three-items";

export const metadata: Metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <ThreeItemGrid />
      <p>web page</p>
      <Link href="/dashboard"> dashboard</Link>
    </>
  );
}
