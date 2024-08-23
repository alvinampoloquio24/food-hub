/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  profile: string;
}

export default function Nav() {
  const pathname = usePathname();
  const user: any = localStorage.getItem("user");
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const [topStyle, setTopStyle] = useState<string | undefined>(undefined);

  const getLinkClassName = (path: string): string => {
    const baseClasses = "hover:text-blue-500 transition-colors duration-200";
    if (path === "/") {
      return pathname === path
        ? `${baseClasses} text-base-dark font-bold border-b border-base-dark`
        : baseClasses;
    }
    return pathname.startsWith(path)
      ? `${baseClasses} text-base-dark font-bold`
      : baseClasses;
  };

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = 100; // Adjust this value to control how quickly the logo disappears
      const progress = Math.min(scrollTop / maxScroll, 1);
      setScrollProgress(progress);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setTopStyle(undefined);
      } else {
        setTopStyle(`${Math.max(0, 56 * (1 - scrollProgress))}px`);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    // Initial resize check
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [scrollProgress]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const mobileLogoStyle = {
    transform: `translateY(-${scrollProgress * 100}%) scale(${
      1 - scrollProgress
    })`,
    opacity: 1 - scrollProgress,
  };

  return (
    <>
      <div
        className="p-4 bg-base-white  md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out origin-top"
        style={mobileLogoStyle}
      >
        Logo MOBILE
      </div>
      <nav
        className={`bg-base-white text-color flex justify-between md:px-4  px-2 md:text-lg text-xs content-center border-b-2 sticky top-0 z-40 transition-all duration-300 ease-out`}
        style={{ top: topStyle }}
      >
        <div className="font-bold text-lg md:block hidden md:py-4">LOGO</div>

        <ul className="md:space-x-8 text-lg flex space-x-1 md:justify-center justify-between items-center flex-grow">
          <li>
            <Link href="/" className={getLinkClassName("/")}>
              <p className="py-2 md:py-4">Home</p>
            </Link>
          </li>
          <li>
            <Link href="/recipe" className={getLinkClassName("/recipe")}>
              <p className="py-2 md:py-4">Recipe</p>
            </Link>
          </li>
          <li>
            <Link href="/blog" className={getLinkClassName("/blog")}>
              <p className="py-2 md:py-4">Blog</p>
            </Link>
          </li>
          <li>
            <Link
              href="/spoonacular"
              className={getLinkClassName("/spoonacular")}
            >
              <p className="py-2 md:py-4">Spoonacular</p>
            </Link>
          </li>
          <li>
            <Link href="/about" className={getLinkClassName("/about")}>
              <p className="py-2 md:py-4">About</p>
            </Link>
          </li>
        </ul>

        {isClient && (
          <div
            className="relative md:flex hidden justify-end items-center"
            ref={dropdownRef}
          >
            {!user ? (
              <div className="space-x-2 text-md flex justify-center items-center">
                <button
                  onClick={() => router.push("account/login")}
                  className="rounded bg-base-dark text-white px-3 p-1 cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("account/create-account")}
                  className="rounded bg-gray-300 px-3 p-1 cursor-pointer"
                >
                  Register
                </button>
              </div>
            ) : (
              <>
                <div
                  className="space-x-3 flex justify-center items-center cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <img
                    src={user.profile}
                    alt=""
                    className="object-cover h-8 w-8 rounded-full"
                  />
                  <p className="lg:flex hidden">{user.name}</p>
                </div>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
