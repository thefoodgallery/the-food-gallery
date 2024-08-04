"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import PageFooter from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import SocialLinks from "@/components/social-links";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("flowbite").then((module) => module.initFlowbite());
      import("flowbite").then((module) => module.initAccordions());
      import("flowbite").then((module) => module.initCarousels());
      import("flowbite").then((module) => module.initCollapses());
      import("flowbite").then((module) => module.initDials());
      import("flowbite").then((module) => module.initDismisses());
      import("flowbite").then((module) => module.initDrawers());
      import("flowbite").then((module) => module.initDropdowns());
      import("flowbite").then((module) => module.initModals());
      import("flowbite").then((module) => module.initPopovers());
      import("flowbite").then((module) => module.initTabs());
      import("flowbite").then((module) => module.initTooltips());
      import("flowbite").then((module) => module.initInputCounters());
      import("flowbite").then((module) => module.initCopyClipboards());
      import("flowbite").then((module) => module.initDatepickers());
    }
  }, []);

  return (
    <html lang="en">
      <title>The Food Gallery 24</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <body className={inter.className}>
        <SocialLinks />
        <SessionProvider>
          <Navbar />
          <main>
            <div className="w-full hidden md:flex items-center md:space-x-8 lg:space-x-16 justify-center mt-3 mb-5">
              <Link className="md:text-sm lg:text-xl font-bold" href={"/"}>
                HOME
              </Link>
              <Link className="tmd:text-sm lg:text-xl font-bold" href={"/menu"}>
                MENU
              </Link>
              <Link
                className="tmd:text-sm lg:text-xl font-bold"
                href={"/order-online"}
              >
                ORDER
              </Link>
              <Link
                className="tmd:text-sm lg:text-xl font-bold"
                href={"/blogs"}
              >
                BLOGS
              </Link>
              <Link
                className="tmd:text-sm lg:text-xl font-bold"
                href={"/about"}
              >
                ABOUT US
              </Link>
              <Link
                className="tmd:text-sm lg:text-xl font-bold"
                href={"/testimonals"}
              >
                TESTIMONALS
              </Link>
            </div>
            {children}
          </main>
          <PageFooter />
        </SessionProvider>
      </body>
    </html>
  );
}
