/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import ProfileNav from "../components/sad";
import { useAuth } from "@/context/authProvider";
import { MdEditSquare } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { FiRss } from "react-icons/fi";
import { LuUtensilsCrossed } from "react-icons/lu";
import Poster from "@/api/poster";
import Link from "next/link";
import { BiDish } from "react-icons/bi";
import { RiTimerFill } from "react-icons/ri";
import EditProfileModal from "../props/ModalEditProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function EditProfile() {
  interface Poster {
    name: string;
    _id: string;
    description: string;
    time: string;
    directions: any;
    dishType: any;
    img: string;
    ingredients: Array<{ name: string; quantity: string }>;
    user: {
      name: string;
      profile: string;
      _id: string;
    };
  }

  const { user } = useAuth();
  const [poster, setPoster] = React.useState<Poster[] | null>([]);
  const getPoster = async () => {
    try {
      const data = await Poster.get();
      setPoster(data.response);
    } catch (error) {
      throw error;
    } finally {
    }
  };

  useEffect(() => {
    getPoster();
  }, []);
  return (
    <>
      <ToastContainer />

      <div className="h-screen grid grid-cols-12">
        <ProfileNav />
        {/* Fixed ProfileNav */}
        <div className="col-span-10 flex flex-col overflow-auto relative  ">
          <div className=" flex flex-col w-full h-1/3 ">
            <img
              src={user?.coverPhoto}
              alt=""
              className="object-cover h-full"
            />
          </div>
          <div className=" h-52  w-full relative -top-5 px-10 flex justify-between items-center">
            <div className="flex gap-3 items-center   ">
              {/* User profile image */}
              <img
                src={user?.profile || "/default-profile.png"} // Fallback in case user.profile is undefined
                alt="Profile"
                className="object-cover h-32 w-32 rounded-full border-8 border-white"
              />
              {/* User name */}
              <div>
                {" "}
                <p className="text-3xl font-bold">{user?.name || "Guest"}</p>
                <p>{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="px-16 text-md p-6 flex gap-2 flex-col">
            {" "}
            <div className="flex gap-2 items-center">
              <LuUtensilsCrossed className="text-2xl" />
              <p>
                number of <span className="font-semibold"> post 12</span>
              </p>
            </div>
          </div>
          <div className=" px-10 flex flex-col gap-5">
            <div className="bg-base-mid flex flex-col gap-1 rounded shadow">
              {poster?.length === 0 ? (
                <div className="h-90p bg-white flex justify-center items-center">
                  <p>Loading..</p>
                </div>
              ) : (
                <>
                  {" "}
                  {poster?.map((poster, index) => (
                    <Link key={index} href={`/recipe/${poster._id}`}>
                      <div
                        key={index}
                        className="bg-white border-b  md:p-12 p-4 py-12  pb-12 flex flex-col gap-8 hover:bg-orange-50 transition-all duration-300 ease-in-out  "
                      >
                        <div className="md:grid grid-cols-12 ">
                          <div className=" col-span-7">
                            <p className="md:text-4xl text-xl font-bold text-base-dark">
                              {poster.name}
                            </p>
                            <div className="flex flex-col md:pt-5 lg:flex-row lg:justify-between col-span-6">
                              {/* Grid Line  */}
                              <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 justify-between w-full py-2">
                                <div className="flex gap-1 lg:gap-3 items-center justify-center ">
                                  <img
                                    src={poster.user.profile}
                                    alt=""
                                    className="rounded-full object-cover md:h-8 md:w-8 h-6 w-6 "
                                  />
                                  <div className="flex flex-col text-xs items-center justify-center">
                                    <p className=" font-bold">
                                      {poster.user.name}
                                    </p>
                                    <p>Jan 2 2024</p>
                                  </div>
                                </div>
                                <div className="lg:flex gap-1 lg:gap-3 hidden  items-center border-l-2  justify-center">
                                  <RiTimerFill className="text-lg md:text-md" />
                                  <div className="flex flex-col text-xs   items-center justify-center">
                                    <p className="font-bold">PREP TIME</p>
                                    <p>15 m</p>
                                  </div>
                                </div>
                                <div className="flex  gap-1 lg:gap-3  items-center border-l-2 justify-center">
                                  <RiTimerFill className="text-lg md:text-md" />
                                  <div className="flex flex-col text-xs  items-center justify-center">
                                    <p className="font-bold">COOK TIME</p>
                                    <p>{poster.time}</p>
                                  </div>
                                </div>
                                <div className="flex gap-1 lg:gap-3 items-center border-l-2 justify-center">
                                  <BiDish className="text-lg md:text-sm" />
                                  <div className="flex flex-col text-xs  items-center justify-center">
                                    <p className="font-bold uppercase">
                                      {poster.dishType}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-5 md:flex hidden gap-6 items-center justify-center"></div>
                        </div>
                        <div className="md:grid grid-cols-12 h-5/6 w-full">
                          <img
                            src={poster.img}
                            className=" object-cover md:h-96 h-64 w-full col-span-7"
                            alt=""
                          />
                          <div className="bg-base-mid col-span-5 h-96  p-4 md:flex hidden flex-col">
                            <p className="text-xl font-bold mb-4">
                              Ingredients({poster.ingredients.length})
                            </p>
                            <div className="flex-grow overflow-y-auto ">
                              <div className="">
                                {poster.ingredients.map((data, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center p-2 border-b-2"
                                  >
                                    <p className="w-8 text-xl font-bold">
                                      {index + 1}
                                    </p>
                                    <div className="flex-grow">
                                      <p className="font-bold text-sm">
                                        {data.quantity}
                                      </p>
                                      <p className="text-xs">{data.name}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="md:text-lg text-xs">
                          {poster.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <div className="flex items-center justify-center py-4">
                    <p>End of content</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
