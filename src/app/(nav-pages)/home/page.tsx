/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { LuVegan } from "react-icons/lu";
import { TbMeat } from "react-icons/tb";
import { MdOutlineLunchDining } from "react-icons/md";
import { GiChocolateBar } from "react-icons/gi";
import { MdOutlineDinnerDining } from "react-icons/md";
import { GiFruitBowl } from "react-icons/gi";
import { RiDrinks2Fill } from "react-icons/ri";
import { FaFishFins } from "react-icons/fa6";
import { GiSewedShell } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { RiTimerFill } from "react-icons/ri";
import { BiSolidDish } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa6";
import { BiMessageRounded } from "react-icons/bi";
import { PiTelegramLogo } from "react-icons/pi";
import { IoTimer } from "react-icons/io5";
import { CgPentagonUp } from "react-icons/cg";
import { PiBowlFoodFill } from "react-icons/pi";

export default function Home() {
  const [viewAll, setViewAll] = React.useState(false);

  const openViewAll = () => {
    setViewAll(!viewAll);
  };

  return (
    <>
      <main className="h-screen text-black bg-white flex flex-col ">
        <div className="grid  lg:grid-cols-2 h-full lg:m-7">
          <div className="flex flex-col justify-center lg:h-full  bg-sky-100 lg:rounded-l-3xl ">
            <div className="flex flex-col h-full lg:justify-around md:justify-around justify-around  gap-4 rounded-l-lg mx-6 py-6 ">
              <div className=" flex  w-36 p-2 bg-white rounded-full gap-2 items-center justify-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2253/2253457.png"
                  alt=""
                  className="h-5 rouded-full"
                />
                <p className="sm:text-md text-sm">Hot Recipes</p>
              </div>
              <div className="flex flex-col gap-4 md:gap-10 lg:gap-6">
                {" "}
                <div className=" lg:text-7xl md:text-5xl text-4xl font-bold font-sans">
                  Spicy delicious chicken dishes
                </div>
                <div className=" sm:text-md md:text-lg text-xs font-sans">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent posuere lorem nec facilisis hendrerit. Sed semper
                  euismod ullamcorper.
                </div>
                <div className="lg:hidden flex my-3 justify-center">
                  <img
                    src="https://images.immediate.co.uk/production/volatile/sites/30/2020/10/Chicken-chilli-con-carne-4f4e606.jpg"
                    alt=""
                    className="lg:h-full  object-cover md:h-96 md:w-full lg:rounded-r-3xl"
                  />
                </div>
                <div className=" flex gap-5">
                  <div className="bg-sky-100 py-3  rounded-full flex items-center justify-center gap-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2421/2421935.png"
                      alt=""
                      className="h-4 ml-2 rounded-full"
                    />
                    <p className="mr-2 sm:text-md text-xs">30 minutes</p>
                  </div>
                  <div className="bg-sky-100 p-2 rounded-full flex items-center justify-center gap-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/272/272186.png"
                      alt=""
                      className="h-4 ml-2 rouded-full"
                    />
                    <p className="mr-2 sm:text-md text-xs">Chicken</p>
                  </div>
                </div>
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
                  <div className="sm:p-3 p-1 bg-black flex items-center sm:gap-4 gap-1 justify-between rounded-3xl">
                    <p className="text-white ml-3 text-xs ">View Recipe</p>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/16855/16855814.png"
                      alt=""
                      className="h-10 rounded-full mr-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex hidden">
            <img
              src="https://images.immediate.co.uk/production/volatile/sites/30/2020/10/Chicken-chilli-con-carne-4f4e606.jpg"
              alt=""
              className="h-full object-cover rounded-r-3xl"
            />
          </div>
        </div>
      </main>
      <div className=" bg-white flex flex-col  p-6 py-12 xl:p-24 lg:p-16 gap-8 md:mt-24 lg:mt-0 ">
        <div className=" flex gap-4 md:gap-6  flex-col mb-10 ">
          {" "}
          <p className=" text-3xl font-bold md:text-5xl lg:text-6xl">
            Many Delicious Food Choices to Make
          </p>
          <p className="lg:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            posuere lorem nec facilisis hendrerit. Sed semper euismod
            ullamcorper.
          </p>
        </div>
        <div className=" flex justify-between items-center">
          {" "}
          <p className="text-2xl font-bold ">Categories</p>{" "}
          <button
            onClick={openViewAll}
            className=" py-4 w-32 rounded-lg bg-slate-200"
          >
            {!viewAll ? `View all` : `View less`}
          </button>
        </div>
        <div className="grid grid-cols-3  lg:grid-cols-6 xl:grid-cols-6  gap-3 lg:gap-8 mt-5">
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
              <div className="rounded-lg p-4 flex lg:h-44 flex-col bg-sky-100 lg:p-10 shadow-md gap-2 items-center justify-center">
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
      </div>
      <div className=" bg-white flex flex-col items-center">
        <p className=" text-2xl font-bold pt-16 md:text-3xl lg:text-5xl">
          Simple and tasty recipes
        </p>
        <p className="text-xs md:text-sm lg:text-sm p-5 lg:px-72 text-center lg:mb-10">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          posuere lorem nec facilisis hendrerit. Sed semper euismod ullamcorper.
          Praesent posuere lorem nec facilisis hendrerit. Sed semper euismod
          ullamcorper.
        </p>
        <div className=" grid grid-cols-2 md:grid-cols-3 p-4 gap-4 lg:gap-16">
          {" "}
          <div className=" pb-4 lg:w-80  bg-sky-100 flex flex-col gap-1 md:gap-3 justify-between items-center rounded-2xl shadow-md relative">
            <div className="p-2 md:p-3 lg:p-4  rounded-full bg-white items-center justify-center flex absolute lg:right-6 lg:top-4 sm:top-2 sm:right-2 top-1 right-1 text-lg text-red-500">
              <FaHeart />
            </div>
            <img
              src="https://austin-eats.com/wp-content/uploads/2022/01/AE01382-Edit-scaled.jpg"
              alt=""
              className="h-32 md:h-48 lg:h-60 w-full  object-cover rounded-2xl"
            />
            <p className=" text-xs md:text-lg px-2  font-bold lg:px-6">
              Big and Juicy Wagyu Cheese Burger
            </p>
            <div className=" flex justify-around gap-4 p-1 md:p-2 w-full">
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <RiTimerFill /> <p className=" text-sm">30m</p>
              </div>
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <BiSolidDish /> <p className=" text-sm ">Snack</p>
              </div>
            </div>
          </div>
          {/* /////////////////////////// */}
          <div className=" pb-4 lg:w-80  bg-sky-100 flex flex-col gap-1 md:gap-3 justify-between items-center rounded-2xl shadow-md relative">
            <div className="p-2 md:p-3 lg:p-4  rounded-full bg-white items-center justify-center flex absolute lg:right-6 lg:top-4 sm:top-2 sm:right-2 top-1 right-1 text-lg text-gray-200">
              <FaHeart />
            </div>
            <img
              src="https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/ginger-lime-salmon-96cd524b.jpg"
              alt=""
              className="h-32 md:h-48 lg:h-60 w-full  object-cover rounded-2xl"
            />
            <p className=" text-xs md:text-lg px-2  font-bold lg:px-6">
              Fresh Roasted Lime Samon With Ginger Sauce
            </p>
            <div className=" flex justify-around gap-4 p-1 md:p-2 w-full">
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <RiTimerFill /> <p className=" text-sm">30m</p>
              </div>
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <BiSolidDish /> <p className=" text-sm ">Fish</p>
              </div>
            </div>
          </div>
          {/* /////////////////////////// */}
          <div className=" pb-4 lg:w-80  bg-sky-100 flex flex-col gap-1 md:gap-3 justify-between items-center rounded-2xl shadow-md relative">
            <div className="p-2 md:p-3 lg:p-4  rounded-full bg-white items-center justify-center flex absolute lg:right-6 lg:top-4 sm:top-2 sm:right-2 top-1 right-1 text-lg text-gray-200">
              <FaHeart />
            </div>
            <img
              src="https://www.0038.co.jp/ec/upload/save_image/02041558_63de021ddb8bc.jpg"
              alt=""
              className="h-32 md:h-48 lg:h-60 w-full  object-cover rounded-2xl"
            />
            <p className=" text-xs md:text-lg px-2  font-bold lg:px-6">
              Straberry Oatmeal Pancake with Honey Syrup
            </p>
            <div className=" flex justify-around gap-4 p-1 md:p-2 w-full">
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <RiTimerFill /> <p className=" text-sm">30m</p>
              </div>
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <BiSolidDish /> <p className=" text-sm ">BreakFast</p>
              </div>
            </div>
          </div>
          {/* /////////////////////////// */}
          <div className=" pb-4 lg:w-80  bg-sky-100 flex flex-col gap-1 md:gap-3 justify-between items-center rounded-2xl shadow-md relative">
            <div className="p-2 md:p-3 lg:p-4  rounded-full bg-white items-center justify-center flex absolute lg:right-6 lg:top-4 sm:top-2 sm:right-2 top-1 right-1 text-lg text-gray-200">
              <FaHeart />
            </div>
            <img
              src="https://cdn.loveandlemons.com/wp-content/uploads/2019/05/potato-salad-crop.jpg"
              alt=""
              className="h-32 md:h-48 lg:h-60 w-full  object-cover rounded-2xl"
            />
            <p className=" text-xs md:text-lg px-2  font-bold lg:px-6">
              Fresh and Healthy Mixed Mayonnaise Salad
            </p>
            <div className=" flex justify-around gap-4 p-1 md:p-2 w-full">
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <RiTimerFill /> <p className=" text-sm">30m</p>
              </div>
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <BiSolidDish /> <p className=" text-sm ">Healthy</p>
              </div>
            </div>
          </div>
          {/* /////////////////////////// */}
          <div className=" pb-4 lg:w-80  bg-sky-100 flex flex-col gap-1 md:gap-3 justify-between items-center rounded-2xl shadow-md relative">
            <div className="p-2 md:p-3 lg:p-4  rounded-full bg-white items-center justify-center flex absolute lg:right-6 lg:top-4 sm:top-2 sm:right-2 top-1 right-1 text-lg text-red-500">
              <FaHeart />
            </div>
            <img
              src="https://girlheartfood.com/wp-content/uploads/2021/11/Chicken-Meatballs-With-Pesto-Cream-Sauce-Feature.jpg"
              alt=""
              className="h-32 md:h-48 lg:h-60 w-full  object-cover rounded-2xl"
            />
            <p className=" text-xs md:text-lg px-2  font-bold lg:px-6">
              Chiken Meatballs with Cream Cheese
            </p>
            <div className=" flex justify-around gap-4 p-1 md:p-2 w-full">
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <RiTimerFill /> <p className=" text-sm">30m</p>
              </div>
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <BiSolidDish /> <p className=" text-sm ">Meat</p>
              </div>
            </div>
          </div>
          {/* /////////////////////////// */}
          <div className=" lg:w-80  bg-sky-100 flex flex-col gap-1 md:gap-3 justify-between items-center rounded-2xl shadow-md relative">
            <img
              src="https://www.yourfoodtown.com/wp-content/uploads/2023/02/heart-healthy-foods-2-rsz.jpg"
              alt=""
              className="h-full object-cover"
            />
          </div>
          {/* /////////////////////////// */}
          <div className=" pb-4 lg:w-80  bg-sky-100 flex flex-col gap-1 md:gap-3 justify-between items-center rounded-2xl shadow-md relative">
            <div className="p-2 md:p-3 lg:p-4  rounded-full bg-white items-center justify-center flex absolute lg:right-6 lg:top-4 sm:top-2 sm:right-2 top-1 right-1 text-lg text-red-500">
              <FaHeart />
            </div>
            <img
              src="https://mojo.generalmills.com/api/public/content/H8NvPKe2HkiAqrsI8QlZYA_webp_base.webp?v=8ace44d9&t=e724eca7b3c24a8aaa6e089ed9e611fd"
              alt=""
              className="h-32 md:h-48 lg:h-60 w-full  object-cover rounded-2xl"
            />
            <p className=" text-xs md:text-lg px-2  font-bold lg:px-6">
              Fruity Pancake with Orange & Blueberry
            </p>
            <div className=" flex justify-around gap-4 p-1 md:p-2 w-full">
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <RiTimerFill /> <p className=" text-sm">30m</p>
              </div>
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <BiSolidDish /> <p className=" text-sm ">Sweet</p>
              </div>
            </div>
          </div>
          {/* /////////////////////////// */}
          <div className=" pb-4 lg:w-80  bg-sky-100 flex flex-col gap-1 md:gap-3 justify-between items-center rounded-2xl shadow-md relative">
            <div className="p-2 md:p-3 lg:p-4  rounded-full bg-white items-center justify-center flex absolute lg:right-6 lg:top-4 sm:top-2 sm:right-2 top-1 right-1 text-lg text-red-500">
              <FaHeart />
            </div>
            <img
              src="https://entertainingwithbeth.com/wp-content/uploads/2021/09/OnePotChicken_Hero_1-copy.jpg"
              alt=""
              className="h-32 md:h-48 lg:h-60 w-full  object-cover rounded-2xl"
            />
            <p className=" text-xs md:text-lg px-2  font-bold lg:px-6">
              The Best Easy One Pot Chiken and Rice
            </p>
            <div className=" flex justify-around gap-4 p-1 md:p-2 w-full">
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <RiTimerFill /> <p className=" text-sm">30m</p>
              </div>
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <BiSolidDish /> <p className=" text-sm ">Snack</p>
              </div>
            </div>
          </div>
          {/* /////////////////////////// */}
          <div className=" pb-4 lg:w-80  bg-sky-100 flex flex-col gap-1 md:gap-3 justify-between items-center rounded-2xl shadow-md relative">
            <div className="p-2 md:p-3 lg:p-4  rounded-full bg-white items-center justify-center flex absolute lg:right-6 lg:top-4 sm:top-2 sm:right-2 top-1 right-1 text-lg text-red-500">
              <FaHeart />
            </div>
            <img
              src="https://casuallypeckish.com/wp-content/uploads/2021/12/Creamy-chicken-and-bacon-pasta-2.jpg"
              alt=""
              className="h-32 md:h-48 lg:h-60 w-full  object-cover rounded-2xl"
            />
            <p className=" text-xs md:text-lg px-2  font-bold lg:px-6">
              The Creamiest Creamy Chiken and Bacon Pasta
            </p>
            <div className=" flex justify-around gap-4 p-1 md:p-2 w-full">
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <RiTimerFill /> <p className=" text-sm">30m</p>
              </div>
              <div className=" flex gap-1 justify-center items-center md:text-xl">
                <BiSolidDish /> <p className=" text-sm ">Noodles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white h-screen flex items-center justify-center pt-5">
        {" "}
        <div className="md:grid-cols-2 grid h-5/6 bg-white w-full md:mx-16 md:rounded-2xl ">
          <div className="flex flex-col lg:px-8 px-6 justify-center md:gap-8 gap-3">
            <p className="md:text-4xl text-lg font-bold">
              Every one can be chief on their own kitchen
            </p>
            <p className="lg:text-md text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              posuere lorem nec facilisis hendrerit. Sed semper euismod
              ullamcorper. Praesent posuere lorem nec facilisis hendrerit. Sed
              semper euismod ullamcorper.
            </p>
            <img
              src="https://img.freepik.com/premium-photo/food-cooking-profession-people-concept-happy-male-chef-cook-serving-cleaning-plate_763111-6938.jpg"
              alt=""
              className=" h-full object-cover w-full md:rounded-r-2xl md:hidden"
            />
            <button className=" bg-black text-white md:w-36 md:py-4 py-3 w-28 rounded-2xl text-xs">
              Learn more
            </button>
          </div>
          <img
            src="https://img.freepik.com/premium-photo/food-cooking-profession-people-concept-happy-male-chef-cook-serving-cleaning-plate_763111-6938.jpg"
            alt=""
            className=" h-full object-cover w-full rounded-r-2xl hidden md:flex"
          />
        </div>
      </div>
      <div className=" bg-sky-100 md:h-screen md:items-center lg:h-screen  flex flex-col xl:px-20 px-6 py-6 lg:gap-8 md:justify-center">
        <p className="text-lg md:text-2xl font-semibold py-2 text-center xl:text-4xl">
          Checkout out @foodhub on Instagram
        </p>
        <p className="text-xs md:text-lg text-center py-2 md:py-3 lg:px-20">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          posuere lorem nec facilisis hendrerit. Sed semper euismod ullamcorper.
        </p>

        <div className="grid grid-cols-2 gap-2  md:gap-6 py-2 md:grid-cols-3 lg:grid-cols-4  lg:gap-7">
          <div className=" bg-orange-50 shadow-lg gap-5  flex justify-around py-2 flex-col">
            <div className="flex lg:justify-between justify-between px-1 lg:px-2 w-full">
              <div className="">
                <div className="flex h-5 gap-1">
                  <div className="p-4 bg-black rounded-full"></div>
                  <div className="flex flex-col ">
                    {" "}
                    <p className=" text-xs font-semibold">foodhub</p>
                    <p className=" text-xs">Tokyu, japan</p>
                  </div>
                </div>
              </div>
              <div className="text-lg">
                <HiDotsHorizontal />
              </div>
            </div>
            <img
              src="https://www.bhg.com/thmb/ni5Io1A8d1kPZ1G1Kev8682cooA=/1939x0/filters:no_upscale():strip_icc()/RU160960-ac1ff99537a2439f89c8ff14a58cad1b.jpg"
              alt=""
              className=" object-cover w-full h-36 xl:h-56"
            />
            <div className="flex justify-between p-1">
              <div className="flex gap-1 lg:text-2xl">
                <FaRegHeart />
                <BiMessageRounded />
                <PiTelegramLogo />
              </div>

              <CgPentagonUp />
            </div>
            <p className="text-xs  text-gray-500 p-1">Semtember 20, 2020</p>
          </div>
          <div className=" bg-orange-50 shadow-lg gap-5  flex justify-around py-2 flex-col">
            <div className="flex lg:justify-between lg:px-2 w-full justify-between px-1">
              <div>
                <div className="flex h-5 gap-1">
                  <div className="p-4 bg-black rounded-full"></div>
                  <div className="flex flex-col ">
                    {" "}
                    <p className=" text-xs font-semibold">foodhub</p>
                    <p className=" text-xs">Tokyu, japan</p>
                  </div>
                </div>
              </div>
              <div className="text-lg">
                <HiDotsHorizontal />
              </div>
            </div>
            <img
              src="https://www.sugarwithspiceblog.com/wp-content/uploads/2019/09/Thumbnail.jpg"
              alt=""
              className=" object-cover w-full h-36 xl:h-56"
            />
            <div className="flex justify-between p-1">
              <div className="flex gap-1 lg:text-2xl">
                <FaRegHeart />
                <BiMessageRounded />
                <PiTelegramLogo />
              </div>

              <CgPentagonUp />
            </div>
            <p className="text-xs  text-gray-500 p-1">Semtember 20, 2020</p>
          </div>
          <div className=" bg-orange-50 shadow-lg gap-5  flex justify-around py-2 flex-col">
            <div className="flex lg:justify-between lg:px-2 w-full justify-between px-1">
              <div>
                <div className="flex h-5 gap-1">
                  <div className="p-4 bg-black rounded-full"></div>
                  <div className="flex flex-col ">
                    {" "}
                    <p className=" text-xs font-semibold">foodhub</p>
                    <p className=" text-xs">Tokyu, japan</p>
                  </div>
                </div>
              </div>
              <div className="text-lg">
                <HiDotsHorizontal />
              </div>
            </div>
            <img
              src="https://images-gmi-pmc.edge-generalmills.com/d61024a4-a437-41da-87a9-2679e733d92d.jpg"
              alt=""
              className=" object-cover w-full h-36 xl:h-56"
            />
            <div className="flex justify-between p-1">
              <div className="flex gap-1 lg:text-2xl">
                <FaRegHeart />
                <BiMessageRounded />
                <PiTelegramLogo />
              </div>

              <CgPentagonUp />
            </div>
            <p className="text-xs  text-gray-500 p-1">Semtember 20, 2020</p>
          </div>
          <div className=" bg-orange-50 shadow-lg gap-5  flex justify-around py-2 flex-col">
            <div className="flex lg:justify-between lg:px-2 w-full justify-between px-1">
              <div>
                <div className="flex h-5 gap-1">
                  <div className="p-4 bg-black rounded-full"></div>
                  <div className="flex flex-col ">
                    {" "}
                    <p className=" text-xs font-semibold">foodhub</p>
                    <p className=" text-xs">Tokyu, japan</p>
                  </div>
                </div>
              </div>
              <div className="text-lg">
                <HiDotsHorizontal />
              </div>
            </div>
            <img
              src="https://foodandrecipes.blog/wp-content/uploads/2024/04/Default_Delicious_Shrimp_Dinner_Recipes_to_Satisfy_Your_Taste_2.jpg"
              alt=""
              className=" object-cover w-full h-36 xl:h-56"
            />
            <div className="flex justify-between p-1">
              <div className="flex gap-1 lg:text-2xl">
                <FaRegHeart />
                <BiMessageRounded />
                <PiTelegramLogo />
              </div>

              <CgPentagonUp />
            </div>
            <p className="text-xs  text-gray-500 p-1">Semtember 20, 2020</p>
          </div>
        </div>
        <button className=" bg-black flex items-center justify-around px-2 text-white md:w-40 md:py-4 py-3 w-36 rounded-2xl text-xs mt-4">
          <p className="">Visit on Instagram</p>
          <FaInstagram className="text-white text-xl" />
        </button>
      </div>
      <div className=" flex flex-col p-4 md:justify-center md:gap-5 bg-white">
        <div className="lg:px-16 lg:grid lg:grid-cols-2 lg:items-center xl:py-7">
          <p className="text-md font-bold p-4 md:py-6 md:text-3xl lg:text-3xl ">
            Try this delecious recipe to make your day
          </p>
          <p className="text-xs pb-4 px-4 md:text-sm">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            posuere lorem nec facilisis hendrerit. Sed semper euismod
            ullamcorper.
          </p>
        </div>
        <div className="grid grid-cols-2 px-3 gap-4 md:grid-cols-3 lg:gap-6 lg:px-20 lg:grid-cols-4  ">
          <div className=" flex flex-col gap-3 py-3 justify-between  rounded-2xl">
            {" "}
            <div className=" flex flex-col">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsE8_SUC8DgFeqGGKmTrcMNNJPiFlem4h5Vg&s"
                alt=""
                className="object-cover h-36 md:h-48 xl:h-52 w-full "
              />
            </div>
            <p className="text-xs lg:text-lg font-bold xl:p-1">
              Mixied Tropical Salad with Suoerfood Boost
            </p>
            <div className="flex justify-between px-1 lg:text-2xl xl:p-1">
              <div className="flex gap-1 items-center">
                <IoTimer />
                <p className="text-xs lg:text-sm">30m</p>
              </div>
              <div className="flex gap-1 items-center">
                <PiBowlFoodFill />
                <p className="text-xs">Healty</p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-3 py-3 justify-between  rounded-2xl">
            {" "}
            <div className=" flex flex-col">
              <img
                src="https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0__FillWzExNzAsNTgzXQ.jpg"
                alt=""
                className="object-cover h-36 md:h-48 xl:h-52 w-full "
              />
            </div>
            <p className="text-xs lg:text-lg font-bold xl:p-1">
              Big Wagyu Cheese Burger
            </p>
            <div className="flex justify-between px-1 lg:text-2xl xl:p-1">
              <div className="flex gap-1 items-center">
                <IoTimer />
                <p className="text-xs lg:text-sm">30m</p>
              </div>
              <div className="flex gap-1 items-center">
                <PiBowlFoodFill />
                <p className="text-xs">Western</p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-3 py-3 justify-between  rounded-2xl">
            {" "}
            <div className=" flex flex-col">
              <img
                src="https://messywitchen.com/wp-content/uploads/2015/07/Cincalok-Fried-Rice-With-Corn-Asparagus.jpg"
                alt=""
                className="object-cover h-36 md:h-48 xl:h-52 w-full "
              />
            </div>
            <p className="text-xs lg:text-lg font-bold xl:p-1">
              Heathy Japanese Fried Rice with Asparagus
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
                className="object-cover h-36 md:h-48 xl:h-52 w-full "
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
          {/* //// sadsadsad*/}
          <div className=" flex flex-col gap-3 py-3 justify-between  rounded-2xl">
            {" "}
            <div className=" flex flex-col">
              <img
                src="https://i.pinimg.com/736x/1b/6f/cf/1b6fcf68843311ca79b1ef042627e34d.jpg"
                alt=""
                className="object-cover h-36 md:h-48 xl:h-52 w-full "
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
          {/* sadssssssssssssssa */}
          {/* //// sadsadsad*/}
          <div className=" flex flex-col gap-3 py-3 justify-between  rounded-2xl">
            {" "}
            <div className=" flex flex-col">
              <img
                src="https://www.allrecipes.com/thmb/_QlXcALXmJwnkIVRthr_6ux-XIg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/176132-slow-cooker-buffalo-chicken-sandwiches-DDMFS-4x3-340-8946a0eef3a242e18746425348cd17dc.jpg"
                alt=""
                className="object-cover h-36 md:h-48 xl:h-52 w-full "
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
          {/* sadssssssssssssssa */}
          {/* //// sadsadsad*/}
          <div className=" flex flex-col gap-3 py-3 justify-between  rounded-2xl">
            {" "}
            <div className=" flex flex-col">
              <img
                src="https://veganwithgusto.com/wp-content/uploads/2022/03/PF-Chang-copycat-vegan-lettuce-wraps.jpg"
                alt=""
                className="object-cover h-36 md:h-48 xl:h-52 w-full "
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
          {/* sadssssssssssssssa */}
          {/* //// sadsadsad*/}
          <div className=" flex flex-col gap-3 py-3 justify-between  rounded-2xl">
            {" "}
            <div className=" flex flex-col">
              <img
                src="https://food-images.files.bbci.co.uk/food/recipes/chicken_miso_and_49410_16x9.jpg"
                alt=""
                className="object-cover h-36 md:h-48 xl:h-52 w-full "
              />
            </div>
            <p className="text-xs lg:text-lg font-bold xl:p-1">
              Chicken Ramen Soup with Mushroom
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
          {/* sadssssssssssssssa */}
        </div>
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
    </>
  );
}
