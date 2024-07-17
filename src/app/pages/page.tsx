/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Nav() {
  const [menuBtn, setMenuBtn] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [menuClicked, setMenuClicked] = useState(false);

  const handleScroll = () => {
    if (!menuClicked) {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      setVisible(isScrollingUp);
      setPrevScrollPos(currentScrollPos);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrevScrollPos(window.pageYOffset);
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [prevScrollPos, menuClicked]);

  const toggleMenuVisibility = () => {
    setMenuBtn((prevMenuBtn) => !prevMenuBtn);
    setMenuClicked(true);
    setTimeout(() => setMenuClicked(false), 300); // Adjust the timeout duration as needed
  };

  return (
    <>
      <nav
        className={`bg-white sm:flex sticky top-0 z-50 transition-transform duration-300 ${
          !menuBtn ? `justify-between p-3` : `justify-center`
        } flex sm:p-6 content-center border-b-2 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ul className="flex items-center justify-center">
          {!menuBtn && <li className="font-bold text-lg">LOGO</li>}
        </ul>

        <ul className="space-x-8 text-lg hidden sm:flex">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/recipe">Recipe</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
        </ul>
        <ul className="sm:flex space-x-5 text-md hidden justify-center items-center">
          <li>
            <FaFacebookF />
          </li>
          <li>
            <FaInstagram />
          </li>
          <li>
            <FaTwitter />
          </li>
        </ul>
        {!menuBtn && (
          <button
            onClick={toggleMenuVisibility}
            className="flex sm:hidden text-lg p-1"
          >
            <CiMenuKebab />
          </button>
        )}
        {menuBtn && (
          <div
            className={`bg-white flex flex-col h-72 w-full justify-between sm:hidden transform transition-transform duration-300 ${
              menuBtn ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="flex justify-between items-center p-3 bg-white">
              <div className="font-bold text-lg">LOGO</div>
              <button
                onClick={toggleMenuVisibility}
                className="flex sm:hidden text-lg p-1"
              >
                <IoCloseSharp />
              </button>
            </div>

            <ul className="flex justify-center items-center text-lg flex-col">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/Recipe">Recipe</Link>
              </li>
              <li>
                <Link href="/Blog">Blog</Link>
              </li>
              <li>
                <Link href="/Contact">Contact</Link>
              </li>
              <li>
                <Link href="/About">About Us</Link>
              </li>
            </ul>
            <ul className="flex justify-center gap-6 text-lg mb-4">
              <li>
                <FaFacebookF />
              </li>
              <li>
                <FaInstagram />
              </li>
              <li>
                <FaTwitter />
              </li>
            </ul>
          </div>
        )}
      </nav>

      <Footer />
    </>
  );
}
