import type { Metadata } from "next";
import { SessionProvider } from 'next-auth/react';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cafe Inmagno",
  description: "cafe y cultura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
    
      {children}
     
      </body>
    </html>
  );
}
