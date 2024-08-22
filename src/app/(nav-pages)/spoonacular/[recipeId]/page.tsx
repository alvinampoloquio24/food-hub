/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import Poster from "@/api/poster";
import DOMPurify from "dompurify";
import { IoTimer } from "react-icons/io5";
import { BiSolidDish } from "react-icons/bi";
import { BiWorld } from "react-icons/bi";
import BackButton from "@/app/props/backButton";

import { FcLike } from "react-icons/fc";
import Link from "next/link";

export default function page({
  params,
}: {
  params: {
    recipeId: string;
  };
}) {
  interface Recipe {
    summary: string;
    image: string;
    instructions: string;
    title: string;
    readyInMinutes: number;
    extendedIngredients: Ingredient[];
    dishTypes: [];
    cuisines: [];
  }
  interface Ingredient {
    amount: number;
    name: string;
    unit: number;
  }
  type Recomend = {
    map(arg0: (recipe: any, index: any) => React.JSX.Element): React.ReactNode;
    id: string;
    image: string;
    title: string;
    likes: number;
  };
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [instructions, setInstructions] = useState("");
  const [summary, setsummary] = useState("");
  const [recipeLocal, setRecipesLocal] = useState<Recomend | undefined>(
    undefined
  );
  const [loading, setLoading] = React.useState(true);
  const sanitize = (params: string) => {
    const sanitizedInstructions = DOMPurify.sanitize(params);
    setInstructions(sanitizedInstructions);
  };

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const recipe = await Poster.searchRecipeSpooncular(params.recipeId);

        setRecipe(recipe.response);
        sanitize(recipe.response.instructions);
        const sanitizedInstructions = DOMPurify.sanitize(
          recipe.response.summary
        );
        setsummary(sanitizedInstructions);
      } catch (error) {
        console.log("error", error);
      }
    };

    if (!recipe) {
      getRecipe();
    }
  }, [params.recipeId]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRecipes = JSON.parse(
        localStorage.getItem("recipe-spoonacular") || "null"
      );
      setRecipesLocal(storedRecipes);
      setLoading(false);
    }
  }, [loading]);
  return (
    <>
      {" "}
      <BackButton />
      <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <img
          src={recipe?.image}
          className="w-full h-80 object-cover rounded-lg shadow-lg mb-8"
          alt={recipe?.title}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-gray-100 md:p-8 p-4 rounded-lg shadow-md">
            <h1 className="md:text-3xl text-xl font-bold mb-6">
              {recipe?.title || "Chicken"}
            </h1>
            <div className="flex flex-wrap justify-between items-center  mb-8 md:text-lg text-xs">
              <div className="flex items-center gap-3 mb-4 lg:mb-0">
                <IoTimer className=" text-orange-500 text-lg md:text-2xl" />
                <div>
                  <p className="font-bold text-gray-600">Cook Time</p>
                  <p className="">{recipe?.readyInMinutes}m</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4 lg:mb-0">
                <BiSolidDish className=" text-green-500 text-lg md:text-2xl " />
                <div>
                  <p className="font-bold text-sm text-gray-600">Type</p>
                  <p className="">
                    {(recipe?.dishTypes as string[])?.[0] || "No dish type"}
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-4 gap-3">
                <BiWorld className=" text-blue-500 text-lg  md:text-2xl" />
                <div>
                  <p className="font-bold  text-gray-600">Cuisine</p>
                  <p className="">
                    {(recipe?.cuisines as string[])?.[0] || "No cuisine"}
                  </p>
                </div>
              </div>
            </div>
            <h2 className="md:text-2xl text-xl font-bold mb-6">
              Ingredients ({recipe?.extendedIngredients.length})
            </h2>
            <div className="space-y-4 md:text-xl text-xs">
              {recipe?.extendedIngredients.map((ingredient, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 md:w-8 md:h-8 h-6 w-6 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-bold">
                      {ingredient.amount} {ingredient?.unit}
                    </p>
                    <p className="text-gray-700">{ingredient.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white md:p-8 p-4 rounded-lg shadow-md">
            <h2 className="md:text-3xl text-xl font-bold mb-6">Directions</h2>
            <div
              className="prose prose-lg max-w-none md:text-lg text-xs"
              dangerouslySetInnerHTML={{ __html: instructions }}
            />
          </div>
        </div>

        <p className="md:text-2xl text-xl font-bold mt-6 py-4">
          Related Recipe
        </p>
        <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {!recipeLocal
            ? null
            : recipeLocal.map((recipe, index) => (
                // eslint-disable-next-line react/jsx-key
                <Link href={`/spoonacular/${recipe.id}`}>
                  <div
                    className="flex-shrink-0 flex flex-col gap-2  bg-white shadow-lg md:w-60 w-48  transition-transform duration-200 transform hover:bg-orange-200 hover:scale-105"
                    key={index}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title || "Recipe image"}
                      className="object-cover w-full md:h-40 h-32"
                    />
                    <div className="flex flex-col p-2 justify-between gap-1 h-20 md:h-24">
                      <p className="font-bold md:text-sm text-xs line-clamp-2">
                        {recipe.title}
                      </p>
                      <div className="flex gap-2 items-center ">
                        {" "}
                        <FcLike className="text-sm lg:text-2xl" />
                        <p className="text-sm md:text-lg">
                          {recipe.likes} loves
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </>
  );
}
