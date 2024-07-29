import React from "react";
import { GoHome } from "react-icons/go";
import { BiFoodMenu } from "react-icons/bi";
import { RiBloggerLine } from "react-icons/ri";
import { PiBowlFoodLight } from "react-icons/pi";

export default function Navagation() {
  return (
    <>
      <div className=" bg-white text-black sm:flex sticky top-0 z-50 transition-transform duration-300 flex gap-1 flex-col">
        <div className="bg-white shadow justify-between flex items-center">
          <p className="p-3 "> LOGO</p>
          <p className="p-3 "> +</p>
        </div>
        <ul className="flex items-center justify-center text-2xl">
          <li className="bg-white p-2  border-b-2 border-blue-400 flex-1 flex items-center justify-center">
            <GoHome />
          </li>
          <li className="bg-white p-2   flex-1 flex items-center justify-center">
            <PiBowlFoodLight />
          </li>
          <li className="bg-white p-2   flex-1 flex items-center justify-center">
            <RiBloggerLine />
          </li>
          <li className="bg-white p-2   flex-1 flex items-center justify-center">
            <BiFoodMenu />
          </li>
          <li className="bg-white p-2   flex-1 flex items-center justify-center">
            <BiFoodMenu />
          </li>
        </ul>
      </div>
    </>
  );
}
