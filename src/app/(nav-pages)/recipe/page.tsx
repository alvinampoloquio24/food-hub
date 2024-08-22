/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { RiTimerFill } from "react-icons/ri";
import { BiDish } from "react-icons/bi";
import { FaRegFilePdf } from "react-icons/fa6";
import Poster from "../../../api/poster";
import { CiShare1 } from "react-icons/ci";
import Link from "next/link";
import generatePDF from "@/utils/generatePDF";
import { TiArrowUpThick } from "react-icons/ti";
import Lottie from "react-lottie";
import animationData from "@/lottie/noResult.json"; // Your Lottie JSON file
import Loading from "@/lottie/loading.json";
import { MdClear } from "react-icons/md";
import Navagation from "@/app/components/Navagation";
import { FaUpload } from "react-icons/fa6";
import ModalUpload from "@/app/props/modalUploadRecipe";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillCloudUploadFill } from "react-icons/bs";

export default function recipe() {
  interface Poster {
    name: string;
    _id: string;
    description: string;
    time: string;
    directions: any;
    dishType: any;
    img: string;
    ingredients: Array<{ name: string; quantity: string }>;
    user: {
      name: string;
      profile: string;
      _id: string;
    };
  }
  type Ingredient = {
    name: string;
    quantity: string;
    unit: string;
  };

  type Direction = {
    title: string;
    description: string;
  };
  interface RecipeFormData {
    name: string;
    description: string;
    calories: string;
    type: string;
    time: string;
    selectedImage: File | null;
    ingredients: Ingredient[];
    directions: Direction[];
  }
  const [poster, setPoster] = React.useState<Poster[] | null>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isclient, setIsClient] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showModalUpload, setShowModalUpload] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleSeach = async (params: string) => {
    try {
      setLoading(true);
      let response;
      if (!params) {
        getPoster();
      } else {
        response = await Poster.searchRecipe(params);
        setPoster(response.response);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getPoster = async () => {
    try {
      setLoading(true);
      const data = await Poster.get();
      setPoster(data.response);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  //genrate Pdf
  const handleDownload = async (recipe: any, title: string, img: string) => {
    setIsGenerating(true);
    console.log(recipe);

    const doc = await generatePDF(recipe, title, img);
    doc.save(`${title}.pdf`);
    setIsGenerating(false);
  };
  //handle summit ------------------------------------------
  const handleSubmit = (formData: RecipeFormData) => {
    const requiredFields = [
      "name",
      "description",
      "calories",
      "type",
      "time",
      "selectedImage",
    ];
    console.log("asdsad");

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`${field} is required.`);
        return;
      }
    }

    // Validate ingredients
    for (const ingredient of formData.ingredients) {
      if (!ingredient.name || !ingredient.quantity || !ingredient.unit) {
        toast.error("All ingredient fields are required.");
        return;
      }
    }

    // Validate directions
    for (const direction of formData.directions) {
      if (!direction.title || !direction.description) {
        toast.error("All direction fields are required.");
        return;
      }
    }
    uploadRecipe(formData);
  };

  const uploadRecipe = async (formData: RecipeFormData) => {
    try {
      setShowModalUpload(false);
      const toastId = toast.loading("Posting...");

      const recipe = await Poster.uploadRecipe(formData);
      if (recipe.error) {
        toast.update(toastId, {
          render: "Failed to post.",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        toast.update(toastId, {
          render: "Post successfully",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        // Call getPoster() here, after a successful post
        await getPoster();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      setUser(storedUser);
    }
  }, []);
  useEffect(() => {
    setIsClient(true);
    handleSeach(search);
    getPoster();
  }, [search]);

  return (
    <>
      <ToastContainer />
      <>
        <Navagation />
        <section className="bg-white h-screen lg:grid flex flex-col grid-cols-12 overflow-hidden">
          <div className="lg:bg-base-mid bg-white shadow col-span-3  flex lg:flex-col items-center  lg:items-start space-x-3 lg:space-x-0  lg:h-full  lg:p-8 md:px-8 px-1  text-gray-700">
            <div className="md:py-4 py-2 relative w-11/12 lg:w-full">
              <input
                type="text"
                className="w-full rounded h-10 pl-2 pr-20 md:text-lg text-xs  lg:shadow-none lg:border-none shadow border-2 border-orange-100"
                placeholder="Search recipe.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSeach(search);
                  }
                }}
              />
              {search ? (
                <>
                  <button
                    onClick={() => {
                      setSearch("");
                    }}
                    className="absolute text-black right-12 top-1/2 transform -translate-y-1/2   px-3 py-2 rounded transition duration-200 ease-in-out hover:scale-110"
                  >
                    <MdClear />
                  </button>
                  <button
                    onClick={() => {
                      handleSeach(search);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-base-dark text-white px-3 py-2 rounded transition duration-200 ease-in-out hover:scale-110"
                  >
                    <TiArrowUpThick />
                  </button>
                </>
              ) : null}
            </div>

            {isclient && (
              <>
                {user ? (
                  <div
                    onClick={() => setShowModalUpload(true)}
                    className="bg-base-mid h-10 w-10 lg:hidden flex items-center flex-col justify-center rounded"
                  >
                    {" "}
                    <BsFillCloudUploadFill className="text-lg text-blue-600" />
                  </div>
                ) : null}
              </>
            )}

            <div className=" w-full lg:flex hidden flex-wrap gap-2 ">
              <button
                onClick={() => {
                  handleSeach("burger");
                  setSearch("burger");
                }}
                className="p-1 bg-white shadow rounded transition-all duration-300  hover:bg-orange-50 "
              >
                <p>burger</p>
              </button>
              <button
                onClick={() => {
                  handleSeach("pancake");
                  setSearch("pancake");
                }}
                className="p-1 bg-white shadow rounded transition-all duration-300  hover:bg-orange-50 "
              >
                <p>pancake</p>
              </button>
              <button
                onClick={() => {
                  handleSeach("Nashville Hot");
                  setSearch("Nashville Hot");
                }}
                className="p-1 bg-white shadow rounded transition-all duration-300  hover:bg-orange-50 "
              >
                <p>Nashville Hot</p>
              </button>
              <button
                onClick={() => {
                  handleSeach("dessert");
                  setSearch("dessert");
                }}
                className="p-1 bg-white shadow rounded transition-all duration-300  hover:bg-orange-50 "
              >
                <p>dessert</p>
              </button>
            </div>

            {isclient && (
              <>
                {user ? (
                  <div className="lg:flex lg:flex-col gap-4 hidden w-full  lg:mt-5 flex-row text-lg lg:items-start items-center justify-between p-1 ">
                    <p>Post your own recipe</p>
                    <button
                      onClick={() => {
                        setShowModalUpload(true);
                      }}
                      className=" lg:shadow lg:p-6 md:p-3 flex gap-4 lg:w-full border border-gray-400  justify-center items-center transition duration-200 ease-in-out hover:bg-orange-50 "
                    >
                      <FaUpload className="lg:text-xl" />
                      <p>Upload</p>
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </div>
          <div className="bg-white lg:col-span-9 col-span-12 overflow-y-auto  h-auto gap-8 ">
            {/* Main content */}

            {poster?.length === 0 ? (
              <div className="h-90p bg-white flex justify-center items-center">
                {" "}
                {loading ? (
                  <div className="flex flex-col items-center justify-center">
                    <Lottie
                      options={defaultOptions2}
                      height="50vh" // Adjust this as needed
                      width="50vw" // Adjust this as needed
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Lottie options={defaultOptions} height={200} width={200} />
                  </div>
                )}
              </div>
            ) : (
              <>
                {" "}
                {poster?.map((poster, index) => (
                  <Link href={`/recipe/${poster._id}`}>
                    <div
                      key={index}
                      className="bg-white border-b  md:p-12 p-4 py-12  pb-12 flex flex-col gap-8 hover:bg-orange-50 transition-all duration-300 ease-in-out  "
                    >
                      <div className="md:grid grid-cols-12 ">
                        <div className=" col-span-7">
                          <p className="md:text-4xl text-xl font-bold text-base-dark">
                            {poster.name}
                          </p>
                          <div className="flex flex-col md:pt-5 lg:flex-row lg:justify-between col-span-6">
                            {/* Grid Line  */}
                            <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 justify-between w-full py-2">
                              <div className="flex gap-1 lg:gap-3 items-center justify-center ">
                                <img
                                  src={poster.user.profile}
                                  alt=""
                                  className="rounded-full object-cover md:h-8 md:w-8 h-6 w-6 "
                                />
                                <div className="flex flex-col text-xs items-center justify-center">
                                  <p className=" font-bold">
                                    {poster.user.name}
                                  </p>
                                  <p>Jan 2 2024</p>
                                </div>
                              </div>
                              <div className="lg:flex gap-1 lg:gap-3 hidden  items-center border-l-2  justify-center">
                                <RiTimerFill className="text-lg md:text-md" />
                                <div className="flex flex-col text-xs   items-center justify-center">
                                  <p className="font-bold">PREP TIME</p>
                                  <p>15 m</p>
                                </div>
                              </div>
                              <div className="flex  gap-1 lg:gap-3  items-center border-l-2 justify-center">
                                <RiTimerFill className="text-lg md:text-md" />
                                <div className="flex flex-col text-xs  items-center justify-center">
                                  <p className="font-bold">COOK TIME</p>
                                  <p>{poster.time}</p>
                                </div>
                              </div>
                              <div className="flex gap-1 lg:gap-3 items-center border-l-2 justify-center">
                                <BiDish className="text-lg md:text-sm" />
                                <div className="flex flex-col text-xs  items-center justify-center">
                                  <p className="font-bold uppercase">
                                    {poster.dishType}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-5 md:flex hidden gap-6 items-center justify-center">
                          <div className="flex flex-col items-center justify-center gap-2 ">
                            {" "}
                            <div className="p-3 bg-base-mid rounded-full hover:bg-orange-200 ">
                              {" "}
                              <FaRegFilePdf className=" text-black text-xl " />
                            </div>
                            <button
                              className="hover:text-blue-500 underline"
                              onClick={() => {
                                handleDownload(
                                  {
                                    ingredients: poster.ingredients,
                                    directions: poster.directions,
                                  },
                                  poster.name,
                                  poster.img
                                );
                              }}
                              disabled={isGenerating}
                            >
                              {isGenerating
                                ? "Generating PDF..."
                                : "Download PDF"}
                            </button>
                          </div>
                          <div className="flex flex-col items-center justify-center gap-2  ">
                            {" "}
                            <div className="p-3 bg-base-mid rounded-full hover:bg-orange-200">
                              {" "}
                              <CiShare1 className=" text-black text-xl " />
                            </div>
                            <p className="text-sm">Share</p>
                          </div>
                        </div>
                      </div>
                      <div className="md:grid grid-cols-12 h-5/6 w-full">
                        <img
                          src={poster.img}
                          className=" object-cover md:h-96 h-64 w-full col-span-7"
                          alt=""
                        />
                        <div className="bg-base-mid col-span-5 h-96  p-4 md:flex hidden flex-col">
                          <p className="text-xl font-bold mb-4">
                            Ingredients({poster.ingredients.length})
                          </p>
                          <div className="flex-grow overflow-y-auto ">
                            <div className="">
                              {poster.ingredients.map((data, index) => (
                                <div
                                  key={index}
                                  className="flex items-center p-2 border-b-2"
                                >
                                  <p className="w-8 text-xl font-bold">
                                    {index + 1}
                                  </p>
                                  <div className="flex-grow">
                                    <p className="font-bold text-sm">
                                      {data.quantity}
                                    </p>
                                    <p className="text-xs">{data.name}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="md:text-lg text-xs">{poster.description}</p>
                    </div>
                  </Link>
                ))}
                <div className="flex items-center justify-center py-4">
                  <p>End of content</p>
                </div>
              </>
            )}
          </div>
        </section>

        <ModalUpload
          isOpen={showModalUpload}
          onClose={() => setShowModalUpload(false)}
          onSubmit={handleSubmit}
        />
      </>
    </>
  );
}
