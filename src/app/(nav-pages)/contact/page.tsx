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
import router, { useRouter } from "next/router";
import Link from "next/link";
import { useStore } from "@/zustand/storeRecipe";

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
      console.log(recipes, "before");
      if (recipes.length == 0) {
        const data = await Poster.getGeneratedRecipe(search);
        setGeneratedRecipe(data.response);
        setRecipes(data.response);
      } else {
        setGeneratedRecipe(recipes);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(recipes, "asdsa");
    // getRecipe(search);
  }, [search, recipes, setRecipes]);
  return (
    <div className="bg-white">
      <div className="grid grid-cols-12">
        {" "}
        {/* Left sidebar */}
        <div className="w-full col-span-3 h-screen sticky top-0  bg-base-mid px-8 py-3">
          <div className="flex gap-10 flex-col">
            <div className="flex flex-col">
              <p className="text-xs">powered by</p>
              <p className="text-md font-bold text-green-600">SPOONCULAR API</p>
            </div>
            <p className="text-2xl font-bold text-center">Recipe Explorer</p>

            <div className="flex flex-col items-center gap-10  justify-center">
              <img
                src="https://play-lh.googleusercontent.com/uOZlIZUJ7R79qs_J_a9cdxrJaGhHwqKTmika25Lp1vTeC1qe9lPQF5jalEFc8Htk7nQ"
                alt=""
                className="object-cover h-12 w-12 rounded-full"
              />
              <div className="grid grid-cols-2 gap-2 w-full">
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
            <div className="md:py-4 py-2 relative">
              <textarea
                className="w-full rounded pl-2 pr-20 py-2 md:text-lg text-xs lg:shadow-none lg:border-none shadow border-2 border-orange-100 resize-none"
                placeholder="Enter your description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    getRecipe(search);
                  }
                }}
                rows={3}
              ></textarea>

              {search ? (
                <button
                  onClick={() => {
                    getRecipe(search);
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-base-dark text-white px-4 py-4 rounded transition duration-200 ease-in-out hover:scale-110"
                >
                  <TiArrowUpThick />
                </button>
              ) : null}
            </div>
          </div>
        </div>
        {/* Main content */}
        {generatedRecipe.length === 0 ? (
          <div className="h-screen col-span-9 w-full px-36 py-24">
            <p className="text-3xl font-bold text-center ">
              "Explore a vast database of recipes from around the world tailored
              to your personal preferences"
            </p>
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        ) : !loading ? (
          <div className="col-span-9 py-16">
            <div className="grid grid-cols-2 gap-4 px-20">
              {generatedRecipe &&
                generatedRecipe.map((recipe, index) => (
                  <div
                    key={index}
                    className="flex flex-col w-full max-w-sm h-96  pb-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-base-light"
                  >
                    <div className="flex-grow relative">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="absolute inset-0 w-full h-56 object-cover rounded-lg"
                      />
                    </div>
                    <h2 className="text-xl font-bold my-4 px-6 line-clamp-2 flex-shrink-0">
                      {recipe.title}
                    </h2>

                    <div className="flex items-center justify-between px-6 text-sm mt-4 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <FcLike className="text-2xl" />
                        <span>{recipe.likes} loves</span>
                      </div>
                      <Link href={`/contact/${recipe.id}`}>
                        <button className="bg-base-dark text-white p-3 rounded-lg flex items-center gap-2">
                          View Recipe
                          <FaArrowRight />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center col-span-9 h-screen w-full">
            <Lottie options={defaultOptions2} height={400} width={400} />
          </div>
        )}
      </div>
    </div>
  );
}
