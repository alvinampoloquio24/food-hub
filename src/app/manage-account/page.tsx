"use client";
import React, { useEffect, useState } from "react";
import ProfileNav from "../components/sad";
import { HiMiniRss } from "react-icons/hi2";
import { IoArrowBack, IoSaveOutline, IoTrashOutline } from "react-icons/io5";
import { PiBowlFood } from "react-icons/pi";
import { GoChecklist } from "react-icons/go";
import { RxUpdate } from "react-icons/rx";
import DeleteAccount from "../props/DeleteAccount";
import Poster from "@/api/poster";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const [DeleteModal, setDeleteModal] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const handleDeleteAccount = (_id: string) => {
    setDeleteModal(false);
    deleteAccount(_id);
  };
  const deleteAccount = async (_id: string) => {
    try {
      const user = await Poster.deleteUser();
      if (!user.status) {
        return toast.error("Error deletinng recipe !");
      }
      toast.success(user.response.message);
      router.push("/");
    } catch (error) {
      toast.error("Something went worong");
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      setUser(storedUser);
    }
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="h-screen grid md:grid-cols-12">
        <DeleteAccount
          isOpen={DeleteModal}
          name={user?.name}
          _id={user?._id}
          onConfirm={handleDeleteAccount}
          onClose={() => setDeleteModal(false)}
        />

        <ProfileNav />
        <div className="lg:col-span-10 md:col-span-11 flex md:p-12 p-4 flex-col justify-center bg-white ">
          <p className="md:text-2xl font-bold">Manage Account</p>
          <ul className="flex flex-col py-6 text-md font gap-2 ">
            <li className="flex flex-col ">
              <p className="my-2">follow</p>
              <div className="p-4 bg-white  shadow flex items-center rounded gap-2 hover:bg-base-light transition-all duration-300 cursor-pointer">
                <HiMiniRss /> <p>Followers</p>
              </div>
            </li>
            <li className="flex flex-col  ">
              <p className="my-2">recipe</p>
              <div className="rounded shadow ">
                <div className="p-4 bg-white   flex items-center  gap-2 hover:bg-base-light transition-all duration-300 cursor-pointer">
                  <PiBowlFood /> <p>my recipes</p>
                </div>
                <div className="p-4 bg-white   flex items-center  gap-2 hover:bg-base-light transition-all duration-300 cursor-pointer">
                  <IoSaveOutline /> <p>saved recipes</p>
                </div>
              </div>
            </li>
            <li className="flex flex-col  ">
              <p className="my-2">account</p>
              <div className="rounded shadow ">
                <div className="p-4 bg-white   flex items-center  gap-2 hover:bg-base-light transition-all duration-300 cursor-pointer">
                  <GoChecklist /> <p>Comlpete your profile </p>
                </div>
                <div className="p-4 bg-white  flex items-center  gap-2 hover:bg-base-light transition-all duration-300 cursor-pointer">
                  <RxUpdate /> <p>Update your account details</p>
                </div>
                <div
                  onClick={() => setDeleteModal(true)}
                  className="p-4 bg-white   flex items-center  gap-2 hover:bg-red-200 transition-all duration-300 cursor-pointer"
                >
                  <IoTrashOutline /> <p>Delete your account</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* only in mobile */}
        <div className=" top-0 w-full items-center md:hidden flex fixed bg-white gap-3 shadow p-3  h-[8vh] ">
          <IoArrowBack
            className="text-xl "
            onClick={() => {
              router.back();
            }}
          />
          <p className="flex w-full ">{user?.name}</p>
        </div>
      </div>
    </>
  );
}
