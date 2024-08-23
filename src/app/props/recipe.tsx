/* eslint-disable @next/next/no-img-element */
import React from "react";

import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { RiFireFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import BackButton from "@/app/props/backButton";

interface Irecipe {
  name: string;
  time: string;
  dishType: string;
  img: string;
  cal: string;
  ingredients: { name: string; quantity: string }[];
}

interface RecipeProps {
  recipe: Irecipe;
}

export default function RecipeProps({ recipe }: RecipeProps) {
  return (
    <>
      <div className="lg:h-screen bg-base-white relative">
        <BackButton />
        <div className="lg:flex lg:flex-row flex flex-col-reverse lg:h-full md:flex-col-reverse ">
          <div className="bg-base-mid lg:basis-1/3 md:p-10 p-6 md:h-screen overflow-y-auto  ">
            <p className="md:text-3xl text-2xl lg:pl-8 font-semi-bold">
              Ingredients ({recipe.ingredients.length})
            </p>
            {recipe.ingredients.map((item, index) => (
              <div
                key={index}
                className="flex border-b lg:pl-8 border-gray-300 gap-3 pt-8"
              >
                <p className="md:text-xl text-md  font-bold">{item.quantity}</p>
                <div className="flex items-center text-sm lg:text-lg">
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:basis-4/6 grid grid-rows-12  h-screen relative">
            <div className="bg-base-dark md:p-4 p-2 absolute bottom-0 left-0 z-10 flex items-center justify-center gap-3  shadow-lg text-white">
              <a
                href="#directions"
                className=" flex items-center justify-center gap-4"
              >
                <p>Directions</p>
                <IoIosArrowDown />
              </a>
            </div>

            <div className="bg-base-white row-span-4 h- w-full grid grid-cols-12">
              <div className="bg-base-white col-span-9  p-10 flex justify-center flex-col">
                <div className="flex items-center text-green-700">
                  <TbRosetteDiscountCheckFilled className="text-xl" />
                  <p className="md:text-xl text-sm p-2">Easy</p>
                </div>
                <p className="md:text-5xl text-2xl font-bold text-base-dark pl-4 border-l-4 border-base-dark">
                  {recipe.name}
                </p>
              </div>
              <div className="bg-base-dark col-span-3 flex  flex-col justify-around items-center text-white text-sm p-4">
                <div className="flex flex-col items-center justify-center">
                  {" "}
                  <p className="md:text-6xl text-4xl">
                    {" "}
                    <RiFireFill />
                  </p>
                  <p className="text-center">{recipe.cal} calories</p>
                </div>
              </div>
            </div>
            <div className="bg-cyan-300 row-span-8 relative overflow-hidden">
              <img
                src={recipe.img}
                alt={recipe.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
