/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React from "react";
import { BiSolidDish } from "react-icons/bi";
import { RiTimerFill } from "react-icons/ri";
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

function Cards({ poster }: HotRecipeProps) {
  return (
    <>
      {poster?.map((poster, index) => (
        <Link key={poster._id} href={`/recipe/${poster._id}`}>
          <div
            key={index}
            className=" pb-4 lg:w-80  bg-base flex flex-col gap-1 md:gap-3 justify-between items-center rounded-2xl shadow-md transition-transform duration-200 transform hover:bg-base-light hover:scale-105"
          >
            <img
              src={poster.img}
              alt=""
              className="h-32 md:h-48 lg:h-60 w-full  object-cover rounded-2xl"
            />

            <div className="md:h-32 h-16 w-full px-4  flex flex-col justify-between">
              <p className="  md:text-lg text-xs px-1 lg:max-h-20  line-clamp-2  font-bold lg:px-6">
                {poster.name}
              </p>

              <div className=" flex justify-around gap-4 p-1 md:p-2 w-full">
                <div className=" flex gap-1 justify-center items-center md:text-xl">
                  <RiTimerFill /> <p className=" text-xs">{poster.time}</p>
                </div>

                <div className=" flex gap-1 justify-center items-center md:text-xl">
                  <BiSolidDish /> <p className=" text-xs ">{poster.dishType}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default Cards;
