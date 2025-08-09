import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

import { cookies } from "next/headers";

import QueryProvider from "@/components/QueryProvider";
import { Header } from "@/components/header/Header";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Testtask",
  description: "ABZ Test App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${nunito.variable} antialiased`}>
        <Toaster />

        <QueryProvider tokenFromServer={token}>
          <Header />

          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
