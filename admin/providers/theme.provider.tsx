"use client";

import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { ColorSchemeScript } from "@mantine/core";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Render children without ThemeProvider during SSR
  }

  return (
    <>
      <ColorSchemeScript />
      <NextThemesProvider {...props} attribute="data-mantine-color-scheme">
        {children}
      </NextThemesProvider>
    </>
  );
}
