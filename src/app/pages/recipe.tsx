/* eslint-disable @next/next/no-img-element */
import React from "react";
import { TiPrinter } from "react-icons/ti";
import { FaRegShareSquare } from "react-icons/fa";
import { RiTimerFill } from "react-icons/ri";
import { BiDish } from "react-icons/bi";
import { PiBowlFoodFill } from "react-icons/pi";
import { IoTimer } from "react-icons/io5";
export default function recipe() {
  return (
    <>
      <div className="px-5 md:px-6 md:py-10 xl:pb-20 lg:px-20 lg:gap-7 flex flex-col md:h-screen bg-white">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          {/* Grid Line  */}
          <div className=" lg:flex lg:flex-col  py-3 ">
            <p className="text-2xl font-bold py-3 md:text-3xl lg:text-5xl">
              Health Japanese Fried Rice
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 justify-between w-full py-2">
              <div className="flex gap-1 lg:gap-3 items-center justify-center">
                <img
                  src="https://assets.mycast.io/actor_images/actor-johnny-sins-75125_large.jpg?1586055334"
                  alt=""
                  className="rounded-full object-cover h-8 w-8 md:h-12 md:w-12"
                />
                <div className="flex flex-col text-xs md:text-sm items-center justify-center">
                  <p className=" font-bold">Jonny Sins</p>
                  <p>Jan 2 2024</p>
                </div>
              </div>
              <div className="flex gap-1 lg:gap-3  items-center border-l-2 justify-center">
                <RiTimerFill className="text-lg md:text-2xl" />
                <div className="flex flex-col text-xs md:text-sm  items-center justify-center">
                  <p className="font-bold">PREP TIME</p>
                  <p>15 m</p>
                </div>
              </div>
              <div className="flex gap-1 lg:gap-3  items-center border-l-2 justify-center">
                <RiTimerFill className="text-lg md:text-2xl" />
                <div className="flex flex-col text-xs md:text-sm  items-center justify-center">
                  <p className="font-bold">COOK TIME</p>
                  <p>15 m</p>
                </div>
              </div>
              <div className="flex gap-1 lg:gap-3  items-center border-l-2 justify-center">
                <BiDish className="text-lg md:text-2xl" />
                <div className="flex flex-col text-xs md:text-sm lg:text-lg items-center justify-center">
                  <p className="font-bold">Chiken</p>
                </div>
              </div>
            </div>
          </div>
          {/* PRINT AND SHARE */}
          <div className="flex gap-6 pb-5 ">
            <div className="flex flex-col justify-center items-center">
              <div className="p-3 lg:p-4 flex md:text-xl lg:text-3xl text-sm justify-center items-center bg-sky-100 rounded-full">
                <TiPrinter />
              </div>
              <p className="text-xs lg:text-lg ">Print</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="p-3 lg:p-4 flex md:text-xl lg:text-3xl text-sm justify-center items-center bg-sky-100 rounded-full">
                <FaRegShareSquare />
              </div>
              <p className="text-xs lg:text-lg">Share</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-1 md:gap-3 md:h-1/2 lg:h-2/3 xl:h-2/3 xl:gap-9">
          <div className="flex basis-2/3 xl:basis-1/2">
            {" "}
            <img
              src="https://japan.recipetineats.com/wp-content/uploads/2021/10/Japanese_Curry_Fried_Rice_6751sq.jpg"
              alt=""
              className="object-cover rounded-2xl w-full h-48 md:h-full"
            />
          </div>
          <div className="bg-sky-100 rounded-2xl p-2 md:p-4 flex flex-col md:basis-1/3 xl:basis-1/2 justify-around">
            <p className="font-bold text-lg lg:text-2xl">
              Nutition Imformation
            </p>
            <div className="flex flex-col lg:text-xl">
              {" "}
              <div className="border-b-2 flex w-full justify-between py-2">
                <p>Calories</p>
                <p className="font-bold">219.9 Kcal</p>
              </div>
              <div className="border-b-2 flex w-full justify-between py-2">
                <p>TotalFat</p>
                <p className="font-bold">10.7 g</p>
              </div>
              <div className="border-b-2 flex w-full justify-between py-2">
                <p>Protein</p>
                <p className="font-bold">7.9 g</p>
              </div>
              <div className="border-b-2 flex w-full justify-between py-2">
                <p>Carbohydrates</p>
                <p className="font-bold">22.3 g</p>
              </div>
              <div className="border-b-2 flex w-full justify-between py-2">
                <p>Cholesterol</p>
                <p className="font-bold">34.5 mg</p>
              </div>
            </div>
            <p className="text-xs lg:text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <p className="py-3 text-sm  lg:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
      </div>
      {/* 222222222222 */}
      <div className="bg-white p-5 gap-3 flex flex-col lg:px-20 xl:px-56 ">
        <p className="text-lg font-bold pb-3 md:text-2xl lg:text-4xl">
          Directions
        </p>
        <div className="flex flex-col gap-3 border-b-2 py-3 ">
          {" "}
          <p className="text-sm font-bold md:text-xl lg:text-2xl">
            1. Lorem ipsum dolor sit amet
          </p>
          <p className="text-xs md:text-sm lg:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <img
            src="https://extension.usu.edu/images/meal-prep.jpg"
            alt=""
            className="w-full object-cover h-52 md:h-72 lg:h-80 xl:h-96"
          />
          <p className="text-xs md:text-sm lg:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="flex flex-col gap-3 border-b-2 py-3">
          {" "}
          <p className="text-sm font-bold md:text-xl lg:text-2xl">
            2. Lorem ipsum dolor sit amet
          </p>
          <p className="text-xs md:text-sm lg:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>{" "}
        <div className="flex flex-col gap-3 border-b-2 py-3">
          {" "}
          <p className="text-sm font-bold md:text-xl lg:text-2xl">
            3. Lorem ipsum dolor sit amet
          </p>
          <p className="text-xs md:text-sm lg:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>{" "}
      </div>
      <div className=" flex bg-white justify-center items-center py-5 lg:px-20 lg:py-32">
        <div className="bg-sky-100 p-10 w-full mx-3 justify-center items-center lg:py-20 xl:py32 flex-col gap-5 flex rounded-3xl ">
          <p className="text-lg font-bold py-2 md:text-3xl lg:text-4xl">
            Deliciousness to your inbox
          </p>
          <p className="text-xs md:text-lg xl:px-64  text-center">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            posuere lorem nec facilisis hendrerit.
          </p>
          <div className="flex relative justify-center items-center md:w-1/2 lg:w-2/5">
            <input
              type="text"
              placeholder="Email"
              className=" bg-white rounded-lg p-3 md:p-5 md:w-full "
            />
            <button className="bg-black rounded-xl text-white p-2 md:p-3 absolute right-1">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      {/* more recopre */}
      <div className="bg-white p-3 flex flex-col md:gap-4 ">
        <p className=" text-lg text-center font-bold md:text-2xl">
          You may like this recipe too
        </p>
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
      </div>
    </>
  );
}
