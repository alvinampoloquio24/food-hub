/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RiTimerFill } from "react-icons/ri";
import { BiDish } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { MdMenuBook } from "react-icons/md";
import { BiLogoBlogger } from "react-icons/bi";
import { RiContactsBook3Fill } from "react-icons/ri";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import { FaRegFilePdf } from "react-icons/fa6";
import Poster from "../../../api/poster";
import { CiShare1 } from "react-icons/ci";
import Link from "next/link";
import generatePDF from "@/utils/generatePDF";
import { TiArrowUpThick } from "react-icons/ti";
import { DiVim } from "react-icons/di";
import { ClimbingBoxLoader, HashLoader, MoonLoader } from "react-spinners";
import Lottie from "react-lottie";
import animationData from "@/lottie/noResult.json"; // Your Lottie JSON file
import Loading from "@/lottie/loading.json";
import { MdClear } from "react-icons/md";
import Navagation from "@/app/components/Navagation";
import { FaUpload } from "react-icons/fa6";
import { useUserStore } from "@/zustand/user";
import Modal from "@/app/props/modalUploadRecipe";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Utility to handle form data change
const handleInputChange =
  (
    setState: React.Dispatch<React.SetStateAction<any>>,
    isArray: boolean = false
  ) =>
  (
    index: number | null,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (isArray && typeof index === "number") {
      setState((prevState: any) => {
        const newState = { ...prevState };
        newState[name][index] = { ...newState[name][index], [name]: value };
        return newState;
      });
    } else {
      setState((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

// Utility to handle add/remove items in an array
const handleArrayChange = (
  setState: React.Dispatch<React.SetStateAction<any>>,
  action: "add" | "remove",
  field: string,
  emptyItem: object,
  index?: number
) => {
  setState((prevState: any) => {
    const newState = { ...prevState };
    if (action === "add") {
      newState[field] = [...newState[field], emptyItem];
    } else {
      newState[field] = newState[field].filter(
        (_: any, i: number) => i !== index
      );
    }
    return newState;
  });
};
export default function recipe() {
  interface Poster {
    name: string;
    _id: string;
    description: string;
    time: string;
    direction: any;
    dishType: any;
    img: string;
    recipe: {
      ingredients: Array<{ name: string; quantity: string }>;
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

  interface Slide {
    currentSlide: number;
    totalSlides: number;
  }
  const [poster, setPoster] = React.useState<Poster[] | null>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isclient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    calories: string;
    type: string;
    time: string;
    ingredients: Ingredient[];
    directions: Direction[];
    selectedImage: File | null;
  }>({
    name: "",
    description: "",
    calories: "",
    type: "",
    time: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    directions: [{ title: "", description: "" }],
    selectedImage: null,
  });

  const handleFormInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for image input
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      toast.error("Image is required.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      selectedImage: files[0],
    }));
  };

  // Handlers for ingredients
  const handleIngredientChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      const newIngredients = [...prev.ingredients];
      newIngredients[index] = {
        ...newIngredients[index],
        [name]: value,
      };
      return {
        ...prev,
        ingredients: newIngredients,
      };
    });
  };

  // Handlers for directions
  const handleDirectionChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      const newDirections = [...prev.directions];
      newDirections[index] = {
        ...newDirections[index],
        [name]: value,
      };
      return {
        ...prev,
        directions: newDirections,
      };
    });
  };

  const handleAddIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "", unit: "" }],
    }));
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleAddDirection = () => {
    setFormData((prev) => ({
      ...prev,
      directions: [...prev.directions, { title: "", description: "" }],
    }));
  };

  const handleRemoveDirection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      directions: prev.directions.filter((_, i) => i !== index),
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
    const doc = await generatePDF(recipe, title, img);
    doc.save(`${title}.pdf`);
    setIsGenerating(false);
  };
  //handle summit ------------------------------------------
  const handleSubmit = (event: FormEvent) => {
    console.log();
    event.preventDefault();

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
    uploadRecipe();
  };

  const uploadRecipe = async () => {
    try {
      setShowModal(false);
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
          render: "Posted successfully!",
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
    setIsClient(true);
    handleSeach(search);
    getPoster();
  }, [search]);

  const slides = [
    // Slide 1: Basic Info
    <div key="basic-info">
      <h2 className="md:text-2xl text-lg font-bold text-center mb-6">
        Basic Recipe Information
      </h2>
      <div className="flex flex-col gap-4 md:text-lg text-sm">
        <div className="flex flex-col">
          <p>Name</p>
          <input
            type="text"
            name="name"
            required
            onChange={handleFormInputChange}
            placeholder="Recipe name"
            value={formData.name}
            className="border p-2"
          />
        </div>
        <div className="flex flex-col">
          <p>Attach picture</p>
          <input
            type="file"
            required
            className="border p-2"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="flex flex-col">
            <p>Cook time</p>
            <input
              type="number"
              name="time"
              required
              onChange={handleFormInputChange}
              placeholder="In minutes"
              value={formData.time}
              className="border p-2"
            />
          </div>
          <div className="flex flex-col">
            <p>Type</p>
            <input
              type="text"
              name="type"
              required
              onChange={handleFormInputChange}
              placeholder="Type"
              value={formData.type}
              className="border p-2"
            />
          </div>
          <div className="flex flex-col">
            <p>Calories</p>
            <input
              type="number"
              name="calories"
              required
              onChange={handleFormInputChange}
              placeholder="Calories"
              value={formData.calories}
              className="border p-2"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p>Description</p>
          <textarea
            className="border p-2"
            name="description"
            required
            onChange={handleFormInputChange}
            value={formData.description}
            placeholder="Enter your description..."
            rows={3}
          ></textarea>
        </div>
      </div>
    </div>,

    // Slide 2: Ingredients
    <div key="ingredients">
      <h2 className="md:text-2xl text-lg font-bold text-center mb-6">
        Ingredients
      </h2>
      <div className="flex flex-col gap-2 pb-8">
        {formData.ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="grid grid-cols-12 w-full gap-2 justify-center md:text-lg text-sm"
          >
            <div className="flex flex-col justify-center col-span-5">
              <p>Name</p>
              <input
                type="text"
                required
                className="border p-2"
                name="name"
                value={ingredient.name}
                onChange={(event) => handleIngredientChange(index, event)}
              />
            </div>
            <div className="flex flex-col justify-center col-span-3">
              <p>Quantity</p>
              <input
                type="text"
                required
                className="border p-2"
                name="quantity"
                value={ingredient.quantity}
                onChange={(event) => handleIngredientChange(index, event)}
              />
            </div>
            <div className="flex flex-col justify-center col-span-3">
              <p>Unit</p>
              <input
                type="text"
                className="border p-2"
                name="unit"
                required
                value={ingredient.unit}
                onChange={(event) => handleIngredientChange(index, event)}
              />
            </div>
            <div className="flex flex-col justify-center col-span-1">
              <p className="md:flex hidden">Remove</p>
              <button
                type="button"
                className="p-2 rounded md:border"
                onClick={() => handleRemoveIngredient(index)}
              >
                X
              </button>
            </div>
          </div>
        ))}
        <div className="flex gap-4 items-center mt-4">
          <button
            type="button"
            className="p-1 px-3 rounded border"
            onClick={handleAddIngredient}
          >
            + Add Ingredient
          </button>
        </div>
      </div>
    </div>,

    // Slide 3: Directions
    <div key="directions">
      <h2 className="md:text-2xl text-sm font-bold text-center mb-6">
        Directions
      </h2>
      <div className="flex flex-col gap-2">
        {formData.directions.map((direction, index) => (
          <div
            key={index}
            className="grid grid-cols-12 w-full gap-2 justify-center md:text-lg text-sm"
          >
            <div className="flex flex-col justify-center col-span-4">
              <p>Title</p>
              <input
                type="text"
                required
                className="border p-2"
                name="title"
                value={direction.title}
                onChange={(event) => handleDirectionChange(index, event)}
              />
            </div>
            <div className="flex flex-col justify-center col-span-7">
              <p>Description</p>
              <input
                required
                type="text"
                className="border p-2"
                name="description"
                value={direction.description}
                onChange={(event) => handleDirectionChange(index, event)}
              />
            </div>
            <div className="flex flex-col justify-between col-span-1">
              <p className="hidden md:flex-none">Remove</p>
              <button
                type="button"
                className="p-2 rounded md:border"
                onClick={() => handleRemoveDirection(index)}
              >
                X
              </button>
            </div>
          </div>
        ))}
        <div className="flex gap-4 items-center mb-4">
          <button
            type="button"
            className="p-1 px-3 rounded border"
            onClick={handleAddDirection}
          >
            + Add Direction
          </button>
        </div>
      </div>
    </div>,
  ];

  const SlideIndicator = (slide: Slide) => {
    return (
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: slide.totalSlides }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
              index === slide.currentSlide
                ? "bg-base-dark scale-125"
                : "bg-gray-300 scale-100"
            }`}
          ></div>
        ))}
      </div>
    );
  };
  return (
    <>
      <ToastContainer />
      <>
        <Navagation />
        <section className="bg-white h-screen lg:grid flex flex-col grid-cols-12 overflow-hidden">
          <div className="lg:bg-base-mid bg-white shadow col-span-3  flex lg:flex-col items-center  lg:items-start space-x-3  lg:h-full  lg:p-8 md:px-8 px-1  text-gray-700">
            <p className="text-3xl font-bold lg:flex hidden ">Recipe</p>

            <div className="md:py-4 py-2 relative w-11/12">
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
                <button
                  onClick={() => {
                    setSearch("");
                  }}
                  className="absolute text-black right-12 top-1/2 transform -translate-y-1/2   px-3 py-2 rounded transition duration-200 ease-in-out hover:scale-110"
                >
                  <MdClear />
                </button>
              ) : null}
              <button
                onClick={() => {
                  handleSeach(search);
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-base-dark text-white px-3 py-2 rounded transition duration-200 ease-in-out hover:scale-110"
              >
                <TiArrowUpThick />
              </button>
            </div>
            <div
              onClick={() => {
                setShowModal(true);
              }}
              className="bg-base-mid h-10 w-10 lg:hidden flex items-center justify-center rounded-full"
            >
              {" "}
              <FaUpload className="text-sm" />
            </div>
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
                    <p>Upload your own recipe</p>
                    <button
                      onClick={() => {
                        setShowModal(true);
                      }}
                      className=" lg:shadow lg:p-6 md:p-3 flex gap-4 lg:w-full border border-gray-400  justify-center items-center transition duration-200 ease-in-out hover:bg-orange-50 "
                    >
                      <FaUpload className="lg:text-xl" />
                      <p>Upload recipe</p>
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </div>
          <div className="bg-white lg:col-span-9 col-span-12 overflow-y-auto  h-auto gap-8 border-b ">
            {/* Main content */}

            {poster?.length === 0 ? (
              <div className="h-90p bg-white flex justify-center items-center">
                {" "}
                {loading ? (
                  <div className="flex flex-col items-center justify-center">
                    <Lottie
                      options={defaultOptions2}
                      height={400}
                      width={400}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Lottie options={defaultOptions} height={400} width={400} />
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
                      className="bg-white border-b  md:p-12 p-4 py-12  pb-12 flex flex-col gap-8 hover:bg-orange-50 transition-all duration-300 ease-in-out"
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
                                  src="https://assets.mycast.io/actor_images/actor-johnny-sins-75125_large.jpg?1586055334"
                                  alt=""
                                  className="rounded-full object-cover md:h-8 md:w-8 h-6 w-6 "
                                />
                                <div className="flex flex-col text-xs items-center justify-center">
                                  <p className=" font-bold">Jonny Sins</p>
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
                                  poster.recipe,
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
                            Ingredients({poster.recipe.ingredients.length})
                          </p>
                          <div className="flex-grow overflow-y-auto ">
                            <div className="">
                              {poster.recipe.ingredients.map((data, index) => (
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

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="h-90p flex flex-col justify-between"
          >
            <div className="flex flex-col w-full gap-6 mt-4">
              {slides[currentSlide]}
            </div>
            <div>
              {" "}
              <div className="flex gap-3 mt-6">
                {currentSlide > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(currentSlide - 1)}
                    className="p-2 px-3 bg-gray-200 rounded gap-2 flex items-center transition duration-200 ease-in-out hover:scale-110"
                  >
                    <GrCaretPrevious />
                    Previous
                  </button>
                )}
                {currentSlide < slides.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(currentSlide + 1)}
                    className="p-2 px-3 hover:shadow-lg bg-base-dark text-white flex gap-2 items-center rounded transition duration-200 ease-in-out hover:scale-110"
                  >
                    Next <GrCaretNext />
                  </button>
                )}
                {currentSlide === slides.length - 1 && (
                  <button
                    type="submit"
                    className="p-2 flex items-center px-3 gap-2 bg-green-500 text-white rounded transition duration-200 ease-in-out hover:scale-110"
                  >
                    Upload
                    <FaUpload />
                  </button>
                )}
              </div>
              <SlideIndicator
                currentSlide={currentSlide}
                totalSlides={slides.length}
              />
            </div>
          </form>
        </Modal>
      </>
    </>
  );
}
