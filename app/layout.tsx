import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const mochiBoom = localFont({
  src: "../public/fonts/Mochi Boom DEMO.ttf",
  variable: "--font-mochi-boom",
  display: "swap",
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yakba Learning Center",
  description: "Yakba Learning Center - Bercerita, Bermain, Bernyanyi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mochiBoom.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
