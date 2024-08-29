/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { Suspense, useEffect, useState } from "react";
import { RiTimerFill } from "react-icons/ri";
import { BiDish } from "react-icons/bi";
import {
  FaBookmark,
  FaBowlFood,
  FaCircleCheck,
  FaFilePdf,
  FaFireFlameCurved,
} from "react-icons/fa6";
import Poster from "../../../api/poster";
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
import { CiMenuKebab } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { GoBookmarkSlashFill } from "react-icons/go";
import { useSearchParams } from "next/navigation";
import { HashLoader } from "react-spinners";

export default function RecipesPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-base-white flex items-center gap-3 justify-center">
          <HashLoader color="#ff6b00" />
          <p>Loading...</p>
        </div>
      }
    >
      <Recipes />
    </Suspense>
  );
}
function Recipes() {
  interface Poster {
    name: string;
    _id: string;
    description: string;
    time: string;
    directions: any;
    dishType: any;
    img: string;
    isSaved: boolean | null;
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
  interface Save {
    [key: string]: boolean;
  }
  const [recipes, setRecipes] = useState<Poster[]>([]);

  const [isGenerating, setIsGenerating] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isclient, setIsClient] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [save, setSave] = useState<Save>({});
  const router = useRouter();
  const [displayRecipes, setDisplayRecipes] = useState<Poster[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Poster[]>([]);
  const [trendRecipes, setTrendRecipes] = useState<Poster[]>([]);
  const [stopScroll, setStopScroll] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const handleSavedRecipe = (recipeId: string) => {
    setSave((prev) => ({
      ...prev,
      [recipeId]: !prev[recipeId], // Toggle the saved state for the specific recipe
    }));
  };
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
      if (!params) {
        return getRecipes();
      }
      setLoading(true);
      const response = await Poster.searchRecipe(params);
      setRecipes(response.response);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const searchParams = useSearchParams();

  //genrate Pdf
  const handleDownload = async (recipe: any, title: string, img: string) => {
    setIsGenerating(true);
    console.log(recipe);
    const doc = await generatePDF(recipe, title, img);
    doc.save(`${title}.pdf`);
    setIsGenerating(false);
  };
  //save Recipe
  const savedRecipe = async (id: string) => {
    try {
      const saved = await Poster.savedRecipe(id);
      if (saved.error) {
        return toast.error("Error Saving recipe!");
      } else {
        handleSavedRecipe(id);
        setSavedRecipes([]);
        return toast.success("Recipe saved!");
      }
    } catch (error) {
      return toast.error("Error Saving recipe!");
    }
  };
  //handle summit ------------------------------------------
  const handleSubmit = (formData: RecipeFormData) => {
    setStopScroll(false);
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
        setPage(1);
        setRecipes([]);
        await getRecipes();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const getRecipes = async () => {
    try {
      setLoading(true);
      const response = await Poster.getRecipes(page);
      const recipes = response.response;
      console.log(page, "page", "gfet");
      if (page === 1) {
        console.log("asd");
        console.log(recipes.items);
        setDisplayRecipes(recipes.items);

        setRecipes(recipes.items);
      } else if (page > 1) {
        console.log("else ss");
        setDisplayRecipes((prevItems) => [...prevItems, ...recipes.items]);
        setRecipes((prevItems) => [...prevItems, ...recipes.items]);
      }

      setHasMore(recipes.hasMore);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getSavedRecipes = async () => {
    try {
      setLoading(true);
      const response = await Poster.getSavedRecipe();
      setSavedRecipes(response.response);
      setDisplayRecipes(response.response);
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const getTrendRecipes = async () => {
    try {
      setLoading(true);
      const response = await Poster.getTrendRecipes(page);
      setDisplayRecipes(response.response.items);
      setTrendRecipes(response.response.items);
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const getFilter = (filter: string | null) => {
    try {
      if (filter == "saved") {
        console.log(savedRecipes.length);
        if (savedRecipes.length !== 0) {
          console.log("saved");
          setDisplayRecipes(savedRecipes);
        } else {
          getSavedRecipes();
        }
        router.replace(`/recipe?filter=${filter}`);
      } else if (filter == "trending") {
        if (trendRecipes.length !== 0) {
          console.log("saved");
          setDisplayRecipes(trendRecipes);
        } else {
          getTrendRecipes();
        }
        router.replace(`/recipe?filter=${filter}`);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  // Adjust toggleDropdown function
  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const removeSavedRecipe = async (id: string) => {
    try {
      const recipe = await Poster.deleteSavedRecipe(id);
      if (!recipe.status) {
        toast.error("failed removing recipe");
      } else {
        handleSavedRecipe(id);
        setSavedRecipes(savedRecipes!.filter((poster) => poster._id !== id));
        setDisplayRecipes(savedRecipes!.filter((poster) => poster._id !== id));
        toast.success("remove sucessfully ");
      }
    } catch (error) {
      toast.error("failed removing recipe");
    }
  };
  useEffect(() => {
    const closeAllDropdowns = (e: MouseEvent) => {
      // Check if click is outside of dropdown and toggle button
      const target = e.target as HTMLElement;
      if (target.closest(".dropdown") || target.closest(".toggle-button")) {
        return; // If clicked inside dropdown or toggle button, do nothing
      }
      setOpenDropdowns({});
    };

    document.body.addEventListener("click", closeAllDropdowns);

    return () => document.body.removeEventListener("click", closeAllDropdowns);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      setUser(storedUser);
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (!searchParams.get("filter")) {
      getRecipes();
      setDisplayRecipes(recipes);
    }
  }, [page]);
  useEffect(() => {
    if (!searchParams.get("filter")) {
      setDisplayRecipes(recipes);
    }
  }, [recipes, save]);
  useEffect(() => {
    getFilter(searchParams.get("filter"));
  }, []);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;

    if (loading || !hasMore) return;
    console.log("Incrementing page"); // Debugging
    if (!searchParams.get("filter")) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);
  useEffect(() => {
    if (stopScroll) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [stopScroll]);

  return (
    <>
      <ToastContainer />
      <div className="bg-base-white ">
        <Navagation />
        <section className="flex flex-col lg:grid lg:grid-cols-12">
          <div className="w-full lg:col-span-3 flex items-center lg:flex-col gap-2 lg:h-screen lg:sticky lg:pt-16  lg:top-0  lg:bg-gradient-to-tl from-base-mid tp-base-normal  md:bg-base-white   lg:p-8 md:px-16 px-4 md:pt-16 pt-12">
            <div className="md:py-4 py-2 relative w-11/12 lg:w-full">
              <input
                type="text"
                className="w-full bg-base-white  rounded h-10 lg:shadow pl-2 pr-20 md:text-lg text-xs   lg:border-none shadow border-2 border-orange-100"
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
                    className="absolute text-color right-12 top-1/2 transform -translate-y-1/2   px-3 py-2 rounded transition duration-200 ease-in-out hover:scale-110"
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
                    onClick={() => {
                      setShowModalUpload(true);
                      setStopScroll(true);
                    }}
                    className="bg-base-mid h-10 w-10 lg:hidden flex items-center flex-col justify-center rounded"
                  >
                    {" "}
                    <BsFillCloudUploadFill className="text-lg text-blue-600" />
                  </div>
                ) : null}
              </>
            )}

            <div className=" w-full lg:flex hidden flex-wrap gap-2 lg:text-sm xl:text-lg ">
              <button
                onClick={() => {
                  handleSeach("burger");
                  setSearch("burger");
                }}
                className="p-1 bg-base-white shadow rounded transition-all duration-300  hover:bg-orange-50 "
              >
                <p>burger</p>
              </button>
              <button
                onClick={() => {
                  handleSeach("pancake");
                  setSearch("pancake");
                }}
                className="p-1 bg-base-white shadow rounded transition-all duration-300  hover:bg-orange-50 "
              >
                <p>pancake</p>
              </button>
              <button
                onClick={() => {
                  handleSeach("Nashville Hot");
                  setSearch("Nashville Hot");
                }}
                className="p-1 bg-base-white shadow rounded transition-all duration-300  hover:bg-orange-50 "
              >
                <p>Nashville Hot</p>
              </button>
              <button
                onClick={() => {
                  handleSeach("dessert");
                  setSearch("dessert");
                }}
                className="p-1 bg-base-white shadow rounded transition-all duration-300  hover:bg-orange-50 "
              >
                <p>dessert</p>
              </button>
            </div>

            {isclient && (
              <>
                {user ? (
                  <div className="lg:flex lg:flex-col xl:text-lg lg:text-sm gap-4 hidden w-full  lg:mt-5 flex-row text-lg lg:items-start items-center justify-between p-1 ">
                    <p>Post your own recipe</p>
                    <button
                      onClick={() => {
                        setStopScroll(true);
                        setShowModalUpload(true);
                      }}
                      className=" lg:shadow xl:p-6 lg:p-4 md:p-3 flex gap-4 lg:w-full border border-gray-400  justify-center items-center transition duration-200 ease-in-out hover:bg-orange-50 "
                    >
                      <FaUpload className="lg:text-xl" />
                      <p>Upload</p>
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </div>
          <div className="lg:col-span-9 w-full md:px-10 md:py-4 lg:p-8 p-1  lg:mt-8 ">
            {/* Main content */}
            <div className="md:p-4 flex p-2 md:gap-3 gap-1 ">
              <button
                onClick={() => {
                  router.replace("/recipe");
                  if (recipes.length !== 0) {
                    setDisplayRecipes(recipes);
                  } else {
                    console.log(recipes.length);
                    getRecipes();
                  }
                }}
                className={
                  !searchParams.get("filter")
                    ? " text-base-dark text-sm md:text-lg md:p-2 py-1 px-3  md:px-4 rounded  flex gap-2 items-center"
                    : `p-2 text-sm md:text-lg md:p-2 py-1 text-text-color  md:px-4   shadow px-3 flex gap-2 items-center `
                }
              >
                <FaBowlFood />
                <p>For you</p>
              </button>
              <button
                onClick={() => {
                  getFilter("trending");
                }}
                className={
                  searchParams.get("filter") == "trending"
                    ? "text-sm md:text-lg md:p-2 py-1 px-3  md:px-4  text-base-dark  rounded  flex gap-2 items-center"
                    : `text-sm md:text-lg md:p-2 py-1 px-3  md:px-4 text-text-color   rounded shadow   flex gap-2 items-center `
                }
              >
                <FaFireFlameCurved />
                <p>Hot</p>
              </button>
              <button
                onClick={() => {
                  getFilter("saved");
                }}
                className={
                  searchParams.get("filter") == "saved"
                    ? "text-sm md:text-lg md:p-2 py-1 px-3  md:px-4  text-base-dark  rounded flex gap-2 items-center"
                    : `text-sm md:text-lg md:p-2 py-1 px-3  md:px-4 text-text-color  rounded shadow   flex gap-2 items-center `
                }
              >
                <FaBookmark />
                <p>saved</p>
              </button>
            </div>
            {displayRecipes?.length === 0 ? (
              <div className="h-90p bg-base-white flex justify-center items-center">
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
                {displayRecipes?.map((poster, index) => (
                  <div
                    key={index}
                    className="bg-base-white border-b  md:p-12 relative  lg:p-9 xl:p-12 p-3 pt-8 flex flex-col gap-8 hover:bg-orange-50 transition-all duration-300 ease-in-out  "
                  >
                    <div
                      key={poster._id}
                      className="absolute right-0 top-0 md:m-8 m-3 flex md:hidden"
                    >
                      <div
                        className="p-2 cursor-pointer toggle-button"
                        onClick={() => toggleDropdown(poster._id)}
                      >
                        <CiMenuKebab className="md:text-2xl  text-sm" />
                      </div>
                      {openDropdowns[poster._id] && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-base-white ring-1 ring-black ring-opacity-5 dropdown">
                          <div
                            className="py-1"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                          >
                            <button
                              className=" px-4 flex  w-full items-center gap-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {}}
                            >
                              {user && (
                                <>
                                  {!poster.isSaved &&
                                  !save[poster._id] &&
                                  searchParams.get("filter") !== "saved" ? (
                                    <div className="flex  items-center  justify-center gap-2  ">
                                      <FaBookmark className=" text-color text-blue-600 xl:text-2xl text-xl " />

                                      <p
                                        onClick={() => {
                                          savedRecipe(poster._id);
                                        }}
                                        className="text-sm  hover:cursor-pointer"
                                      >
                                        Save
                                      </p>
                                    </div>
                                  ) : searchParams.get("filter") === "saved" ? (
                                    <div className="flex items-center gap-2  ">
                                      <GoBookmarkSlashFill className=" text-color text-pink-600 xl:text-2xl text-xl " />
                                      <p
                                        onClick={() => {
                                          removeSavedRecipe(poster._id);
                                        }}
                                        className="text-sm  hover:bg-red-100 hover:cursor-pointer transition-all duration-300"
                                      >
                                        Remove
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="flex  items-center gap-2   ">
                                      <FaCircleCheck className=" text-color text-green-600 xl:text-2xl text-xl " />
                                      <p className="text-sm hover:cursor-pointer">
                                        Saved
                                      </p>
                                    </div>
                                  )}
                                </>
                              )}
                            </button>

                            <div className="flex items-center gap-2 px-4 py-2 ">
                              {" "}
                              <FaFilePdf className=" text-color text-red-600 xl:text-2xl text-xl " />
                              <button
                                className="hover:text-blue-500 hover:underline text-sm"
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
                                  : "Download"}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}{" "}
                    </div>
                    <div className="md:grid grid-cols-12 ">
                      <div className=" col-span-7">
                        <p
                          onClick={() => {
                            router.push(`/recipe/${poster._id}`);
                          }}
                          className="md:text-4xl p-2 md:p-0 hover:cursor-pointer lg:text-3xl xl:text-4xl text-xl font-bold text-base-dark"
                        >
                          {poster.name}
                        </p>
                        <div
                          onClick={() => {
                            router.push(`/recipe/${poster._id}`);
                          }}
                          className="flex flex-col md:pt-5 hover:cursor-pointer lg:flex-row lg:justify-between col-span-6"
                        >
                          {/* Grid Line  */}
                          <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 justify-between w-full py-2">
                            <div className="flex gap-1 lg:gap-3 items-center justify-center ">
                              <img
                                src={poster.user.profile}
                                alt=""
                                className="rounded-full object-cover xl:h-8 xl:w-8  h-6 w-6 "
                              />
                              <div className="flex flex-col xl:text-xs text-xxs  items-center justify-center">
                                <p className=" font-bold">{poster.user.name}</p>
                                <p>Jan 2 2024</p>
                              </div>
                            </div>
                            <div className="lg:flex gap-1 lg:gap-3 hidden  items-center border-l-2  justify-center">
                              <RiTimerFill className="text-lg md:text-md " />
                              <div className="flex flex-col xl:text-xs text-xxs    items-center justify-center">
                                <p className="font-bold">PREP TIME</p>
                                <p>15 m</p>
                              </div>
                            </div>
                            <div className="flex  gap-1 lg:gap-3  items-center border-l-2 justify-center">
                              <RiTimerFill className="text-lg md:text-md" />
                              <div className="flex flex-col xl:text-xs text-xxs  items-center justify-center">
                                <p className="font-bold">COOK TIME</p>
                                <p>{poster.time}</p>
                              </div>
                            </div>
                            <div className="flex gap-1 lg:gap-3 items-center border-l-2 justify-center">
                              <BiDish className="text-lg md:text-sm" />
                              <div className="flex flex-col xl:text-xs text-xxs   items-center justify-center">
                                <p className="font-bold uppercase">
                                  {poster.dishType}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-5 md:flex hidden  xl:text-lg text-sm  gap-6 items-center justify-center">
                        <div className="flex flex-col items-center justify-center gap-2 ">
                          {" "}
                          <FaFilePdf className=" text-color text-red-600 xl:text-2xl text-xl " />
                          <button
                            className="hover:text-blue-500 hover:underline text-sm"
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
                            {isGenerating ? "Generating PDF..." : "Download"}
                          </button>
                        </div>

                        {user && (
                          <>
                            {!poster.isSaved &&
                            !save[poster._id] &&
                            searchParams.get("filter") !== "saved" ? (
                              <div className="flex flex-col items-center  justify-center gap-2  ">
                                <FaBookmark className=" text-color text-blue-600 xl:text-2xl text-xl " />

                                <p
                                  onClick={() => {
                                    savedRecipe(poster._id);
                                  }}
                                  className="text-sm hover:cursor-pointer"
                                >
                                  Save
                                </p>
                              </div>
                            ) : searchParams.get("filter") === "saved" ? (
                              <div className="flex flex-col items-center justify-center gap-2  ">
                                <GoBookmarkSlashFill className=" text-color text-pink-600 xl:text-2xl text-xl " />
                                <p
                                  onClick={() => {
                                    removeSavedRecipe(poster._id);
                                  }}
                                  className="text-sm  hover:bg-red-100 hover:cursor-pointer transition-all duration-300"
                                >
                                  Remove
                                </p>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center gap-2  ">
                                <FaCircleCheck className=" text-color text-green-600 xl:text-2xl text-xl " />
                                <p className="text-sm hover:cursor-pointer">
                                  Saved
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        router.push(`/recipe/${poster._id}`);
                      }}
                      className="md:grid grid-cols-12 h-5/6 w-full hover:cursor-pointer"
                    >
                      <img
                        src={poster.img}
                        className=" object-cover md:h-96 h-64 w-full col-span-7"
                        alt=""
                      />
                      <div className="bg-base-mid col-span-5 h-96  p-4 md:flex hidden flex-col">
                        <p className="xl:text-xl md:text-lg font-bold mb-4">
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
                                  <p className="font-bold xl:text-sm text-xs">
                                    {data.quantity}
                                  </p>
                                  <p className="xl:text-sm text-xxs">
                                    {data.name}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p
                      onClick={() => {
                        router.push(`/recipe/${poster._id}`);
                      }}
                      className="xl:text-lg md:text-sm text-xs hover:cursor-pointer"
                    >
                      {poster.description}
                    </p>
                  </div>
                ))}
                {loading && <p>Loading...</p>}
                {!hasMore && (
                  <div className="flex items-center justify-center md:py-4 py-2 ">
                    <p>End of content</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <ModalUpload
          isOpen={showModalUpload}
          onClose={() => {
            setShowModalUpload(false), setStopScroll(false);
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
