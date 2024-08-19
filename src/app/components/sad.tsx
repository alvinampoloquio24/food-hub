"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillSetting, AiOutlineSetting } from "react-icons/ai";
import { PiBowlFood, PiBowlFoodFill } from "react-icons/pi";
import { SlLogout } from "react-icons/sl";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/authProvider";
import BackButton from "../props/backButton";
import {
  RiAccountCircleFill,
  RiAccountCircleLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import {
  MdManageAccounts,
  MdOutlineManageAccounts,
  MdOutlineStyle,
  MdStyle,
} from "react-icons/md";

export default function ProfileNavigation() {
  const { user, isLoggedIn } = useAuth();
  const [selected, setSelected] = useState("");
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  const logout = () => {
    setLoading(true);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user-storage");
      router.push("/account/login");
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const getLinkClassName = (path: string) => {
    const baseClasses =
      "md:p-4 p-3 flex gap-2 md:gap-4 items-center transition-all duration-300 hover:bg-base-light hover:-translate-x-1 cursor-pointer";

    return pathname.startsWith(path)
      ? `${baseClasses} text-base-dark font-bold hover:-translate-x-0 hover:bg-base-mid`
      : baseClasses;
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="col-span-2 bg-base-mid h-screen overflow-hidden">
      <BackButton />
      <div className="py-16">
        {user && (
          <div className="flex space-x-3 text-md p-3 items-center mb-6">
            <img
              src={user.profile}
              alt=""
              className="object-cover h-8 w-8 rounded-full"
            />
            <p className="font-semibold text-lg">{user.name}</p>
          </div>
        )}
        <ul className="flex flex-col">
          <Link href="/profile">
            <li className={getLinkClassName("/profile")}>
              {selected === "/profile" ? (
                <RiAccountCircleFill className="text-2xl items-center" />
              ) : (
                <RiAccountCircleLine className="text-2xl items-center" />
              )}
              <p>Profile</p>
            </li>
          </Link>
          <Link href="/my-recipe">
            <li className={getLinkClassName("/my-recipe")}>
              {selected === "/my-recipe" ? (
                <PiBowlFoodFill className="text-2xl items-center" />
              ) : (
                <PiBowlFood className="text-2xl items-center" />
              )}
              My Recipe
            </li>
          </Link>
          <Link href="/manage-account">
            <li className={getLinkClassName("/manage-account")}>
              {selected === "/manage-account" ? (
                <MdManageAccounts className="text-2xl items-center" />
              ) : (
                <MdOutlineManageAccounts className="text-2xl items-center" />
              )}
              Manage Account
            </li>
          </Link>
          <Link href="/theme">
            <li className={getLinkClassName("/theme")}>
              {selected === "/theme" ? (
                <MdStyle className="text-2xl items-center" />
              ) : (
                <MdOutlineStyle className="text-2xl items-center" />
              )}
              Theme
            </li>
          </Link>
          <li
            onClick={logout}
            className="md:p-4 p-3 border-t mt-6 flex gap-2 md:gap-4 items-center transition-all duration-300 hover:bg-base-light hover:-translate-x-1 cursor-pointer"
          >
            <RiLogoutBoxLine className="text-lg items-center" />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}
