import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import NavbarTRC from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TRC - Sistema de Recursos Humanos",
  description: "TRC- Sistema de Recursos Humanos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="container mx-auto my-auto mt-10 w-4/5 h-3/4">
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
