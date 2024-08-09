"use client";
import React, { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import bg from "../../../../public/loginbg.jpg";
import Poster from "@/api/poster";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { PropagateLoader } from "react-spinners";
import { useUserStore } from "@/zustand/user";

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

export default function LoginPage() {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  };
  const login = async (params: any) => {
    setLoading(true);
    try {
      const user = await Poster.login(params);
      if (user.response.error) {
        return toast.error(user.response.message);
      } else {
        setUser(user.response.user);
        return router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {}, [loading]);

  return (
    <>
      <main className="relative h-screen overflow-hidden">
        <Image
          src={bg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-white md:bg-opacity-30  bg-opacity-70 flex items-center justify-center">
          <div className="w-full max-w-md py-8 px-16 md:bg-white  rounded-2xl md:shadow-lg">
            <h1 className="md:text-3xl text-2xl font-bold text-center mb-8 ">
              Login
            </h1>
            <div className="flex gap-2 md:text-sm text-xs py-4">
              {" "}
              <p>Dont have an account?</p>
              <Link href={"/account/create-account"}>
                {" "}
                <p className="uppercase font-bold text-base-dark hover:underline">
                  create account
                </p>
              </Link>
            </div>
            <form className="space-y-6 " onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
              </div>
              {!loading ? (
                <button
                  type="submit"
                  className="w-full bg-base-dark text-white py-2 rounded-md hover:bg-orange-500 transition duration-300"
                >
                  Sign In
                </button>
              ) : (
                <div className=" py-2 flex items-center justify-center ">
                  <PropagateLoader color="#ff7a00" className="py-3" />
                </div>
              )}
            </form>
            <div className="mt-8">
              <p className="text-center text-sm text-gray-600 mb-4">
                Or sign in with
              </p>
              <div className="flex justify-center space-x-4">
                <SocialButton icon={<FcGoogle className="text-2xl" />} />
                <SocialButton
                  icon={<FaFacebook className="text-2xl text-blue-600" />}
                />
                <SocialButton icon={<FaXTwitter className="text-2xl " />} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
