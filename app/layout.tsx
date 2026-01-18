import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const mochiBoom = localFont({
  src: "../public/fonts/Mochi Boom DEMO.ttf",
  variable: "--font-mochi-boom",
  display: "swap",
})

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

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
        className={`${mochiBoom.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
