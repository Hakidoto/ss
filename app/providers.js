// app/providers.jsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import NavbarTRC from "./components/navbar";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        themes={["light", "dark", "modern"]}
      >
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
