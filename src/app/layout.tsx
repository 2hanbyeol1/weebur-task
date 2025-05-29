import type { Metadata } from "next";
import localFont from "next/font/local";

import Header from "@/components/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: "WEEBUR",
  description: "워크샵은 원래 재밌다, 위버",
};

const pretendard = localFont({
  src: "../../public/font/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className="font-pretendard">
        <Header />
        <main className="mx-auto mt-16 w-full max-w-[1200px] px-2">
          {children}
        </main>
      </body>
    </html>
  );
}
