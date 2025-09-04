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
  title: 'Simbees - Strategic Business Simulation',
  description: 'A strategic business simulation game for education and training',
  icons: {
    icon: [
      {
        url: '/SimbeesFavicon-sm.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/SimbeesFavicon.png',
        sizes: '192x192',
        type: 'image/png',
      }
    ],
    shortcut: '/SimbeesFavicon-sm.png',
    apple: '/SimbeesFavicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
