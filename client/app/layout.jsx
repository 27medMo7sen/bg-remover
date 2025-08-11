import { Providers } from "@/lib/providers";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import React from "react";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.svg" />
      </head>
      <body className="flex flex-col items-center min-h-screen bg-gray-900">
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
