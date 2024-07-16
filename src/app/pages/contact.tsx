/* eslint-disable @next/next/no-img-element */
import React from "react";
import MoreRecipe from "./components/more-recipe";

export default function contact() {
  return (
    <>
      <div className="bg-white w-full h-5/6 flex p-3 pb-96 flex-col items-center gap-4 md:gap-8 md:py-8 lg:px-24  md:h-screen lg:py-28">
        <p className="text-xl font-bold text bg-center md:text-4xl lg:text-6xl">
          Contact us
        </p>
        <div className="w-full relative lg:gap-5 lg:flex">
          <div className="lg:w-1/3">
            <img
              src="https://filebroker-cdn.lazada.com.ph/kf/Sa2549cb736414f8fbb70d9cff56d3231v.jpg"
              alt=""
              className="object-conver w-full lg:h-full  rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 w-full lg:w-2/3 gap-3 py-8 p-4 md:gap-x-12 md:px-10 lg:gap-4 absolute lg:static top-3/4 lg:top-0 bg-white shadow-md rounded-2xl ">
            <div className="flex  flex-col">
              <p className="text-sm text-gray-500">NAME</p>
              <input
                type="text"
                placeholder="Enter your name.."
                className=" border rounded-xl p-2 lg:p-4"
              />
            </div>{" "}
            <div className="flex  flex-col">
              <p className="text-sm text-gray-500">EMAIL ADDRESS</p>
              <input
                type="text"
                placeholder="Your email address.."
                className=" border rounded-xl p-2 lg:p-4"
              />
            </div>{" "}
            <div className="flex  flex-col">
              <p className="text-sm text-gray-500">NAME</p>
              <input
                type="text"
                placeholder="Enter your name.."
                className=" border rounded-xl p-2 lg:p-4"
              />
            </div>{" "}
            <div className="flex  flex-col">
              <p className="text-sm text-gray-500">ENQUIRY TYPE</p>
              <input
                type="text"
                placeholder="Enter your enquiry.."
                className=" border rounded-xl p-2 lg:p-4"
              />
            </div>{" "}
            <div className="flex flex-col w-full col-span-2">
              <p className="text-sm text-gray-500">MESSAGES</p>
              <textarea
                placeholder="Enter your messages"
                className="border-2 rounded-xl p-2 h-32"
              />
            </div>
            <button className="bg-black p-2 rounded-2xl mr-7 lg:p-4 lg:mr-28 cols text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white p-3 lg:py-28 flex flex-col md:gap-4 ">
        <p className=" text-lg text-center font-bold md:text-2xl">
          Checkout this recipe too
        </p>
        <MoreRecipe />
      </div>
    </>
  );
}
