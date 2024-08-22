/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import ProfileNav from "../components/sad";
import { useAuth } from "@/context/authProvider";
import { MdEditSquare } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { FiRss } from "react-icons/fi";
import { LuUtensilsCrossed } from "react-icons/lu";
import Poster from "@/api/poster";
import { BiDish } from "react-icons/bi";
import { RiTimerFill } from "react-icons/ri";
import EditProfileModal from "../props/ModalEditProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { CiEdit, CiMenuKebab, CiTrash, CiViewList } from "react-icons/ci";
import { FaFire } from "react-icons/fa6";
import DeleteConfirmModal from "../props/deleteModal";
import ModalEditRecipe from "../props/modalEditRecipe";
import ModalUpload from "../props/modalUploadRecipe";
import { IoArrowBack } from "react-icons/io5";
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
  const { refreshUser } = useAuth();
  const user: any = JSON.parse(localStorage.getItem("user") || "null");
  const [poster, setPoster] = React.useState<Poster[] | null>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
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
      const data = await Poster.getSelf();
      setPoster(data.response);
    } catch (error) {
      throw error;
    } finally {
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
    }
    getPoster();
  }, []);

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
      <div className="h-screen grid lg:grid-cols-12 ">
        <ProfileNav />
        {/* Fixed ProfileNav */}
        <div className="col-span-10 flex flex-col overflow-auto relative  ">
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
          <p className="p-2  md:text-xl text-md px-3">Posts</p>
          <div className="flex gap-3 items-center px-3 md:px-0">
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
                <div className="h-90p bg-white flex justify-center items-center">
                  <p className="p-16 text-2xl">No recipe posted yet.</p>
                </div>
              ) : (
                <>
                  {" "}
                  {poster?.map((poster, index) => (
                    <div
                      key={index}
                      className="bg-white border-b relative   md:p-12 p-4 md:py-12 py-6  pb-12 flex flex-col gap-8 hover:bg-orange-50 transition-all duration-300 ease-in-out  "
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
                          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dropdown">
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
                          <p className="md:text-2xl text-lg font-bold text-base-dark">
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
                                <div className="flex flex-col text-xs items-center justify-center">
                                  <p className="text-xs font-bold">
                                    {poster.user.name}
                                  </p>
                                  <p>Jan 2 2024</p>
                                </div>
                              </div>
                              <div className="lg:flex gap-1 lg:gap-3 hidden  items-center border-l-2  justify-center">
                                <FaFire className="text-lg md:text-md" />
                                <div className="flex flex-col text-xs   items-center justify-center">
                                  <p className="font-bold">CALORIES</p>
                                  <p>{poster.cal}</p>
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

                      <p className="md:text-lg text-xs">{poster.description}</p>
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
                  <ModalUpload
                    isOpen={showModalUpload}
                    onClose={() => setShowModalUpload(false)}
                    onSubmit={handleSubmit}
                  />
                  <div className="flex items-center justify-center py-4">
                    <p>End of content</p>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* only in mobile */}
          <div className=" top-0 w-full items-center lg:hidden flex fixed bg-white gap-3 shadow   p-3 ">
            <IoArrowBack
              className="text-xl "
              onClick={() => {
                router.back();
              }}
            />
            <p className="flex w-full ">{user?.name}</p>
          </div>
        </div>
      </div>
    </>
  );
}
