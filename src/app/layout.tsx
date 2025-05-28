import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "WEEBUR",
  description: "워크샵은 원래 재밌다, 위버",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  );
}
