import React from "react";
import Image from "next/image";
import bg from "../../../public/bg.jpg";
import Link from "next/link";

export default function Page() {
  return (
    <main className="relative h-screen overflow-hidden">
      <Image
        src={bg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-white bg-opacity-10 h-full w-screen ">
        <div className="md:px-24 md:py-8 px-6 py-8 h-full ">
          <div className="relative flex items-center justify-center">
            {" "}
            <ul className="flex text-xl items-center justify-between absolute w-full  ">
              <li className="font-bold lg:text-2xl md:text-xl text-sm text-white">
                FOOD HUB
              </li>
              <li className="flex md:gap-12 gap-2 lg:text-xl md:text-lg text-xs ">
                <button>What We Provide?</button>
                <button className="hover:underline">Login</button>
                <button className="hover:underline">Sign Up</button>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-12 h-full items-center pb-9">
            <div className="md:col-span-4 lg:col-span-5 col-span-2 "></div>
            <div className=" flex flex-col gap-8 lg:col-span-7 md:col-span-8 col-span-10">
              <div>
                <p className="md:text-7xl text-4xl  font-bold text-base-dark pb-6 border-b-4 border-base-dark">
                  Explore Flavor Paradise
                </p>
              </div>
              <p className="md:text-lg text-sm">
                Explore our handpicked recipes and experience a world of
                flavors! Whether youre cooking for the family or hosting a
                special dinner, our collection offers simple and exciting dishes
                to inspire your culinary adventures. Join us and make every meal
                a delight!
              </p>
              <Link href="/">
                <button className="p-3 md:w-44 w-28 bg-base-dark rounded-2xl text-white md:text-lg text-sm">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
