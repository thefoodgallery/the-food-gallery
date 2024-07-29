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
