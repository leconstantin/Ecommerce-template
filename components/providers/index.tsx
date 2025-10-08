"use client";

import { AppProgressProvider } from "@bprogress/next";
import type React from "react";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <AppProgressProvider
        color="var(--foreground)"
        delay={500}
        height="2px"
        options={{ showSpinner: false }}
      >
        {children}
      </AppProgressProvider>
    </ThemeProvider>
  );
}
