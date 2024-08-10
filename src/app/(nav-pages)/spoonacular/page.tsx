/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import { LuVegan } from "react-icons/lu";
import { GiMeat } from "react-icons/gi";
import { FaIceCream } from "react-icons/fa";
import { GiSewedShell } from "react-icons/gi";
import { FcLike } from "react-icons/fc";
import Poster from "@/api/poster";
import { FaArrowRight } from "react-icons/fa6";
import { TiArrowUpThick } from "react-icons/ti";
import Loading from "@/lottie/loading.json";
import World from "@/lottie/worldwide.json";
import Lottie from "react-lottie";

import Link from "next/link";
import { useStore } from "@/zustand/storeRecipe";
import Navagation from "@/app/components/Navagation";

export default function GenerateRecipe() {
  interface Ingredient {
    id: number;
    amount: number;
    unit: string;
    unitLong: string;
    unitShort: string;
    aisle: string;
    name: string;
    original: string;
    originalName: string;
    meta: string[];
    image: string;
    extendedName?: string;
  }

  interface Recipe {
    id: number;
    title: string;
    likes: number;
    image: string;
    imageType: string;
    usedIngredientCount: number;
    missedIngredientCount: number;
    missedIngredients: Ingredient[];
  }
  const [generatedRecipe, setGeneratedRecipe] = React.useState<Recipe[]>([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const recipes = useStore((state) => state.recipes);
  const setRecipes = useStore((state) => state.setRecipes);

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: World,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const getRecipe = async (search: string) => {
    try {
      setLoading(true);

      const data = await Poster.getGeneratedRecipe(search);
      console.log("get recipes api execute");
      setGeneratedRecipe(data.response);
      setRecipes(data.response);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const loadRecipeFromStorage = () => {
    console.log(recipes);
    if (recipes.length) {
      setGeneratedRecipe(recipes);
    }
  };
  useEffect(() => {
    loadRecipeFromStorage();
  }, [search, recipes, setRecipes]);
  return (
    <>
      <Navagation />

      <div className="bg-white">
        <div className="flex flex-col lg:grid lg:grid-cols-12">
          {/* Left sidebar */}
          <div className="w-full lg:col-span-3 lg:h-screen lg:sticky lg:top-0 lg:bg-base-mid  md:bg-white border md:p-4 lg:p-8 md:px-16 px-4 pt-1">
            <div className="flex flex-col gap-6 lg:gap-10">
              <div className="hidden lg:flex flex-col">
                <p className="text-xs">powered by</p>
                <p className="text-md font-bold text-green-600">
                  SPOONCULAR API
                </p>
              </div>
              <p className="text-2xl font-bold text-center hidden lg:block">
                SPOONCULAR
              </p>

              <div className="flex gap-3 lg:gap-8   flex-row lg:flex-col items-center lg:w-full ">
                {" "}
                <div className="flex lg:flex-col  lg:items-center gap-2 lg:gap-10 lg:w-full ">
                  <img
                    src="https://play-lh.googleusercontent.com/uOZlIZUJ7R79qs_J_a9cdxrJaGhHwqKTmika25Lp1vTeC1qe9lPQF5jalEFc8Htk7nQ"
                    alt=""
                    className="object-cover md:h-12 md:w-12  hidden rounded-full"
                  />

                  <div className="lg:grid hidden grid-cols-2 items-center gap-2 w-full ">
                    <div className="p-2 rounded-xl shadow flex justify-center items-center flex-col">
                      <LuVegan className="text-3xl" />
                      <p>Vegan</p>
                    </div>
                    <div className="p-2  rounded-xl shadow flex justify-center items-center flex-col">
                      <GiMeat className="text-3xl" />
                      <p>Meat</p>
                    </div>
                    <div className="p-2 rounded-xl shadow flex justify-center items-center flex-col">
                      <FaIceCream className="text-3xl" />
                      <p>Dessert</p>
                    </div>
                    <div className="p-2  rounded-xl shadow flex justify-center items-center flex-col">
                      <GiSewedShell className="text-3xl" />
                      <p>SeaFood</p>
                    </div>
                  </div>
                </div>
                <p className="lg:hidden md:flex">Search</p>
                <div className="relative w-full lg:w-auto">
                  <textarea
                    className="w-full rounded pl-2 pr-16 py-2 text-sm lg:text-lg shadow lg:shadow-none border-2 lg:border-none border-gray-200 resize-none md:h-12 h-10 lg:h-24"
                    placeholder="Enter your description"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        getRecipe(search);
                      }
                    }}
                  ></textarea>

                  {search && (
                    <button
                      onClick={() => getRecipe(search)}
                      className="absolute right-2 top-2 bg-base-dark text-white md:p-2 p-1 lg:p-3 rounded transition duration-200 ease-in-out hover:scale-110"
                    >
                      <TiArrowUpThick />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-9 w-full md:p-16 lg:p-8 p-4 py-6 ">
            {generatedRecipe.length === 0 ? (
              <div className="h-screen flex flex-col items-center md:p-16 p-4">
                <p className="text-sm lg:text-3xl font-bold text-center">
                  "Explore a vast database of recipes from around the world
                  tailored to your personal preferences."
                </p>
                <Lottie options={defaultOptions} height={300} width={300} />
              </div>
            ) : !loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4">
                {generatedRecipe &&
                  generatedRecipe.map((recipe, index) => (
                    <>
                      {" "}
                      <Link href={`/spoonacular/${recipe.id}`}>
                        <div
                          key={index}
                          className="flex flex-col w-full max-w-sm md:h-96 h-48 md:pb-6 pb-2 rounded-2xl shadow transition-all duration-300 hover:shadow-lg hover:bg-orange-50"
                        >
                          <div className="flex-grow relative">
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              className="absolute inset-0 w-full md:h-56 h-28 object-cover rounded-lg"
                            />
                          </div>
                          <h2 className="md:text-lg lg:text-xl text-xs font-bold md:my-4 -my-2 px-4 lg:px-6 line-clamp-2 flex-shrink-0">
                            {recipe.title}
                          </h2>

                          <div className="flex items-center justify-between px-4 lg:px-6 text-sm mt-4 flex-shrink-0">
                            <div className="flex items-center gap-2">
                              <FcLike className="text-xl lg:text-2xl" />
                              <span className="text-xs md:text-lg">
                                {recipe.likes} loves
                              </span>
                            </div>

                            <button className="bg-base-dark hidden text-white p-2 lg:p-3 rounded-lg md:flex items-center gap-2 text-sm">
                              View Recipe
                              <FaArrowRight />
                            </button>
                            <p className="text-blue-600 hover:underline text-xs flex md:hidden">
                              View
                            </p>
                          </div>
                        </div>
                      </Link>
                    </>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center  h-screen w-full">
                <Lottie options={defaultOptions2} height={300} width={300} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
