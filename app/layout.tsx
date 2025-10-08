import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";

const { SITE_NAME } = process.env;
export const metadata: Metadata = {
  title: {
    default: SITE_NAME ?? "",
    template: `%s | ${SITE_NAME}`,
  },
  description: "E-Shop website Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      lang="en"
      suppressHydrationWarning
    >
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
