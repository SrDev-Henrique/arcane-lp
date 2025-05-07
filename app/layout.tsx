import ClientSideScrollRestorer from "@/utils/ScrollRestoration";

import { MenuProvider } from "@/contexts/MenuContext";

import ConditionalNavbar from "@/components/ConditionalNavBar";
import LenisProvider from "@/components/LenisProvider";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arcane",
  description: "Criado por SrDev-Henrique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      {/* <head>
        <script
          async
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      </head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<div>Carregando...</div>}>
          <ClientSideScrollRestorer />
          <MenuProvider>
            <LenisProvider>
              <ConditionalNavbar />
              {children}
            </LenisProvider>
          </MenuProvider>
        </Suspense>
      </body>
    </html>
  );
}