/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
// components/ClientSwiperComponent.tsx

"use client";

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { FaArrowRight } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import getPoster from "../../../api/poster";
import { BiDish } from "react-icons/bi";
import { IoIosTimer } from "react-icons/io";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ClimbingBoxLoader } from "react-spinners";

const HotRecipe: React.FC = () => {
  interface Poster {
    _id: string;
    img: string;
    description: string;
    name: string;
    time: string;
    dishType: string;
    // Add any other fields that are in your actual data
  }

  const [poster, setPoster] = React.useState<Poster[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const getPosterData = async () => {
      try {
        setLoading(true);
        console.log(loading, "asdsa");
        const data = await getPoster.get();

        setPoster(data.response); // Update the state with the response data
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
        console.log(loading);
      }
    };

    getPosterData();
  }, []);

  return (
    <>
      <div className=" lg:pt-6 lg:p-5 p-2 hidden  lg:flex items-center  gap-2 lg:px-20 px-8 bg-white">
        {" "}
        <p className="lg:text-2xl text-lg font-bold  text-center bg-white">
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
            <div className="flex justify-center lg:h-screen h-screen  lg:items-start items-center  bg-white text-text-color">
              <div className="grid  lg:grid-cols-2 lg:h-4/5 h-screen  lg:w-11/12 w-full relative">
                <div className="flex flex-col justify-center bg-base  lg:rounded-l-2xl">
                  <div className="flex flex-col h-full lg:justify-around md:justify-around justify-around  gap-4 rounded-l-lg px-8 lg:px-8  ">
                    <div className=" flex  lg:w-44 w-36 border border-black  p-2 mt-6 lg:px-4 md:py-3 bg-base-mid rounded-full gap-2 items-center justify-center">
                      <p>
                        <HiTrendingUp />
                      </p>

                      <p className="sm:text-md text-sm">Trending</p>
                    </div>
                    <div className="flex flex-col h-4/6 lg:h-auto  gap-4 md:gap-10 lg:gap-6">
                      {" "}
                      <div className=" lg:text-5xl md:text-5xl text-base-dark text-4xl text- font-bold ">
                        {poster.name ? (
                          <p>{poster.name}</p>
                        ) : (
                          <Skeleton count={2} />
                        )}
                      </div>
                      <div className=" sm:text-md  text-xs  line-clamp-3">
                        {poster.description ? (
                          <p> {poster.description}</p>
                        ) : (
                          <Skeleton count={2} />
                        )}
                      </div>
                      {poster.img ? (
                        <img
                          src={poster.img}
                          className="lg:hidden flex my-3 justify-center h-full md:h-full max-h-72 md:max-h-96 w-full object-cover overflow-hidden"
                          alt=""
                        />
                      ) : (
                        <div className="lg:hidden flex my-3 justify-center h-full md:h-full max-h-72 md:max-h-96 w-full bg-orange-100 animate-pulse "></div>
                      )}
                      {poster.dishType || poster.time ? (
                        <div className=" flex gap-5">
                          <div className="bg-base-mid py-3 md:py-3 md:px-4  rounded-full flex items-center justify-center gap-2">
                            <p>
                              <IoIosTimer />
                            </p>
                            <p className="mr-2 sm:text-md text-xs">
                              {poster.time}
                            </p>
                          </div>
                          <div className="bg-base-mid p-2 md:py-3 md:px-4 rounded-full flex items-center justify-center gap-2">
                            <p>
                              <BiDish />
                            </p>

                            <p className="mr-2 sm:text-md text-xs">
                              {poster.dishType}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <Skeleton />
                      )}
                    </div>
                    <div className="flex justify-between py-4">
                      <div className=" flex gap-2 items-center justify-center">
                        <img
                          src="data:image/jpeg;base64,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"
                          alt=""
                          className=" rounded-full  sm:h-12 h-10"
                        />
                        <div>
                          <p className="text-xs">Jonny Sins</p>
                          <p className="text-xs">March 2 2024</p>
                        </div>
                      </div>
                      <div>
                        <Link href={`/recipe/${poster._id}`}>
                          <div className="sm:p-3 p-3 bg-base-dark flex items-center lg:p-5 sm:gap-4 gap-1 justify-between rounded-2xl cursor-pointer">
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
                </div>
                {poster.img ? (
                  <img
                    src={poster.img}
                    alt=""
                    className="lg:flex hidden h-full overflow-hidden w-full object-cover bg-slate-400 rounded-r-2xl"
                  />
                ) : (
                  <div className="lg:flex hidden h-full overflow-hidden w-full rounded-r-2xl bg-orange-200 animate-pulse"></div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HotRecipe;
