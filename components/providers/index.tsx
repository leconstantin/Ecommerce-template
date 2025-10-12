"use client";

import { AppProgressProvider } from "@bprogress/next";
import type React from "react";
import { ShoppingCartProvider } from "@/features/web/cart/cart-context";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <ShoppingCartProvider>
        <AppProgressProvider
          color="var(--foreground)"
          delay={500}
          height="2px"
          options={{ showSpinner: false }}
        >
          {children}
        </AppProgressProvider>
      </ShoppingCartProvider>
    </ThemeProvider>
  );
}
