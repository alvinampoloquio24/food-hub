/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line, RiTimerFill } from "react-icons/ri";
import { BiDish } from "react-icons/bi";
import { FaFire, FaRegFilePdf } from "react-icons/fa6";
import Poster from "@/api/poster";
import { CiShare1 } from "react-icons/ci";
import Link from "next/link";
import generatePDF from "@/utils/generatePDF";
import { TiArrowUpThick } from "react-icons/ti";
import Lottie from "react-lottie";
import animationData from "@/lottie/share.json"; // Your Lottie JSON file
import Loading from "@/lottie/loading.json";
import {
  MdClear,
  MdLocalFireDepartment,
  MdOutlineSystemUpdateAlt,
} from "react-icons/md";
import { FaUpload } from "react-icons/fa6";
import { useUserStore } from "@/zustand/user";
import ModalUpload from "@/app/props/modalUploadRecipe";
import ModalEditRecipe from "@/app/props/modalEditRecipe";
import { GrView } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withAuth from "@/hoc/checkeLogin";
import { useAuth } from "@/context/authProvider";
import DeleteConfirmModal from "@/app/props/deleteModal";
import BackButton from "@/app/props/backButton";
import { PiFireSimpleFill } from "react-icons/pi";

function Recipe() {
  interface Poster {
    name: string;
    _id: string;
    description: string;
    time: string;
    directions: any;
    cal: string;
    type: string;
    dishType: any;
    img: any;
    ingredients: Array<{ name: string; quantity: string; unit: string }>;
    user: {
      name: string;
      profile: string;
      _id: string;
    };
  }
  interface RecipeFormData {
    name: string;
    description: string;
    calories: string;
    type: string;
    time: string;
    selectedImage: File | string | null;
    ingredients: Ingredient[];
    directions: Direction[];
  }
  interface EditRecipe {
    name: string;
    description: string;
    cal: string;
    dishType: string;
    time: string;
    img: File | string | null;
    ingredients: Ingredient[];
    directions: Direction[];
    _id: string;
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

  const [poster, setPoster] = React.useState<Poster[] | null>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isclient, setIsClient] = useState(false);
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const { user } = useUserStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEditRecipe, setSelectedEditRecipe] = useState<{
    img: string;
    _id: string;
    name: string;
    description: string;
    cal: string;
    dishType: string;
    time: string;
    ingredients: Ingredient[];
    directions: Direction[];
  }>({
    _id: "",
    name: "",
    description: "",
    cal: "",
    img: "",
    dishType: "",
    time: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    directions: [{ title: "", description: "" }],
  });
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null); // Use Poster | null

  const openModal = (item: any) => {
    setSelectedPoster(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPoster(null);
  };

  const confirmDelete = (_id: string) => {
    setPoster(poster!.filter((poster) => poster._id !== _id));
    deleteRecipe(_id);
    closeModal();
  };

  const { isLoggedIn } = useAuth();

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
      const data = await Poster.getSelf();
      setPoster(data?.response);
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
  const EditRecipe = async (formData: EditRecipe) => {
    try {
      setShowModalEdit(false);
      console.log(showModalUpload);
      const toastId = toast.loading("Updating...");

      const recipe = await Poster.EditRecipe(formData);
      if (!recipe.status) {
        toast.update(toastId, {
          render: ` Failed to Edit ${recipe.response.message}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        toast.update(toastId, {
          render: "Edit successfully",
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
  const handleSubmitEditRecipe = (formData: EditRecipe) => {
    console.log(formData.cal);
    const requiredFields = [
      "name",
      "description",
      "cal",
      "dishType",
      "time",
      "img",
    ];

    console.log(formData.img, "asdasd");

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

    EditRecipe(formData);
  };
  useEffect(() => {
    setIsClient(true);
    handleSeach(search);

    getPoster();
  }, [search, isLoggedIn, selectedEditRecipe]);

  const deleteRecipe = async (id: string) => {
    try {
      const recipe = await Poster.deleteRecipe(id);
      if (!recipe.status) {
        return toast.error("Error deletinng recipe !");
      }

      toast.success(recipe.response.message);
    } catch (error) {
      toast.error("Something went worong");
    }
  };

  return (
    <>
      <ModalUpload
        isOpen={showModalUpload}
        onClose={() => setShowModalUpload(false)}
        onSubmit={handleSubmit}
      />
      <ModalEditRecipe
        recipe={selectedEditRecipe}
        isOpen={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        onSubmit={handleSubmitEditRecipe}
      />
      <ToastContainer />
      <>
        <section className="bg-white h-screen lg:grid flex flex-col grid-cols-12 overflow-hidden">
          <div className="lg:bg-base-mid  bg-white shadow col-span-3  flex lg:flex-col items-center  lg:items-start space-x-3  lg:h-full  lg:p-8 md:px-8 px-1  text-gray-700">
            <div className="absolute top-0 left-0 ">
              <BackButton />
            </div>
            {isclient && (
              <div className="flex items-center top-0 absolute p-3 ">
                <img
                  src={user?.profile}
                  className="object-cover w-8 h-8 rounded-full mr-2"
                  alt=""
                />
                <p>{user?.name}</p>
              </div>
            )}

            <p className="text-3xl font-bold lg:flex hidden mt-12 ">
              My Recipe
            </p>

            <div className="md:py-4 py-2 relative w-11/12">
              <input
                type="text"
                className="w-full rounded h-10 pl-2 pr-20 md:text-lg text-xs hidden md:flex  lg:shadow-none lg:border-none shadow border-2 border-orange-100"
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
                  <div className="lg:flex lg:flex-col gap-4 hidden w-full  lg:mt-5 flex-row text-lg lg:items-start items-center justify-between p-1 ">
                    <p>Post new recipe</p>
                    <button
                      onClick={() => setShowModalUpload(true)}
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
                  <div className="flex flex-col items-center justify-center h-screen  gap-4">
                    <p className="text-center text-2xl font-bold ">
                      No posts yet.
                    </p>
                    <Lottie options={defaultOptions} height={200} width={200} />
                  </div>
                )}
              </div>
            ) : (
              <>
                {" "}
                {poster?.map((poster, index) => (
                  <>
                    <div
                      key={index}
                      className="bg-white border-b  md:p-12 p-4  py-12  pb-12 flex flex-col gap-8 hover:bg-orange-50 transition-all ease-in-out "
                    >
                      <div className="flex self-end text-2xl gap-4 text-gray-600">
                        <Link href={`/recipe/${poster._id}`}>
                          <div className="relative group">
                            <GrView className="hover:text-green-600 transition-all duration-300 ease-in-out" />
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              View
                            </span>
                          </div>
                        </Link>

                        <div
                          className="relative group"
                          onClick={() => {
                            setSelectedEditRecipe(poster),
                              setShowModalEdit(true),
                              console.log(selectedEditRecipe, "+++++");
                          }}
                        >
                          <MdOutlineSystemUpdateAlt className="hover:text-yellow-600 transition-all ease-in-out" />
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Update
                          </span>
                        </div>

                        <div
                          onClick={() => openModal(poster)}
                          className="relative group"
                        >
                          <RiDeleteBin6Line className="hover:text-pink-600 transition-all ease-in-out" />
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Delete
                          </span>
                        </div>
                      </div>
                      <Link href={`/recipe/${poster._id}`}>
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
                                  <PiFireSimpleFill className="text-lg md:text-md" />
                                  <div className="flex flex-col text-xs   items-center justify-center">
                                    <p className="font-bold">CALORIES</p>
                                    {poster.cal && <p>{poster.cal}</p>}
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
                        <div className="md:grid grid-cols-12 my-4 h-5/6 w-full">
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
                        <p className="md:text-lg text-xs">
                          {poster.description}
                        </p>
                      </Link>
                    </div>
                  </>
                ))}
                {/* Modal */}
                {selectedPoster && (
                  <DeleteConfirmModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={confirmDelete}
                    name={selectedPoster.name} // Use the name from Poster
                    id={selectedPoster._id} // Use _id from Poster
                  />
                )}
                <div className="flex items-center justify-center py-4">
                  <p>End of content</p>
                </div>
              </>
            )}
          </div>
        </section>
      </>
    </>
  );
}
export default withAuth(Recipe);
