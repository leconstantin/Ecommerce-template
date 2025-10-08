import type { Metadata } from "next";
import { HomeCarousel } from "@/features/web/home/home-carousel";
import { ThreeItemGrid } from "@/features/web/home/three-item-grids";

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
      <HomeCarousel />
    </>
  );
}
