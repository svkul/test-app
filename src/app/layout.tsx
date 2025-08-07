import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Testtask",
  description: "ABZ Test App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${nunito.variable} antialiased`}>
        <Header />

        {children}
      </body>
    </html>
  );
}
