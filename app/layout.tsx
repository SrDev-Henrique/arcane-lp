import ClientSideScrollRestorer from "@/components/ScrollRestoration";
import Navbar from "@/components/Navbar";
import TransitionComponent from "@/components/TransitionComponent";

import { MenuProvider } from "@/contexts/MenuContext";
import { TransitionProvider } from "@/contexts/TransitionContext";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientSideScrollRestorer />
        <MenuProvider>
          <Navbar />
          <TransitionProvider>
            <TransitionComponent>{children}</TransitionComponent>
          </TransitionProvider>
        </MenuProvider>
      </body>
    </html>
  );
}
