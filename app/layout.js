import React from "react";
import { Inter } from "next/font/google";
import { PromoBar, Navbar } from "../page-components";

import "./_globals.scss";
import "styles/_globals.scss";

export const dynamic = "force-static";

export const metadata = {
  title: "Waba",
  description: "Waba",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="sticky top-0 z-10">
          <PromoBar />
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
