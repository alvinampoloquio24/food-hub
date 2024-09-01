"use client";

import React from "react";
import { FaFishFins } from "react-icons/fa6";
import { GiChocolateBar, GiFruitBowl, GiSewedShell } from "react-icons/gi";
import { LuVegan } from "react-icons/lu";
import {
  MdOutlineFreeBreakfast,
  MdOutlineLunchDining,
  MdOutlineDinnerDining,
} from "react-icons/md";
import { RiDrinks2Fill } from "react-icons/ri";
import { TbMeat } from "react-icons/tb";

function Category() {
  const [viewAll, setViewAll] = React.useState(false);
  const openViewAll = () => {
    setViewAll(!viewAll);
  };
  return (
    <>
      <div className=" text-text-color flex justify-between items-center">
        {" "}
        <p className="text-2xl font-bold ">Categories</p>{" "}
        <button
          onClick={openViewAll}
          className=" py-4 w-32 rounded-lg bg-slate-200"
        >
          {!viewAll ? `View all` : `View less`}
        </button>
      </div>
      <div className="grid grid-cols-3 text-black  lg:grid-cols-6 xl:grid-cols-6  gap-3 lg:gap-8 mt-5">
        <div className="rounded-lg p-4 lg:h-44 flex flex-col bg-slate-100 lg:p-10 shadow-md gap-2 items-center justify-center">
          <div className="text-5xl">
            <MdOutlineFreeBreakfast />
          </div>
          <p>BreakFast</p>
        </div>
        <div className="rounded-lg p-4 lg:h-44 flex flex-col bg-green-200 shadow-md gap-2 items-center justify-center">
          <div className="text-5xl">
            <LuVegan />
          </div>
          <p>Vegan</p>
        </div>
        <div className="rounded-lg p-4 lg:h-44 flex flex-col bg-pink-200 shadow-md gap-2 items-center justify-center">
          <div className="text-5xl">
            <TbMeat />
          </div>
          <p>Meat</p>
        </div>
        <div className="rounded-lg p-4 flex lg:h-44 flex-col bg-yellow-200 shadow-md gap-2 items-center justify-center">
          <div className="text-5xl">
            <MdOutlineFreeBreakfast />
          </div>
          <p>Dessert</p>
        </div>
        <div className="rounded-lg p-4 flex lg:h-44 flex-col bg-orange-200 shadow-md gap-2 items-center justify-center">
          <div className="text-5xl">
            <MdOutlineLunchDining />
          </div>
          <p>Launch</p>
        </div>
        <div className="rounded-lg p-4 flex lg:h-44 flex-col bg-orange-300 shadow-md gap-2 items-center justify-center">
          <div className="text-5xl">
            <GiChocolateBar />
          </div>
          <p>Chocolate</p>
        </div>
        {viewAll && (
          <>
            <div className="rounded-lg p-4 flex lg:h-44 flex-col bg-base lg:p-10 shadow-md gap-2 items-center justify-center">
              <div className="text-5xl">
                <MdOutlineDinnerDining />
              </div>
              <p>Dinner</p>
            </div>
            <div className="rounded-lg p-4 flex lg:h-44 flex-col bg-lime-200 shadow-md gap-2 items-center justify-center">
              <div className="text-5xl">
                <GiFruitBowl />
              </div>
              <p>Fruits</p>
            </div>
            <div className="rounded-lg p-4 flex flex-col lg:h-44 bg-purple-200 shadow-md gap-2 items-center justify-center">
              <div className="text-5xl">
                <RiDrinks2Fill />
              </div>
              <p>Drinks</p>
            </div>
            <div className="rounded-lg p-4 flex flex-col lg:h-44 bg-blue-200 shadow-md gap-2 items-center justify-center">
              <div className="text-5xl">
                <FaFishFins />
              </div>
              <p>Fish</p>
            </div>
            <div className="rounded-lg p-4 lg:h-44 flex flex-col bg-teal-300 shadow-md gap-2 items-center justify-center">
              <div className="text-5xl">
                <GiSewedShell />
              </div>
              <p>Shells</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Category;
