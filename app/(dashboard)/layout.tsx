import type { Metadata } from "next";
import "../globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import LeftSideBar from "../../components/layout/LeftSideBar";
import TopBar from "../../components/layout/TopBar";
import ToasterProvider from "@/lib/ToasterProvider";

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
          <ToasterProvider />
          <div className="flex max-lg:flex-col text-green-2">
            <LeftSideBar />
            <TopBar />
            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
