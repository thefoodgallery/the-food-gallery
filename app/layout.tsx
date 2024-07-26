"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import PageFooter from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import SocialLinks from "@/components/social-links";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // import("flowbite");
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
          <main>{children}</main>
          <PageFooter />
        </SessionProvider>
      </body>
    </html>
  );
}
