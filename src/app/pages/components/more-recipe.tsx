/* eslint-disable @next/next/no-img-element */
import React from "react";

import { PiBowlFoodFill } from "react-icons/pi";
import { IoTimer } from "react-icons/io5";
export default function MoreRecipe() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 xl:grid-cols-4 xl:px-20">
      {" "}
      <div className=" flex flex-col gap-3 py-3 justify-between  rounded-2xl">
        {" "}
        <div className=" flex flex-col">
          <img
            src="https://veganwithgusto.com/wp-content/uploads/2022/03/PF-Chang-copycat-vegan-lettuce-wraps.jpg"
            alt=""
            className="object-cover h-36 md:h-48 xl:h-52 w-full rounded-2xl"
          />
        </div>
        <p className="text-xs lg:text-lg font-bold xl:p-1">
          Firecracker Vegan Lettuce Wraps-Spicy!
        </p>
        <div className="flex justify-between px-1 lg:text-2xl xl:p-1">
          <div className="flex gap-1 items-center">
            <IoTimer />
            <p className="text-xs lg:text-sm">30m</p>
          </div>
          <div className="flex gap-1 items-center">
            <PiBowlFoodFill />
            <p className="text-xs">Healthy</p>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-3 py-3 justify-between  rounded-2xl">
        {" "}
        <div className=" flex flex-col">
          <img
            src="https://www.allrecipes.com/thmb/_QlXcALXmJwnkIVRthr_6ux-XIg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/176132-slow-cooker-buffalo-chicken-sandwiches-DDMFS-4x3-340-8946a0eef3a242e18746425348cd17dc.jpg"
            alt=""
            className="object-cover h-36 md:h-48 xl:h-52 w-full rounded-2xl"
          />
        </div>
        <p className="text-xs lg:text-lg font-bold xl:p-1">
          Barbeque Spicy Sandwitcs with Chips
        </p>
        <div className="flex justify-between px-1 lg:text-2xl xl:p-1">
          <div className="flex gap-1 items-center">
            <IoTimer />
            <p className="text-xs lg:text-sm">30m</p>
          </div>
          <div className="flex gap-1 items-center">
            <PiBowlFoodFill />
            <p className="text-xs">Meat</p>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-3 py-3 justify-between  rounded-2xl">
        {" "}
        <div className=" flex flex-col">
          <img
            src="https://i.pinimg.com/736x/1b/6f/cf/1b6fcf68843311ca79b1ef042627e34d.jpg"
            alt=""
            className="object-cover h-36 md:h-48 xl:h-52 w-full rounded-2xl"
          />
        </div>
        <p className="text-xs lg:text-lg font-bold xl:p-1">
          Rainbow Chiken Salad with Almond Honey Mustard Dressing al
        </p>
        <div className="flex justify-between px-1 lg:text-2xl xl:p-1">
          <div className="flex gap-1 items-center">
            <IoTimer />
            <p className="text-xs lg:text-sm">30m</p>
          </div>
          <div className="flex gap-1 items-center">
            <PiBowlFoodFill />
            <p className="text-xs">Healthy</p>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-3 py-3 justify-between  rounded-2xl">
        {" "}
        <div className=" flex flex-col">
          <img
            src="https://llbalanced.com/wp-content/uploads/2017/03/cauliflower-mushroom-taco-meat-3-1-of-1-scaled.jpg"
            alt=""
            className="object-cover h-36 md:h-48 xl:h-52 w-full rounded-2xl"
          />
        </div>
        <p className="text-xs lg:text-lg font-bold xl:p-1">
          Cauliflower Wallnut Vegetarian Taco Meal
        </p>
        <div className="flex justify-between px-1 lg:text-2xl xl:p-1">
          <div className="flex gap-1 items-center">
            <IoTimer />
            <p className="text-xs lg:text-sm">30m</p>
          </div>
          <div className="flex gap-1 items-center">
            <PiBowlFoodFill />
            <p className="text-xs">Healthy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
