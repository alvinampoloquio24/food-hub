/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { PiBowlFoodLight } from "react-icons/pi";
import { SlLogout } from "react-icons/sl";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../context/authProvider";
import BackButton from "../props/backButton";
import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";
export default function ProfileNaviagtion() {
  const [user, setUser] = useState<any>(null);
  const [selected, setSelected] = useState("");
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    switch (path) {
      case "/profile":
        setSelected("profile");
    }

    const baseClasses =
      "md:p-4 p-3 flex gap-2  md:gap-4 items-center transition-all  duration-300 hover:bg-base-light hover:-translate-x-1 cursor-pointer";

    return pathname.startsWith(path)
      ? `${baseClasses} text-base-dark font-bold border-r-2 hover:-translate-x-0 hover:bg-base-mid `
      : baseClasses;
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      setUser(storedUser);
    }
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="col-span-2 bg-base-mid text-text-color">
      <BackButton />{" "}
      <div className="py-16 ">
        {user && (
          <div className="flex space-x-3 text-md   p-3 items-center mb-6">
            <img
              src={user.profile}
              alt=""
              className="object-cover h-8 w-8 rounded-full "
            />
            <p className="font-semibold text-lg">{user.name}</p>
          </div>
        )}
        <ul className="flex flex-col ">
          {" "}
          <li className={getLinkClassName("/")}>
            {selected ? (
              <RiAccountCircleLine className="text-2xl items-center" />
            ) : (
              <>
                <RiAccountCircleFill className="text-2xl items-center" />
              </>
            )}
            Profile
          </li>
          <Link href={"/myrecipe"}>
            <li className="md:p-4 p-3 flex gap-2 md:gap-4 items-center transition-all duration-300 hover:bg-base-light hover:-translate-x-1 cursor-pointer">
              <PiBowlFoodLight className="text-2xl items-center" />
              My Recipe
            </li>
          </Link>
          <li className="md:p-4 p-3 flex gap-2 md:gap-4 items-center transition-all duration-300 hover:bg-base-light hover:-translate-x-1 cursor-pointer">
            <AiOutlineSetting className="text-2xl items-center" />
            Manage Account
          </li>
          <li
            onClick={() => {
              logout();
            }}
            className="md:p-4 p-3  border-t  mt-3 flex gap-2 md:gap-4 items-center transition-all duration-300 hover:bg-base-light hover:-translate-x-1 cursor-pointer"
          >
            <SlLogout className="text-lg items-center" />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}
