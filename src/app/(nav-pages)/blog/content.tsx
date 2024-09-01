/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

interface Content {
  name: string;
  description: string;
  img: string;
  content: string;
}
interface ContentProps {
  content: Content[];
}
function Content({ content }: ContentProps) {
  const [seeMoreStates, setSeeMoreStates] = React.useState<
    Record<number, boolean>
  >(content.reduce((acc, _, index) => ({ ...acc, [index]: false }), {}));
  const toggleSeeMore = (index: number) => {
    setSeeMoreStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <div>
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
    </div>
  );
}

export default Content;
