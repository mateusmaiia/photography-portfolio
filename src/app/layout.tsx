import type { Metadata } from "next";
import { Expletus_Sans } from "next/font/google";
import "./globals.css";

const expletus = Expletus_Sans({ subsets: ["latin"], variable: '--font-expletus' });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={expletus.className }>
        {children}
      </body>
    </html>
  );
}
