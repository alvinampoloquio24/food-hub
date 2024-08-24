/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { CiCircleInfo, CiForkAndKnife, CiMenuBurger } from "react-icons/ci";
import { IoArrowBack, IoPersonOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useRouter } from "next/navigation";
import { GoHome } from "react-icons/go";
import { PiBookOpenUserLight, PiBowlFoodLight } from "react-icons/pi";
import { HashLoader } from "react-spinners";
import { SlLogout } from "react-icons/sl";
import { AiOutlineSetting } from "react-icons/ai";
import { useAuth } from "@/context/authProvider";
import { MdOutlineStyle } from "react-icons/md";
export default function Nav() {
  const [loading, setLoading] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [menuClicked, setMenuClicked] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const getLinkClassName = (path: string) => {
    const baseClasses =
      "hover:text-orange-600 transition-colors duration-200 md:p-4 py-3 w-full flex-1  flex items-center justify-center";
    if (path === "/") {
      return pathname === path
        ? `${baseClasses}  text-base-dark font-bold border-b-2 border-base-dark `
        : baseClasses;
    }
    return pathname.startsWith(path)
      ? `${baseClasses} text-base-dark font-bold border-b-2 border-base-dark  `
      : baseClasses;
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleContainer = () => {
    setIsOpen(!isOpen);
    setVisible(!visible);
  };
  // try//
  const handleScroll = () => {
    if (!menuClicked) {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      setVisible(isScrollingUp);
      setPrevScrollPos(currentScrollPos);
    }
  };
  const logout = () => {
    setLoading(true);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/account/login");
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      setUser(storedUser);
    }
  }, []);
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      setPrevScrollPos(window.pageYOffset);
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [prevScrollPos, menuClicked]);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);
  return (
    <>
      <nav
        className={`bg-base-white text-color sm:flex sticky  text-text-color items-center justify-between md:px-4   top-0 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        } justify-between flex  content-center shadow`}
      >
        <ul className="lg:flex items-center justify-center hidden">
          <li className="font-bold text-lg">Food-Hub</li>
        </ul>

        <ul className="md:space-x-8 xl:text-lg lg:text-sm flex items-center w-screen md:w-full lg:w-auto">
          <li className={getLinkClassName("/")}>
            <Link href="/">
              <p className="hidden md:flex">Home</p>
              <GoHome className="flex md:hidden text-2xl" />
            </Link>
          </li>
          <li className={getLinkClassName("/recipe")}>
            <Link href="/recipe">
              <p className="hidden md:flex">Recipe</p>
              <PiBowlFoodLight className="flex md:hidden text-2xl" />
            </Link>
          </li>
          <li className={getLinkClassName("/blog")}>
            <Link href="/blog">
              <p className="hidden md:flex">Blog</p>
              <PiBookOpenUserLight className="flex md:hidden text-2xl" />
            </Link>
          </li>
          <li className={getLinkClassName("/spoonacular")}>
            <Link href="/spoonacular">
              <p className="hidden md:flex">Spoonacular</p>
              <CiForkAndKnife className="flex md:hidden text-2xl" />
            </Link>
          </li>
          <li className={getLinkClassName("/about")}>
            <Link href="/about">
              <p className="hidden md:flex">About</p>
              <CiCircleInfo className="flex md:hidden text-2xl" />
            </Link>
          </li>

          <li
            className="hover:text-orange-600 md:hidden transition-colors duration-200 md:p-4 py-3 w-full flex-1 flex items-center justify-center"
            onClick={toggleContainer} // Toggle the container on click
          >
            <CiMenuBurger className="flex md:hidden text-2xl" />
          </li>
        </ul>

        {isClient && (
          <div className="hidden lg:block">
            {!user ? (
              <div className="flex space-x-2 text-md justify-center items-center">
                <button
                  onClick={() => router.push("account/login")}
                  className="rounded bg-base-dark text-white px-3 p-1 cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("account/create-account")}
                  className="rounded bg-gray-300 rouded px-3 p-1 cursor-pointer"
                >
                  Register
                </button>
              </div>
            ) : (
              <div
                onClick={toggleContainer}
                className="flex space-x-3 text-md justify-center items-center"
              >
                <img
                  src={user.profile}
                  alt=""
                  className="object-cover h-8 w-8 rounded-full"
                />
                <p>{user.name}</p>
              </div>
            )}
          </div>
        )}
      </nav>
      <div className="text-text-color bg-base-mid">
        {/* Background overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleContainer} // Close the container when clicking outside
        ></div>

        {/* Sliding container */}
        <div
          className={`fixed inset-y-0 right-0 bg-base-white shadow-lg transform transition-transform duration-300 ${
            isOpen
              ? "translate-x-0 w-1/2 md:w-1/6"
              : "translate-x-full w-1/2 md:w-1/6"
          } z-50`}
        >
          <div className="md:p-4 p-2 flex justify-between items-center ">
            <IoArrowBack
              onClick={toggleContainer}
              className="text-xl font-semibold"
            />
            <p className="text-center font-bold md:text-2xl text-lg">
              Food-Hub
            </p>
            <p></p>
          </div>
          <div className="text-xs md:text-sm">
            {isClient && user ? (
              <>
                <div
                  onClick={toggleContainer}
                  className="flex space-x-3 text-md  p-3 items-center"
                >
                  <img
                    src={user.profile}
                    alt=""
                    className="object-cover h-8 w-8 rounded-full"
                  />
                  <p className="font-semibold">{user.name}</p>
                </div>
                <Link href={"/profile"}>
                  <div className="md:p-4 p-3 flex gap-2  md:gap-4 items-center transition-all duration-300 hover:bg-base-light hover:-translate-x-1 cursor-pointer">
                    <IoPersonOutline className="text-2xl items-center" />
                    Profile
                  </div>
                </Link>
                <Link href={"/my-recipe"}>
                  <div className="md:p-4 p-3 flex gap-2 md:gap-4 items-center transition-all duration-300 hover:bg-base-light hover:-translate-x-1 cursor-pointer">
                    <PiBowlFoodLight className="text-2xl items-center" />
                    My Recipe
                  </div>
                </Link>
                <Link href={"/manage-account"}>
                  <div className="md:p-4 p-3 flex gap-2 md:gap-4 items-center transition-all duration-300 hover:bg-base-light hover:-translate-x-1 cursor-pointer">
                    <AiOutlineSetting className="text-2xl items-center" />
                    Manage Account
                  </div>
                </Link>
                <Link href={"/theme"}>
                  <div className="md:p-4 p-3 flex gap-2 md:gap-4 items-center transition-all duration-300 hover:bg-base-light hover:-translate-x-1 cursor-pointer">
                    <MdOutlineStyle className="text-2xl items-center" />
                    Themes
                  </div>
                </Link>
                <div
                  onClick={() => {
                    logout();
                  }}
                  className="md:p-4 p-3  border-t  mt-3 flex gap-2 md:gap-4 items-center transition-all duration-300 hover:bg-base-light hover:-translate-x-1 cursor-pointer"
                >
                  <SlLogout className="text-lg items-center" />
                  Logout
                </div>
              </>
            ) : (
              <div className="flex space-x-2 text-md justify-center items-center mt-4">
                <button
                  onClick={() => router.push("account/login")}
                  className="rounded bg-base-dark text-white px-3 p-1 cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("account/create-account")}
                  className="rounded bg-gray-300 rouded px-3 p-1 cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 gap-3 flex items-center justify-center bg-base-white bg-opacity-70 backdrop-blur-lg z-50">
          <HashLoader color="#fc8000" />
          <p>Loging out...</p>
        </div>
      )}
    </>
  );
}
