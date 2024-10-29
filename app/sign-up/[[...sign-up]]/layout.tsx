import type { Metadata } from "next";
import "../globals.css";

import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Wicked Whimsy Craft - Admin Dashboard",
  description: "Knit, Crochet, and Fiber Arts Online Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="flex max-lg:flex-col text-green-2">
            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
