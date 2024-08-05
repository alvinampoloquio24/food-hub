"use client";
import React, { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import bg from "../../../../public/loginbg.jpg";
import Poster from "@/api/poster";
import CheckEmail from "../check-email/page";
import Lottie from "react-lottie";
import Loading from "@/lottie/loading.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from "react-spinners";

interface SocialButtonProps {
  icon: ReactElement;
}

function SocialButton({ icon }: SocialButtonProps) {
  return (
    <button className="p-2 rounded-full border hover:bg-gray-100 transition duration-300">
      {icon}
    </button>
  );
}

export default function CreateAccountPage() {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDisabled, setIsDisable] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isInputComplete = () => {
    return (
      formData.password === formData.confirmPassword &&
      formData.password.length >= 8
    );
  };
  const createUser = async (params: any) => {
    try {
      setLoading(true);
      const user = await Poster.createAccount(params);

      if (user.response.error) {
        return toast.error(user.response.message);
      } else {
        toast.success(user.response.message);
        return setShowModal(true);
      }
    } catch (error) {
      console.error("Error creating account:", error);
      // Handle the error (e.g., show an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(formData);
  };
  useEffect(() => {
    console.log(loading);
    setIsDisable(!isInputComplete());
  }, [handleInputChange]);
  return (
    <>
      <main className="relative h-screen overflow-hidden">
        {
          <>
            <Image
              src={bg}
              alt="Background"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
            />
            <div className="absolute inset-0 bg-white md:bg-opacity-30 bg-opacity-70 flex items-center justify-center">
              <div className="w-full max-w-md py-8 px-16 md:bg-white rounded-2xl md:shadow-lg">
                <h1 className="md:text-3xl text-2xl font-bold text-center mb-8 ">
                  Create Account
                </h1>
                <div className="flex gap-2 text-sm py-4">
                  <p>Already have an account?</p>
                  <Link
                    href="/account/login"
                    className="uppercase font-bold text-base-dark hover:underline"
                  >
                    login
                  </Link>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("password")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-500" />
                      ) : (
                        <FaEye className="text-gray-500" />
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="text-gray-500" />
                      ) : (
                        <FaEye className="text-gray-500" />
                      )}
                    </button>
                  </div>
                  {!loading ? (
                    <button
                      disabled={isDisabled}
                      type="submit"
                      className={`w-full py-2 rounded-md transition duration-300 ${
                        isDisabled
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-base-dark text-white hover:bg-orange-500"
                      }`}
                    >
                      Create Account
                    </button>
                  ) : (
                    <div className=" py-2 flex items-center justify-center ">
                      <PropagateLoader color="#ff7a00" className="py-3" />
                    </div>
                  )}
                </form>
                <div className="mt-8">
                  <p className="text-center text-sm text-gray-600 mb-4">
                    Or sign up with
                  </p>
                  <div className="flex justify-center space-x-4">
                    <SocialButton icon={<FcGoogle className="text-2xl" />} />
                    <SocialButton
                      icon={<FaFacebook className="text-2xl text-blue-600" />}
                    />
                    <SocialButton icon={<FaXTwitter className="text-2xl" />} />
                  </div>
                </div>
              </div>
            </div>
          </>
        }{" "}
        {showModal && <CheckEmail email={formData.email} />}
      </main>
      <ToastContainer />
    </>
  );
}
