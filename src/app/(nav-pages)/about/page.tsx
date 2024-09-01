/* eslint-disable @next/next/no-img-element */

import React from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import Navagation from "@/app/components/Navagation";

import { FaSquareInstagram } from "react-icons/fa6";
export default function Contact() {
  return (
    <>
      <Navagation />
      <div className="bg-base-white text-color p-3 flex items-center flex-col gap-5 lg:p-24 lg:gap-20 ">
        <p className="text-sm font-bold md:text-lg lg:text-3xl xl:text-5xl">
          Full Guide to Becoming a Professional Chief
        </p>
        <div className="grid grid-cols-2 items-center gap-3 ">
          <div className="flex items-center justify-center border-r-2">
            <img
              src="https://img.freepik.com/free-photo/front-view-portrait-businessman-with-glasses_23-2148816831.jpg"
              alt=""
              className="object-cover h-8 w-8 rounded-full"
            />
            <p className="text-xs md:text-sm lg: font-bold">John Smith</p>
          </div>
          <p className="text-xs md:text-sm text-center">16 September 2023</p>
        </div>
        <p className="text-xs md:text-sm lg:text-lg text-center">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          posuere lorem nec facilisis hendrerit. Sed semper euismod ullamcorper.
          Praesent posuere lorem nec facilisis hendrerit. Sed semper euismod
          ullamcorper.
        </p>
        <img
          src="https://t4.ftcdn.net/jpg/06/48/94/67/360_F_648946750_C2G3Oh9QsQhmX8lUIFWnZ7vren0LnViV.jpg"
          alt=""
          className="objectt-cover w-full rounded-2xl"
        />
        {/* qouestions */}
        <div className="flex flex-col gap-3 md:gap-6 lg:w-full lg:flex-row">
          {" "}
          <div className="flex flex-col gap-3 lg:gap-6 lg:w-4/5 xl:gap-20">
            {" "}
            <div className="flex flex-col gap-4">
              <p className="text-sm md:text-lg lg:text-xl font-bold">
                How did you start out in the food industry?
              </p>{" "}
              <p className="text-xs md:text-sm lg:text-lg">
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent posuere lorem nec facilisis hendrerit. Sed semper
                euismod ullamcorper.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold md:text-lg lg:text-xl">
                What do you want about this job?
              </p>{" "}
              <p className="text-xs md:text-sm lg:text-lg">
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent posuere lorem nec facilisis hendrerit. Sed semper
                euismod ullamcorper.
              </p>
            </div>
            <div className="flex flex-col gap-4 ">
              <p className="text-sm font-bold md:text-lg lg:text-xl">
                Do you cook at home on your day off?
              </p>{" "}
              <img
                src="https://insidefmcg.com.au/wp-content/uploads/2020/11/Home-cooking.jpg"
                alt=""
                className="object-cover rounded-2xl"
              />
              <p className="text-xs tmd:text-sm md:text-sm lg:text-lg">
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent posuere lorem nec facilisis hendrerit. Sed semper
                euismod ullamcorper.
              </p>
            </div>
            <div className="p-8 bg-base ">
              <p className="md:text-2xl lg:text-3xl">
                “A recipe has no soul. You, as the cook, must bring soul to the
                recipe.” – Thomas Keller
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold md:text-lg lg:text-xl">
                What is the biggest misconception that people have about a
                professional chief?
              </p>{" "}
              <p className="text-xs md:text-sm lg:text-lg">
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent posuere lorem nec facilisis hendrerit. Sed semper
                euismod ullamcorper.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-center justify-around lg:justify-normal lg:w-1/5 lg:flex-col lg:gap-8">
            <p className=" md:text-xl font-bold">SHARE THIS ON: </p>
            <p className="flex gap-3 text-xl md:text-2xl lg:flex-col lg:gap-8 lg:text-3xl">
              {" "}
              <FaSquareFacebook />
              <FaTwitter />
              <FaSquareInstagram />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
