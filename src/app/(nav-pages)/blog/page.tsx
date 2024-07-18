/* eslint-disable @next/next/no-img-element */
import React from "react";
import Email from "../../props/email";

export default function blog() {
  return (
    <>
      <div className="bg-white text-black p-3 py-10 flex items-center justify-center flex-col gap-3 md:gap-5">
        <p className="text-xl font-bold text-center py-3 md:text-2xl">
          Blog & Article
        </p>
        <p className="text-xs md:text-sm">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          posuere lorem nec facilisis hendrerit. Sed semper euismod ullamcorper.
        </p>
        <div className="flex relative justify-center items-center md:w-1/2 lg:w-2/5 w-4/5 pb-6">
          <input
            type="text"
            placeholder="Search article, blog..."
            className=" bg-white rounded-lg p-3 md:p-5 md:w-full border-2 text-sm w-full "
          />
          <button className="bg-black rounded-xl text-white px-5 p-2 md:p-3 text-sm absolute right-1">
            Search
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 px-3 w-full  ">
          {/* recipew */}
          <div className="flex flex-col gap-9 md:grid md:grid-cols-3 lg:flex lg:w-2/3">
            <div className="flex gap-6 flex-col lg:flex-row w-full">
              {" "}
              <img
                src="https://media.licdn.com/dms/image/D4D12AQHc3-t1uMYaTA/article-cover_image-shrink_720_1280/0/1678770597739?e=2147483647&v=beta&t=fGZNpn8q_XLeCmfmywCm2YWgUPVsToQTocbhBSOxHLE"
                alt=""
                className=" h-48 lg:w-1/3  object-cover rounded-2xl "
              />
              <div className="flex flex-col gap-3 lg:justify-around lg:w-2/3">
                <p className="text-sm font-bold lg:text-xl">
                  Chrocet Projects for Noodle Lovers
                </p>
                <p className="text-xs lg:text-sm">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent posuere lorem nec facilisis hendrerit. Sed semper
                  euismod ullamcorper.
                </p>
                <div className="flex gap-3 w-full">
                  <div className="flex items-center gap-2">
                    {" "}
                    <img
                      src="https://facts.net/wp-content/uploads/2023/11/14-unbelievable-facts-about-riley-reid-1699614442.jpg"
                      alt=""
                      className="object-cover w-8 h-8 rounded-full"
                    />
                    <p className="text-xs font-bold">Rilley Reid</p>
                  </div>
                  <p className="text-xs border-l-2 flex items-center justify-center px-3">
                    {" "}
                    12 November 2023
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-6 flex-col lg:flex-row w-full">
              {" "}
              <img
                src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
                alt=""
                className=" h-48 lg:w-1/3  object-cover rounded-2xl "
              />
              <div className="flex flex-col gap-3 lg:justify-around lg:w-2/3">
                <p className="text-sm font-bold lg:text-xl">
                  10 Vegetarian Recipes to Eat this Month
                </p>
                <p className="text-xs lg:text-sm">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent posuere lorem nec facilisis hendrerit. Sed semper
                  euismod ullamcorper.
                </p>
                <div className="flex gap-3 w-full">
                  <div className="flex items-center gap-2">
                    {" "}
                    <img
                      src="https://images.squarespace-cdn.com/content/v1/656f4e4dababbd7c042c4946/82bec838-05c8-4d68-b173-2284a6ad4e52/how-to-stop-being-a-people-pleaser"
                      alt=""
                      className="object-cover w-8 h-8 rounded-full"
                    />
                    <p className="text-xs font-bold">Robert Fox</p>
                  </div>
                  <p className="text-xs border-l-2 flex items-center justify-center px-3">
                    {" "}
                    1 September 2023
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-6 flex-col lg:flex-row w-full">
              {" "}
              <img
                src="https://htn.com.au/wp-content/uploads/2018/02/PP18-DIPLOMA-IN-PROFESSIONAL-CHEF.jpg"
                alt=""
                className=" h-48 lg:w-1/3  object-cover rounded-2xl "
              />
              <div className="flex flex-col gap-3 lg:justify-around lg:w-2/3">
                <p className="text-sm font-bold lg:text-xl">
                  A Full Guide to Becoming a Profissional Chief
                </p>
                <p className="text-xs lg:text-sm">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent posuere lorem nec facilisis hendrerit. Sed semper
                  euismod ullamcorper.
                </p>
                <div className="flex gap-3 w-full">
                  <div className="flex items-center gap-2">
                    {" "}
                    <img
                      src="https://static.wixstatic.com/media/11062b_2bc17312e4e7446789a2beddf08f75b6~mv2_d_6016_4016_s_4_2.jpg/v1/fill/w_980,h_654,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_2bc17312e4e7446789a2beddf08f75b6~mv2_d_6016_4016_s_4_2.jpg"
                      alt=""
                      className="object-cover w-8 h-8 rounded-full"
                    />
                    <p className="text-xs font-bold">Rilley Reid</p>
                  </div>
                  <p className="text-xs border-l-2 flex items-center justify-center px-3">
                    {" "}
                    12 November 2023
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-6 flex-col lg:flex-row w-full">
              {" "}
              <img
                src="https://i.pinimg.com/236x/69/cc/df/69ccdff84ab1201ec5de30de9a528d12.jpg"
                alt=""
                className=" h-48 lg:w-1/3  object-cover rounded-2xl "
              />
              <div className="flex flex-col gap-3 lg:justify-around lg:w-2/3">
                <p className="text-sm font-bold lg:text-xl">
                  Simple and DeleciousVegetarian Lagania
                </p>
                <p className="text-xs lg:text-sm">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent posuere lorem nec facilisis hendrerit. Sed semper
                  euismod ullamcorper.
                </p>
                <div className="flex gap-3 w-full">
                  <div className="flex items-center gap-2">
                    {" "}
                    <img
                      src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg"
                      alt=""
                      className="object-cover w-8 h-8 rounded-full"
                    />
                    <p className="text-xs font-bold">Robert weid</p>
                  </div>
                  <p className="text-xs border-l-2 flex items-center justify-center px-3">
                    {" "}
                    12 November 2023
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-6 flex-col lg:flex-row w-full">
              {" "}
              <img
                src="https://i.ytimg.com/vi/FDW2A7Q8heM/maxresdefault.jpg"
                alt=""
                className=" h-48 lg:w-1/3  object-cover rounded-2xl "
              />
              <div className="flex flex-col gap-3 lg:justify-around lg:w-2/3">
                <p className="text-sm font-bold lg:text-xl">
                  Plantain and Pinto stew Aji Verde
                </p>
                <p className="text-xs lg:text-sm">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent posuere lorem nec facilisis hendrerit. Sed semper
                  euismod ullamcorper.
                </p>
                <div className="flex gap-3 w-full">
                  <div className="flex items-center gap-2">
                    {" "}
                    <img
                      src="https://xsgames.co/randomusers/assets/avatars/male/74.jpg"
                      alt=""
                      className="object-cover w-8 h-8 rounded-full"
                    />
                    <p className="text-xs font-bold">John Angelo</p>
                  </div>
                  <p className="text-xs border-l-2 flex items-center justify-center px-3">
                    {" "}
                    4 April 2023
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-6 flex-col lg:flex-row w-full">
              {" "}
              <img
                src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
                alt=""
                className=" h-48 lg:w-1/3  object-cover rounded-2xl "
              />
              <div className="flex flex-col gap-3 lg:justify-around lg:w-2/3">
                <p className="text-sm font-bold lg:text-xl">
                  Chrocet Projects for Noodle Lovers
                </p>
                <p className="text-xs lg:text-sm">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent posuere lorem nec facilisis hendrerit. Sed semper
                  euismod ullamcorper.
                </p>
                <div className="flex gap-3 w-full">
                  <div className="flex items-center gap-2">
                    {" "}
                    <img
                      src="https://facts.net/wp-content/uploads/2023/11/14-unbelievable-facts-about-riley-reid-1699614442.jpg"
                      alt=""
                      className="object-cover w-8 h-8 rounded-full"
                    />
                    <p className="text-xs font-bold">Rilley Reid</p>
                  </div>
                  <p className="text-xs border-l-2 flex items-center justify-center px-3">
                    {" "}
                    12 November 2023
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className=" w-full flex flex-col lg:w-1/3">
            <p className="text-lg font-bold md:text-2xl py-6 lg:py-0 lg:pb-5 text-start">
              Tasty Recipe
            </p>{" "}
            <div className="flex w-full  max-w-full overflow-y-auto gap-3 py-2 border-b-2 items-center justify-center">
              <div className="flex gap-6 w-full lg:flex-col lg:gap-10">
                {" "}
                <div className="flex w-48 lg:w-auto gap-3 flex-shrink-0 ">
                  <img
                    src="https://cdn.ruled.me/wp-content/uploads/2021/01/Chicken-Meatball-in-Tomato-Cream-Sauce-Featured.jpg"
                    alt=""
                    className=" object-cover w-24 h-28 lg:w-32 rounded-2xl"
                  />
                  <div className="flex flex-col justify-around">
                    <p className="text-xs font-bold lg:text-lg">
                      Chiken Meatballs with Cream Cheese
                    </p>
                    <p className="text-xs lg:text-sm">By Mia Kalifa</p>
                  </div>
                </div>
                <div className="flex w-48 lg:w-auto gap-3 flex-shrink-0 ">
                  <img
                    src="https://cdn.ruled.me/wp-content/uploads/2021/01/Chicken-Meatball-in-Tomato-Cream-Sauce-Featured.jpg"
                    alt=""
                    className=" object-cover w-24 h-28 lg:w-32 rounded-2xl"
                  />
                  <div className="flex flex-col justify-around">
                    <p className="text-xs font-bold lg:text-lg">
                      Chiken Meatballs with Cream Cheese
                    </p>
                    <p className="text-xs lg:text-sm">By Mia Kalifa</p>
                  </div>
                </div>
                <div className="flex w-48 lg:w-auto gap-3 flex-shrink-0 ">
                  <img
                    src="https://cdn.ruled.me/wp-content/uploads/2021/01/Chicken-Meatball-in-Tomato-Cream-Sauce-Featured.jpg"
                    alt=""
                    className=" object-cover w-24 h-28 lg:w-32 rounded-2xl"
                  />
                  <div className="flex flex-col justify-around">
                    <p className="text-xs font-bold lg:text-lg">
                      Chiken Meatballs with Cream Cheese
                    </p>
                    <p className="text-xs lg:text-sm">By Mia Kalifa</p>
                  </div>
                </div>
                <div className="flex w-48 lg:w-auto gap-3 flex-shrink-0 ">
                  <img
                    src="https://cdn.ruled.me/wp-content/uploads/2021/01/Chicken-Meatball-in-Tomato-Cream-Sauce-Featured.jpg"
                    alt=""
                    className=" object-cover w-24 h-28 lg:w-32 rounded-2xl"
                  />
                  <div className="flex flex-col justify-around">
                    <p className="text-xs font-bold lg:text-lg">
                      Chiken Meatballs with Cream Cheese
                    </p>
                    <p className="text-xs lg:text-sm">By Mia Kalifa</p>
                  </div>
                </div>
                <div className="flex w-48 lg:w-auto gap-3 flex-shrink-0 ">
                  {" "}
                  <img
                    src="https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/6409a5c803a061001d9a01c0.webp"
                    alt=""
                    className="object-cover h-28 lg:h-auto w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Email />
    </>
  );
}
