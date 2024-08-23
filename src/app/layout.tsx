"use client"; // Ensure this file is a client component

import { Inter } from "next/font/google";
import "./globals.css";
import "swiper/css"; // Import Swiper styles

import Footer from "./components/Footer";
import { diphylleia, montserratAlternates } from "./font";
import { SkeletonTheme } from "react-loading-skeleton";
import { AuthProvider } from "@/context/authProvider"; // Import AuthProvider
import { useEffect, useState } from "react";
import Head from "./head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultColors = {
    "base-mid": "#EEEEEE",
    "base-light": "#ffe4c1",
    "base-dark": "#DC5F00",
    "text-color": "#06283D",
    "base-white": "#FFFFFF",
    "base-normal": "#F1DEC6",
  };
  const [theme, setTheme] = useState<any>(defaultColors);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = JSON.parse(localStorage.getItem("theme") || "null");
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-base-mid",
      theme["base-mid"]
    );
    document.documentElement.style.setProperty(
      "--color-base-light",
      theme["base-light"]
    );
    document.documentElement.style.setProperty(
      "--color-base-dark",
      theme["base-dark"]
    );
    document.documentElement.style.setProperty(
      "--color-text-color",
      theme["text-color"]
    );
    document.documentElement.style.setProperty(
      "--color-base-white",
      theme["base-white"]
    );
    document.documentElement.style.setProperty(
      "--color-base-normal",
      theme["base-normal"]
    );
  }, [theme]);

  return (
    <html
      lang="en"
      className={`${inter} ${diphylleia.variable} ${montserratAlternates.variable}`}
    >
      <body className={`text-color font-montserrat-alternates bg-base-white`}>
        <Head />
        <AuthProvider>
          <SkeletonTheme baseColor="#EEEEEE" highlightColor="#FFCC99">
            {children}
          </SkeletonTheme>
        </AuthProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
