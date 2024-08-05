/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Poster from "@/api/poster";
import DOMPurify from "dompurify";
import { IoTimer } from "react-icons/io5";
import { BiSolidDish } from "react-icons/bi";
import { BiWorld } from "react-icons/bi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useRouter } from "next/router";
import BackButton from "@/app/props/backButton";
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

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [instructions, setInstructions] = useState("");
  const [summary, setsummary] = useState("");

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
  return (
    <div className=" bg-white px-48">
      <img src={recipe?.image} className="h-64 w-full object-cover" alt="" />

      <div className="grid grid-cols-2">
        <div className="bg-base-light p-12 ">
          <p className=" text-3xl font-diphylleia py-4 border-b border-gray-800 font-bold">
            {recipe?.title}Chiken
          </p>
          <div className="flex justify-between py-3 ">
            <div className=" flex items-center gap-2">
              <IoTimer className="text-xl" />
              <div className="text-sm">
                <p className="font-bold">COOK TIME</p>
                <p>{recipe?.readyInMinutes}m</p>
              </div>
            </div>
            <div className=" flex items-center gap-2 ">
              <BiSolidDish className="text-xl" />
              <div className="text-sm">
                <p className="font-bold">TYPE</p>
                <p>{(recipe?.dishTypes as string[])?.[0] || "No dish type"}</p>
              </div>
            </div>
            <div className=" flex items-center gap-2 ">
              <BiWorld className="text-xl" />
              <div className="text-sm">
                <p className="font-bold uppercase">cuisine</p>
                <p>{(recipe?.cuisines as string[])?.[0] || "No dish type"}</p>
              </div>
            </div>
          </div>
          <p className=" text-2xl font-bold py-3">
            Ingredients({recipe?.extendedIngredients.length})
          </p>
          <div className="flex flex-col gap-3">
            {recipe?.extendedIngredients.map((ingredient, index) => (
              <div
                key={index}
                className="grid grid-cols-12 items-center gap-1 text-xl w-full"
              >
                <p className=" col-span-1 text-2xl font-bold">{index + 1}</p>
                <div className="flex-col w-full col-span-11">
                  {" "}
                  <p className=" font-bold ">
                    {ingredient.amount}
                    {ingredient?.unit}
                  </p>
                  <p>{ingredient.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex p-12 flex-col">
          <p className="text-3xl font-bold py-4 border-b border-gray-800 font-diphylleia">
            Direction
          </p>
          <div
            className="py-8"
            dangerouslySetInnerHTML={{ __html: instructions }}
          />
        </div>
      </div>
      <div className="flex gap-1 items-center  py-8">
        <BackButton />
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: summary }} /> */}
    </div>
  );
}
