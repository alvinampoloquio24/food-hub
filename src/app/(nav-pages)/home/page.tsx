/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa6";
import { BiMessageRounded } from "react-icons/bi";
import { PiTelegramLogo } from "react-icons/pi";
import { IoTimer } from "react-icons/io5";
import { CgPentagonUp } from "react-icons/cg";
import { PiBowlFoodFill } from "react-icons/pi";
import Poster from "../../../api/poster";
import HotRecipe from "./(props)/swipper";
import Link from "next/link";
import Cards from "./(props)/cards";
import Category from "./(props)/category";
import { Suspense } from "react";
const fetchData = async () => {
  try {
    const response: any = await Poster.get();

    return response.response.items;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export default async function Home() {
  const poster = await fetchData();

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {" "}
        <HotRecipe poster={poster} />
      </Suspense>
      <div className=" bg-base-white flex flex-col  p-6 py-12 xl:p-24 lg:p-16 gap-8 lg:mt-0 text-text-color">
        <div className=" flex gap-4 md:gap-6  flex-col mb-10 ">
          {" "}
          <p className=" text-3xl font-bold md:text-5xl text-base-dark lg:text-6xl">
            Irresistible Culinary Delights Await You
          </p>
          <p className="lg:text-lg">
            Explore an array of mouthwatering food options that cater to every
            palate. Discover delectable dishes crafted with care and bursting
            with flavor.
          </p>
          <Category />
        </div>
      </div>
      <div className=" bg-base-white flex flex-col items-center text-text-color">
        <p className=" text-2xl font-bold pt-16 text-base-dark md:text-3xl lg:text-5xl">
          Simple and tasty recipes
        </p>
        <p className="text-xs md:text-sm lg:text-sm  p-5 lg:px-72 text-center lg:mb-10">
          Discover easy-to-make recipes that don't compromise on flavor. Enjoy
          cooking delicious meals with minimal effort and maximum taste.
        </p>

        <div className=" grid h-auto grid-cols-2 md:grid-cols-3 p-4 gap-4 lg:gap-16">
          {" "}
          <Suspense fallback={<div>Loading...</div>}>
            <Cards poster={poster} />
          </Suspense>
        </div>
      </div>

      <div className="bg-base-white h-screen flex items-center justify-center pt-5">
        {" "}
        <div className="md:grid-cols-2 grid h-5/6 bg-base-white w-full md:mx-16 md:rounded-2xl text-text-color ">
          <div className="flex flex-col lg:px-8 px-6 justify-center md:gap-8 gap-3">
            <p className="md:text-4xl text-lg text-base-dark font-bold">
              Unleash your inner chef with FoodHub's recipes
            </p>
            <p className="lg:text-md text-xs">
              Discover, create, and share culinary masterpieces with our vibrant
              community. From quick weeknight dinners to gourmet feasts, FoodHub
              empowers you to explore new flavors, perfect techniques, and
              celebrate the joy of cooking. Join us and turn your kitchen into a
              world of delicious possibilities.
            </p>
            <img
              src="https://img.freepik.com/premium-photo/food-cooking-profession-people-concept-happy-male-chef-cook-serving-cleaning-plate_763111-6938.jpg"
              alt=""
              className=" h-full object-cover w-full md:rounded-r-2xl md:hidden"
            />
            <button className=" bg-base-dark text-white md:w-36 md:py-4 py-3 w-28 rounded-2xl text-xs">
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
      <div className=" bg-base md:h-screen md:items-center lg:h-screen bg-base-white flex flex-col xl:px-20 px-6 py-6 lg:gap-8 md:justify-center">
        <p className="text-lg md:text-2xl text-base-dark font-semibold py-2 text-center xl:text-4xl">
          Checkout out @foodhub on Instagram
        </p>
        <p className="text-xs text-text-color md:text-lg text-center py-2 md:py-3 lg:px-20">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          posuere lorem nec facilisis hendrerit. Sed semper euismod ullamcorper.
        </p>

        <div className="grid grid-cols-2 gap-2  md:gap-6 py-2 md:grid-cols-3 lg:grid-cols-4  lg:gap-7 ">
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
        <button className=" bg-base-dark flex items-center justify-around px-2 text-white md:w-40 md:py-4 py-3 w-36 rounded-2xl text-xs mt-4">
          <p className="">Visit on Instagram</p>
          <FaInstagram className="text-white text-xl" />
        </button>
      </div>
      <div className=" flex flex-col text-text-color  p-4 md:justify-center md:gap-5 bg-base-white">
        <div className="lg:px-16 lg:grid lg:grid-cols-2 lg:items-center xl:py-7">
          <p className="text-md font-bold p-4 md:py-6 md:text-3xl lg:text-3xl ">
            Try this delecious recipe to make your day
          </p>
          <p className="text-xs pb-4 px-4 md:text-sm">
            Try this delicious recipe to brighten your day! Our Fresh and
            Healthy Mixed Mayonnaise Salad is packed with crisp vegetables and a
            creamy dressing, making it a perfect blend of flavors and textures.
            It's an easy and refreshing way to enjoy a nutritious meal.
          </p>
        </div>
        <div className="grid grid-cols-2 px-3 gap-4 md:grid-cols-3 lg:gap-6 lg:px-20 lg:grid-cols-4  ">
          {poster?.map((poster: any, index: any) => (
            <Link key={index} href={`/recipe/${poster._id}`}>
              <div
                key={index}
                className=" flex flex-col gap-3 py-3 justify-between  rounded-2xl transition-transform duration-200 transform  hover:scale-105"
              >
                {" "}
                <div className=" flex flex-col">
                  <img
                    src={poster.img}
                    alt=""
                    className="object-cover h-36 md:h-48 xl:h-52 w-full "
                  />
                </div>
                <div className=" lg:h-32 h-20  flex flex-col  justify-around ">
                  {" "}
                  <p className="text-xs lg:text-lg font-bold xl:p-1 truncate ">
                    {poster.name}
                  </p>
                  <div className="flex justify-around px-1 lg:text-2xl xl:p-1">
                    <div className="flex gap-1 items-center">
                      <IoTimer />
                      <p className="text-xs lg:text-sm">{poster.time}</p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <PiBowlFoodFill />
                      <p className="text-xs">{poster.dishType}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className=" flex bg-base-white justify-center items-center py-5 lg:px-20 lg:py-32">
        <div className="bg-base text-text-color p-10 w-full bg-base-mid shadow mx-3 justify-center items-center lg:py-20 xl:py32 flex-col gap-5 flex rounded-3xl ">
          <p className="text-lg font-bold text-base-dark py-2 md:text-3xl lg:text-4xl">
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
              className=" bg-base-white rounded-lg p-3 md:p-5 md:w-full "
            />
            <button className="bg-base-dark rounded-xl text-white p-2 md:p-3 absolute right-1">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
