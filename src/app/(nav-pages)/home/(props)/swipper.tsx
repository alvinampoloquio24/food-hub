/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
// components/ClientSwiperComponent.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { FaArrowRight } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import getPoster from "../../../../api/poster";
import { BiDish } from "react-icons/bi";
import { IoIosTimer } from "react-icons/io";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Poster {
  img: string;
  name: string;
  _id: string;
  time: string;
  dishType: string;
}
interface HotRecipeProps {
  poster: Poster[] | null;
}

// const fetchData = async () => {
//   try {
//     const response: any = await Poster.get();

//     setPoster(response.response.items);
//     console.log(poster);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
const HotRecipe = ({ poster }: HotRecipeProps) => {
  return (
    <>
      <div className="mt-16 ">
        {" "}
        <div className=" lg:pt-6 lg:p-5 p-2 hidden  lg:flex items-center  gap-2 lg:px-12 px-8 bg-base-white">
          {" "}
          <p className="lg:text-2xl text-lg font-bold text-text-color  text-center bg-base-white">
            Today's Recipe
          </p>{" "}
          <p className="text-orange-500 text-2xl">
            {" "}
            <FaFire />{" "}
          </p>
        </div>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          className=" flex justify-center items-center"
          modules={[Autoplay]}
          autoplay={{
            delay: 3000, // 1 second delay between slides
            disableOnInteraction: false,
          }}
        >
          {poster!.map((poster: any, index: any) => (
            <SwiperSlide className="flex " key={index}>
              <div
                key={poster._id}
                className=" bg-base-white h-screen text-text-color"
              >
                <div className="lg:h-4/5 h-90p  flex justify-between md:justify-center ">
                  <div className="lg:basis-1/2 flex flex-col lg:px-12 md:max-w-2xl  px-4 bg-base-white  justify-around">
                    {/* ///trnding--------------- */}
                    <div className=" flex border   border-black my-4  md:p-3 p-2 w-32 md:w-44 rounded-full gap-2 items-center justify-center">
                      <p>
                        <HiTrendingUp className="text-xs md:text-md" />
                      </p>

                      <p className="sm:text-md text-xs">Trending</p>
                    </div>
                    {/* name des------ */}
                    <div className="flex flex-col h-screen lg:h-auto md:gap-6 gap-4 justify-around lg:justify-start">
                      <div className=" md:text-5xl text-xl  text-base-dark  font-bold ">
                        {poster.name ? (
                          <p>{poster.name}</p>
                        ) : (
                          <Skeleton count={2} />
                        )}
                      </div>
                      <div className=" md:text-md text-xs  line-clamp-5 mb-3 py-r">
                        {poster.description ? (
                          <p> {poster.description}</p>
                        ) : (
                          <Skeleton count={2} />
                        )}
                      </div>
                      {/* img wehn small screen */}
                      <div className="h-1/2 bg-black relative md:flex  overflow-hidden lg:hidden flex">
                        <img
                          src={poster.img}
                          alt=""
                          className="object-cover absolute   h-full overflow-hidden w-screen lg:hidden flex"
                        />
                      </div>
                      <div className=" flex gap-5">
                        <div className="py-3 md:py-3 md:px-4  rounded-full flex items-center justify-center gap-2">
                          <p>
                            <IoIosTimer />
                          </p>
                          <p className="mr-2 sm:text-md text-xs">
                            {poster.time}
                          </p>
                        </div>
                        <div className=" p-2 md:py-3 md:px-4 rounded-full flex items-center justify-center gap-2">
                          <p>
                            <BiDish />
                          </p>

                          <p className="mr-2 sm:text-md text-xs">
                            {poster.dishType}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* button -------------------------------- */}
                    <div className="flex justify-between py-4">
                      <div className=" flex gap-2 items-center justify-center">
                        <img
                          src={poster.user.profile}
                          alt=""
                          className=" rounded-full object-cover  w-10 h-10"
                        />
                        <div>
                          <p className="text-xs">{poster.user.name}</p>
                        </div>
                      </div>
                      <div>
                        <Link href={`/recipe/${poster._id}`}>
                          <div className=" bg-base-dark flex items-center md:p-5 p-3 sm:gap-4 gap-1 justify-between rounded-2xl cursor-pointer">
                            <p className="text-white ml-3 text-xs ">
                              View Recipe
                            </p>
                            <p className="text-white">
                              <FaArrowRight />
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* ///img-------------------------- */}
                  <img
                    src={poster.img}
                    className="lg:basis-1/2 object-cover lg:flex hidden overflow-hidden"
                    alt=""
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default HotRecipe;
