// app/providers.jsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import {  useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import NavbarTRC from "./components/navbar";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }) {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const { theme } = useTheme();
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const pathLink = "/" + pathParts[1];

  useEffect(() => {
    // Update the theme whenever it changes
    setCurrentTheme(theme);
  }, [theme]);

  return (
    <NextUIProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        <SessionProvider>
          {pathLink != "/login" && <NavbarTRC />}

          {children}
        </SessionProvider>  
        <Toaster />
      </ThemeProvider>
    </NextUIProvider>
  );
}
