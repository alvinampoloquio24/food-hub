"use client";

import React, { useState } from "react";
import { MdClear } from "react-icons/md";

function Search() {
  const [search, setSearch] = useState("");

  const handleSearch = async (params: string) => {
    try {
      if (!params) {
        // getPoster();
      } else {
        // const response = await Poster.searchRecipe(params);
        // setPoster(response.response);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="p-2">
      <div className="md:py-4 py-2 relative">
        <input
          type="text"
          className="w-full bg-base-white rounded-2xl md:h-16 h-10 pl-6 pr-32 border md:text-lg text-xs lg:shadow-none shadow"
          placeholder="Search blog, article..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(search);
            }
          }}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute text-gray-400 right-24 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition duration-200 ease-in-out hover:bg-gray-100"
          >
            <MdClear className="text-xl" />
          </button>
        )}
        <button
          onClick={() => handleSearch(search)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-base-dark text-white md:px-6 px-3 md:py-3 py-1 rounded-2xl transition duration-200 ease-in-out hover:scale-105"
        >
          <p>Search</p>
        </button>
      </div>
    </div>
  );
}

export default Search;
