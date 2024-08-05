/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import Email from "../../props/email";
import getPoster from "@/api/poster";
import { MdClear } from "react-icons/md";
import { TiArrowUpThick } from "react-icons/ti";
import { IoMdArrowDropright } from "react-icons/io";
import Navagation from "@/app/components/Navagation";

export default function blog() {
  interface Content {
    name: string;
    description: string;
    img: string;
    content: string;
  }
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [content, setContent] = React.useState<Content[]>([]);
  const [seeMoreStates, setSeeMoreStates] = React.useState<
    Record<number, boolean>
  >(content.reduce((acc, _, index) => ({ ...acc, [index]: false }), {}));
  const toggleSeeMore = (index: number) => {
    setSeeMoreStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const getArticle = async () => {
    try {
      const data = await getPoster.getArticle();
      setContent(data.response);
    } catch (error) {
      throw error;
    }
  };

  const handleSeach = async (params: string) => {
    try {
      setLoading(true);
      let response;
      if (!params) {
        // getPoster();
      } else {
        // response = await Poster.searchRecipe(params);
        // setPoster(response.response);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getArticle();
  }, []);
  return (
    <>
      <Navagation />
      <main className="bg-white lg:px-64 md:px-12 px-4 ">
        <p className="md:text-2xl text-xl font-bold text-center pt-5">
          Blog & Article
        </p>
        <div className="p-2   ">
          <div className="md:py-4 py-2 relative">
            <input
              type="text"
              className="w-full rounded-2xl md:h-16 h-10 pl-6 pr-32 border md:text-lg text-xs lg:shadow-none shadow"
              placeholder="search blog, article.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSeach(search);
                }
              }}
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                }}
                className="absolute text-gray-400 right-24 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition duration-200 ease-in-out hover:bg-gray-100"
              >
                <MdClear className="text-xl" />
              </button>
            )}
            <button
              onClick={() => {
                handleSeach(search);
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-base-dark text-white md:px-6 px-3 md:py-3 py-1 rounded-2xl transition duration-200 ease-in-out hover:scale-105"
            >
              <p>Search</p>
            </button>
          </div>
        </div>
        {/* ///content */}
        {content.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:gap-6 gap-2 py-12 border-b"
          >
            <p className="md:text-4xl text-lg font-bold text-center">
              {item.name}
            </p>
            <div className="flex items-center justify-center">
              <div className="flex gap-3 justify-center items-center border-r-2 px-4 border-gray-300">
                <img
                  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2f28ace6-0150-416c-b4d5-6a8fd665ebaa/dftlaes-401ae24d-7b5a-4fbf-b9b3-28e3eac30603.png/v1/fill/w_1280,h_1319,q_80,strp/20230405_johndoe_by_smallbcarly_dftlaes-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTMxOSIsInBhdGgiOiJcL2ZcLzJmMjhhY2U2LTAxNTAtNDE2Yy1iNGQ1LTZhOGZkNjY1ZWJhYVwvZGZ0bGFlcy00MDFhZTI0ZC03YjVhLTRmYmYtYjliMy0yOGUzZWFjMzA2MDMucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Z4LKmeCMrrrdedXsOcStfmdfusqJXqo6D2AA9svICj0"
                  alt=""
                  className="object-cover h-8 w-8 rounded-full"
                />
                <p className="text-xs font-bold">JOHN DOE</p>
              </div>
              <p className="text-xs px-4">March 2022 22</p>
            </div>
            <img
              src={item.img}
              alt=""
              className="object-cover w-full md:h-96 h-72"
            />
            <div>
              <p
                className={`md:text-sm text-xs ${
                  !seeMoreStates[index] ? "line-clamp-2" : ""
                }`}
              >
                {item.description}
              </p>

              {seeMoreStates[index] && (
                <div className="mt-4">
                  <div className="border-b py-3">
                    <p className="col-span-11 md:text-sm text-xs">
                      {item.content}
                    </p>
                  </div>
                </div>
              )}

              <span
                onClick={() => toggleSeeMore(index)}
                className="text-blue-600 cursor-pointer md:text-sm text-xs hover:underline mt-2 inline-block"
              >
                {seeMoreStates[index] ? "See less" : "...See more"}
              </span>
            </div>
          </div>
        ))}
        <p className="p-4 text-center">End of Content</p>
      </main>
    </>
  );
}
