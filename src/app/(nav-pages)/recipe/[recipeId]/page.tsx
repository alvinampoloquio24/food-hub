/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import Poster from "../../../../api/poster";
import { PiVideoFill } from "react-icons/pi";
import RecipeProps from "@/app/props/recipe";
import VideoPlayer from "../../../props/videoPlayer";
import { FaHeart, FaTwitter } from "react-icons/fa";
import { RiTimerFill } from "react-icons/ri";
import { BiSolidDish } from "react-icons/bi";
import { FaSquareFacebook, FaSquareInstagram } from "react-icons/fa6";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function Page({
  params,
}: {
  params: {
    recipeId: string;
  };
}) {
  interface Irecipe {
    name: string;
    time: string;
    dishType: string;
    img: string;
    directions: any;
    cal: string;
    ingredients: { name: string; quantity: string }[];
  }
  interface IRecRecioe {
    img: string;
    time: string;
    dishType: string;
    name: string;
    _id: string;
  }
  const [recipe, setRecipe] = React.useState<Irecipe | null>(null);
  const [recRecipe, setRecRecipe] = React.useState<IRecRecioe[]>([]);

  const getRecomendedRecipe = async () => {
    try {
      const recipe = await Poster.get();
      setRecRecipe(recipe.response);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const recipe = await Poster.getRecipe(params.recipeId);
        console.log("Fetched recipe:", recipe); // Debugging line
        setRecipe(recipe.response);
      } catch (error) {
        console.log("error", error);
      }
    };

    getRecipe();
    getRecomendedRecipe();
  }, [params.recipeId]);

  return recipe ? (
    <>
      <RecipeProps recipe={recipe} />
      <div
        className=" min-h-screen  bg-white md:p-20 p-6 flex md:px-20 lg:px-40 "
        id="directions"
      >
        <div className="md:grid grid-cols-12 flex flex-col gap-4 ">
          <div className="col-span-7">
            {" "}
            <p className="md:text-4xl text-xl  font-semibold py-7">
              Directions ({recipe.directions.length})
            </p>
            {recipe.directions.map((step: any, index: any) => (
              <div className="flex flex-col gap-6" key={index}>
                {" "}
                <div className="grid grid-cols-12 md:space-x-2  items-center p-4 border-b-2">
                  <p className="md:text-4xl text-xl font-bold col-span-1">
                    {index + 1}
                  </p>
                  <div className="col-span-11 flex flex-col">
                    <p className="font-bold md:text-xl text-sm">{step.title}</p>
                    <p className="md:text-sm text-xs">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-5 flex flex-col h-full ">
            {" "}
            <p className="text-xl md:text-3xl font-semibold py-7 ">
              Watch Tutorial
            </p>
            <VideoPlayer url="https://www.youtube.com/watch?v=CvAc_HE65Ik" />
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
}
