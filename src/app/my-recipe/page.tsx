/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ProfileNav from "../components/sad";
import { useAuth } from "@/context/authProvider";
import { FiRss } from "react-icons/fi";
import { LuUtensilsCrossed } from "react-icons/lu";
import Poster from "@/api/poster";
import { BiDish } from "react-icons/bi";
import { RiTimerFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { CiEdit, CiMenuKebab, CiTrash, CiViewList } from "react-icons/ci";
import { FaFire } from "react-icons/fa6";
import DeleteConfirmModal from "../props/deleteModal";
import ModalEditRecipe from "../props/modalEditRecipe";
import ModalUpload from "../props/modalUploadRecipe";
import { IoArrowBack } from "react-icons/io5";
import HashLoader from "react-spinners/HashLoader";
export default function EditProfile() {
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

  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const [user, setUser] = useState<any>(null);
  const [poster, setPoster] = React.useState<Poster[]>([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [isClient, setIsClient] = useState(false);
  const contentRef = useRef(null);
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
  ///delete recipe
  const closeModal = () => {
    setDeleteModalOpen(false);
    setSelectedPoster(null);
  };
  const openDeleteModal = (item: any) => {
    setSelectedPoster(item);
    setDeleteModalOpen(true);
  };
  const confirmDelete = (_id: string) => {
    setPoster(poster!.filter((poster) => poster._id !== _id));
    deleteRecipe(_id);
    closeModal();
  };
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
  //update recipe
  const EditRecipe = async (formData: EditRecipe) => {
    try {
      setShowModalEdit(false);

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
    }
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
  const getPoster = async () => {
    try {
      setLoading(true);

      const response = await Poster.getSelf(page);
      const recipes = response.response;

      if (page == 1) {
        setPoster(recipes.recipes);
      } else {
        setPoster((prevItems) => [...prevItems, ...recipes.recipes]);
      }

      setHasMore(recipes.hasMore);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  //add Recipe
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

  const router = useRouter();
  // Adjust toggleDropdown function
  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Updated useEffect
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

      if (!storedUser) {
        return router.push("/");
      }
      setUser(storedUser);
      setIsClient(true);
    }
  }, []);
  useEffect(() => {
    if (isClient) {
      getPoster();
    }
  }, [isClient]);
  const handleScroll = useCallback(() => {
    if (!contentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      if (!loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [loading, hasMore]);
  useEffect(() => {
    const currentRef: any = contentRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      return () => currentRef.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);
  return (
    <>
      <ToastContainer />
      <ModalUpload
        isOpen={showModalUpload}
        onSubmit={handleSubmit}
        onClose={() => {
          setShowModalUpload(false);
        }}
      />
      {user ? (
        <div className="h-screen md:grid md:grid-cols-12 flex flex-col text-text-color bg-base-white">
          <ProfileNav />

          {/* only in mobile */}
          <div className=" top-0 w-full items-center md:hidden flex relative bg-base-white gap-3 shadow p-3  h-[8vh] ">
            <IoArrowBack
              className="text-xl "
              onClick={() => {
                router.back();
              }}
            />
            <p className="flex w-full ">{user?.name}</p>
          </div>
          <div
            ref={contentRef}
            className="lg:col-span-10 md:col-span-11 flex flex-col overflow-auto relative  "
          >
            <div className=" flex flex-col w-full h-1/3 ">
              <img
                src={user?.coverPhoto}
                alt=""
                className="object-cover h-full"
              />
            </div>
            <div className=" h-52  w-full relative md:-top-5 -top-4  lg:px-10 px-3 md:px-4 flex md:flex-row flex-col justify-between gap-3 md:gap-0 md:items-center">
              <div className="flex gap-3 items-center   ">
                {/* User profile image */}
                <img
                  src={user?.profile} // Fallback in case user.profile is undefined
                  alt="Profile"
                  className="object-cover lg:h-32 lg:w-32 md:h-28 md:w-28 w-20 h-20  rounded-full lg:border-4 border-2 border-white"
                />
                {/* User name */}
                <div>
                  {" "}
                  <p className="lg:text-3xl md:text-2xl text-md font-bold">
                    {user?.name || "Guest"}
                  </p>
                  <p className="text-sm md:text-lg">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="lg:px-16 md:px-8 text-md p-6 flex md:text-lg text-xs gap-2 flex-col">
              {" "}
              <div className="flex gap-2 items-center">
                <LuUtensilsCrossed className="md:text-2xl" />
                <p>
                  number of <span className="font-semibold"> post 12</span>
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <FiRss className="md:text-2xl" />
                <p>
                  followed by <span className="font-semibold">3 people</span>
                </p>
              </div>
            </div>
            <p className="p-2 md:px-8  md:text-xl text-md px-3">Posts</p>
            <div className="flex gap-3 md:px-8  items-center px-3 ">
              <img
                src={user?.profile}
                className="object-cover md:h-12 md:w-12 h-8 w-8 rounded-full "
                alt=""
              />
              <button
                onClick={() => {
                  setShowModalUpload(true);
                }}
                className="md:p-3 md:my-4 my-3 p-3 border w-full flex rounded-lg hover:shadow hover:border-blue-300"
              >
                <p className="text-gray-400 md:text-lg text-xs">
                  post new recipe...
                </p>
              </button>
            </div>
            <div className=" lg:px-10 px-2 flex flex-col gap-5">
              <div className="bg-base-mid flex flex-col gap-1 rounded shadow">
                {poster?.length === 0 ? (
                  <div className="h-90p bg-base-white flex justify-center items-center">
                    <p className="p-16 text-2xl">No recipe posted yet.</p>
                  </div>
                ) : (
                  <>
                    {" "}
                    {poster?.map((poster, index) => (
                      <div
                        key={index}
                        className="bg-base-white relative   md:p-12 p-4 md:py-12 py-6  pb-12 flex flex-col gap-8 hover:bg-base-light transition-all duration-300 ease-in-out  "
                      >
                        <div
                          key={poster._id}
                          className="absolute right-0 top-0 md:m-8 m-3"
                        >
                          <div
                            className="p-2 cursor-pointer toggle-button"
                            onClick={() => toggleDropdown(poster._id)}
                          >
                            <CiMenuKebab className="md:text-2xl text-sm" />
                          </div>

                          {openDropdowns[poster._id] && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-base-white ring-1 ring-black ring-opacity-5 dropdown">
                              <div
                                className="py-1"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                <button
                                  className=" px-4 flex w-full items-center gap-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => {
                                    router.push(`recipe/${poster._id}`);
                                  }}
                                >
                                  <CiViewList className="text-lg" />
                                  <p>View</p>
                                </button>

                                <button
                                  className=" px-4 flex w-full items-center gap-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => {
                                    setSelectedEditRecipe(poster),
                                      setShowModalEdit(true);
                                  }}
                                >
                                  <CiEdit className="text-lg" />
                                  <p>Edit</p>
                                </button>
                                <button
                                  className=" px-4 flex w-full items-center gap-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => {
                                    openDeleteModal(poster);
                                  }}
                                >
                                  <CiTrash className="text-lg" />
                                  <p>Delete</p>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="md:grid grid-cols-12 ">
                          <div className=" col-span-7">
                            <p className="md:text-2xl xl:text-3xl text-lg font-bold text-base-dark">
                              {poster.name}
                            </p>
                            <div className="flex flex-col md:pt-5 lg:flex-row lg:justify-between col-span-6">
                              {/* Grid Line  */}
                              <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 justify-between w-full py-2">
                                <div className="flex gap-2 lg:gap-3 items-center justify-center ">
                                  <img
                                    src={poster.user.profile}
                                    alt=""
                                    className="rounded-full object-cover md:h-8 md:w-8 h-6 w-6 "
                                  />
                                  <div className="flex flex-col text-x2s items-center justify-center">
                                    <p className="text-x2s font-bold">
                                      {poster.user.name}
                                    </p>
                                    <p>Jan 2 2024</p>
                                  </div>
                                </div>
                                <div className="lg:flex gap-1 lg:gap-3 hidden  items-center border-l-2  justify-center">
                                  <FaFire className="text-lg md:text-md" />
                                  <div className="flex flex-col text-x2s   items-center justify-center">
                                    <p className="font-bold">CALORIES</p>
                                    <p>{poster.cal}</p>
                                  </div>
                                </div>
                                <div className="flex  gap-1 lg:gap-3  items-center border-l-2 justify-center">
                                  <RiTimerFill className="text-lg md:text-md" />
                                  <div className="flex flex-col text-x2s  items-center justify-center">
                                    <p className="font-bold">COOK TIME</p>
                                    <p>{poster.time}</p>
                                  </div>
                                </div>
                                <div className="flex gap-1 lg:gap-3 items-center border-l-2 justify-center">
                                  <BiDish className="text-lg md:text-sm" />
                                  <div className="flex flex-col text-x2s  items-center justify-center">
                                    <p className="font-bold uppercase">
                                      {poster.dishType}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-5 md:flex hidden gap-6 items-center justify-center"></div>
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

                        <p className="md:text-lg text-xs">
                          {poster.description}
                        </p>
                      </div>
                    ))}
                    {selectedPoster && (
                      <DeleteConfirmModal
                        isOpen={isDeleteModalOpen}
                        onClose={closeModal}
                        onConfirm={confirmDelete}
                        name={selectedPoster.name} // Use the name from Poster
                        id={selectedPoster._id} // Use _id from Poster
                      />
                    )}
                    <ModalEditRecipe
                      recipe={selectedEditRecipe}
                      isOpen={showModalEdit}
                      onClose={() => setShowModalEdit(false)}
                      onSubmit={handleSubmitEditRecipe}
                    />
                    <div className="flex items-center justify-center py-4">
                      <p>End of content</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center gap-2">
          <p>Loading...</p>
          <HashLoader color="#ff5c00" />
        </div>
      )}
    </>
  );
}
