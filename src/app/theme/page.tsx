"use client";
import React, { useState, useEffect, useRef } from "react";
import ProfileNav from "../components/sad";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { BsPatchCheckFill } from "react-icons/bs";
import HashLoader from "react-spinners/HashLoader";
export default function EditProfile() {
  const [theme, setTheme] = useState<any>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("theme") || "null");
    }
    return null;
  });
  const [viewTheme, setViewTheme] = useState(false);
  const [colors, setColors] = useState<any>(null);
  const [selected, setSelected] = useState<any>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedTheme") || "light";
    }
    return "light";
  });
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [appliedTheme, setAppliedTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedTheme") || "light";
    }
    return "light";
  });
  const rippleRef = useRef<HTMLButtonElement>(null);

  const applyTheme = (colors: any) => {
    document.documentElement.style.transition = "all 0.5s ease-in-out";
    document.documentElement.style.setProperty(
      "--color-base-mid",
      colors["base-mid"]
    );
    document.documentElement.style.setProperty(
      "--color-base-light",
      colors["base-light"]
    );
    document.documentElement.style.setProperty(
      "--color-base-dark",
      colors["base-dark"]
    );
    document.documentElement.style.setProperty(
      "--color-text-color",
      colors["text-color"]
    );
    document.documentElement.style.setProperty(
      "--color-base-white",
      colors["base-white"]
    );
    document.documentElement.style.setProperty(
      "--color-base-normal",
      colors["base-normal"]
    );
  };

  const toggleColor = (theme: string) => {
    let colors: any;
    if (theme === "light") {
      colors = {
        "base-mid": "#EEEEEE",
        "base-light": "#ffe4c1",
        "base-dark": "#DC5F00",
        "text-color": "#06283D",
        "base-white": "#FFFFFF",
        "base-normal": "#EEEEEE",
      };
    } else if (theme === "dark") {
      colors = {
        "base-mid": "#575757",
        "base-light": "#8b8b8b",
        "base-dark": "#ff892e",
        "text-color": "#ffffff",
        "base-white": "#3f3f3f",
        "base-normal": "#575757",
      };
    } else if (theme === "old-money") {
      colors = {
        "base-mid": "#FFDBB5",
        "base-light": "#FFEAC5",
        "base-dark": "#603F26",
        "text-color": "#201E43",
        "base-white": "#F8EDE3",
        "base-normal": "#FFDBB5",
      };
    } else if (theme === "ocean") {
      colors = {
        "base-mid": "#A7E6FF",
        "base-light": "#f9ece4",
        "base-dark": "#27374D",
        "text-color": "#567189",
        "base-white": "#ffffff",
        "base-normal": "#f9ece4",
      };
    }
    setColors(colors);
    setViewTheme(true);
    setSelected(theme);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      if (!storedUser) {
        router.push("/");
      } else {
        setUser(storedUser);
      }
    }
  }, []);

  useEffect(() => {
    if (theme) {
      applyTheme(theme);
    }
  }, [theme]);

  const handleApplyClick = () => {
    localStorage.setItem("selectedTheme", selected);
    if (rippleRef.current) {
      rippleRef.current.classList.add("active");
      setTimeout(() => {
        rippleRef.current?.classList.remove("active");
      }, 500);

      const previewContainer = document.querySelector(".preview-container");
      if (previewContainer) {
        previewContainer.classList.add("apply-animation");
        setTimeout(() => {
          previewContainer.classList.remove("apply-animation");
        }, 500);
      }

      setTimeout(() => {
        setTheme(colors);
        localStorage.setItem("theme", JSON.stringify(colors));
        setAppliedTheme(selected); // Update the applied theme
        applyTheme(colors);
        setViewTheme(false);
        setColors(null);
      }, 500);
    }
  };

  return (
    <>
      {user ? (
        <div className="h-screen bg-base-white md:grid md:grid-cols-12 flex flex-col  ">
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
          <ProfileNav />
          <div className="lg:col-span-10 flex gap-4 md:col-span-11 relative  flex-col md:p-12 p-6 bg-base-white">
            <p className="md:text-2xl text-lg font-bold text-text-color md:py-4 ">
              Themes
            </p>
            <div
              className="bg-white border p-4 text-black relative flex rounded-lg items-center gap-4 hover:bg-slate-100 transition-all duration-300 hover:-translate-x-1"
              onClick={() => toggleColor("light")}
            >
              <div className="relative flex">
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow  "
                  style={{ backgroundColor: "#ff892e" }}
                ></div>
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow right-4"
                  style={{ backgroundColor: "#ffe4c1" }}
                ></div>
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow right-8"
                  style={{ backgroundColor: "#EEEEEE" }}
                ></div>
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow right-12"
                  style={{ backgroundColor: "#ffffff" }}
                ></div>
              </div>
              <p>Default</p>
              {appliedTheme == "light" && (
                <div className="absolute top-0 flex gap-2 items-center right-0 md:py-2 md:px-6 md:text-lg text-sm  px-3 rounded-bl-lg bg-green-300">
                  <BsPatchCheckFill className="bg-green-300" />
                  <p>selected</p>
                </div>
              )}
            </div>
            <div
              className="bg-gray-600 border p-4 text-text-color relative flex rounded-lg items-center gap-4  hover:bg-slate-600 transition-all duration-300 hover:-translate-x-1"
              onClick={() => toggleColor("dark")}
            >
              <div className="relative flex">
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow  "
                  style={{ backgroundColor: "#3f3f3f" }}
                ></div>
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow right-4"
                  style={{ backgroundColor: "#575757" }}
                ></div>
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow right-8"
                  style={{ backgroundColor: "#8b8b8b" }}
                ></div>
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow right-12"
                  style={{ backgroundColor: "#ff892e" }}
                ></div>
              </div>
              <p className="text-white">Dark</p>
              {appliedTheme == "dark" && (
                <div className="absolute top-0 flex gap-2 items-center right-0 md:py-2 md:px-6 md:text-lg text-sm  px-3 rounded-bl-lg bg-green-300">
                  <BsPatchCheckFill className="bg-green-300" />
                  <p>selected</p>
                </div>
              )}
            </div>
            <div
              className="bg-cyan-300 border p-4 text-text-color relative flex rounded-lg items-center gap-4  hover:bg-cyan-400 transition-all duration-300 hover:-translate-x-1"
              onClick={() => toggleColor("ocean")}
            >
              <div className="relative flex">
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow  "
                  style={{ backgroundColor: "#27374D" }}
                ></div>
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow right-4"
                  style={{ backgroundColor: "#567189" }}
                ></div>
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow right-8"
                  style={{ backgroundColor: "#A7E6FF" }}
                ></div>
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow right-12"
                  style={{ backgroundColor: "#f9ece4" }}
                ></div>
              </div>
              <p>Ocean</p>
              {appliedTheme == "ocean" && (
                <div className="absolute top-0 flex gap-2 items-center right-0 md:py-2 md:px-6 md:text-lg text-sm  px-3 rounded-bl-lg bg-green-300">
                  <BsPatchCheckFill className=" text-black" />
                  <p className="text-black">selected</p>
                </div>
              )}
            </div>
            <div
              className="bg-orange-100 border p-4 text-text-color relative flex rounded-lg items-center gap-4  hover:bg-orange-200 transition-all duration-300 hover:-translate-x-1"
              onClick={() => toggleColor("old-money")}
            >
              <div className="relative flex">
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow  "
                  style={{ backgroundColor: "#603F26" }}
                ></div>
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow right-4"
                  style={{ backgroundColor: "#FFDBB5" }}
                ></div>
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow right-8"
                  style={{ backgroundColor: "#FFEAC5" }}
                ></div>
                <div
                  className="p-3 w-12 h-12 rounded-full relative shadow right-12"
                  style={{ backgroundColor: "#F8EDE3" }}
                ></div>
              </div>
              <p className="text-black ">Old money</p>
              {appliedTheme == "old-money" && (
                <div className="absolute top-0 flex gap-2 items-center right-0 md:py-2 md:px-6 md:text-lg text-sm  px-3 rounded-bl-lg bg-green-300">
                  <BsPatchCheckFill className=" text-black" />
                  <p className="text-black">selected</p>
                </div>
              )}
            </div>
          </div>
          {viewTheme && (
            <div
              onClick={() => {
                setViewTheme(false);
              }}
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            >
              <div className="bg-base-white  md:p-6 p-3 rounded-lg shadow-lg h-[90vh] md:text-lg text-sm max-w-screen-md lg:w-full w-full flex flex-col justify-around preview-container">
                <p
                  className="md:text-2xl text-lg font-bold text-gray-400"
                  style={{
                    color: colors["base-dark"],
                  }}
                >
                  Preview
                </p>
                <div
                  className="grid grid-cols-12 h-4/6 shadow justify-between"
                  style={{ color: colors["text-color"] }}
                >
                  <div
                    className="col-span-3 p-4 text-sm"
                    style={{
                      background: `linear-gradient(to bottom right, ${colors["base-white"]}, ${colors["base-mid"]})`,
                    }}
                  >
                    <p>John Doe</p>
                    <div className="flex flex-col mt-8 gap-3">
                      <p>Profile</p>
                      <p>My recipe</p>
                      <p>Manage </p>
                      <p
                        className="font-bold "
                        style={{
                          color: colors["base-dark"],
                          backgroundColor: colors["base-light"],
                        }}
                      >
                        Themes
                      </p>
                      <p>Logout</p>
                    </div>
                  </div>
                  <div
                    className="col-span-9 p-8 shadow flex flex-col gap-2"
                    style={{ backgroundColor: colors["base-white"] }}
                  >
                    <div
                      className="flex gap-2 items-center"
                      style={{ backgroundColor: colors["base-white"] }}
                    >
                      <div
                        className="p-5 h-8 w-8 rounded-full bg-base-mid"
                        style={{ backgroundColor: colors["base-mid"] }}
                      ></div>
                      <p>John doe</p>
                    </div>
                    <div>
                      <p
                        className="text-lg font-bold"
                        style={{ color: colors["base-dark"] }}
                      >
                        Lorem
                      </p>
                      <p
                        className="w-full p-10"
                        style={{ backgroundColor: colors["base-mid"] }}
                      ></p>
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quod iusto unde cum cupiditate sunt natus quasi, eveniet
                        reprehenderit, numquam necessitatibus tempora temporibus
                        aliquam optio doloribus enim quas minima vitae quidem?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 items-center justify-center">
                  <button
                    ref={rippleRef}
                    onClick={handleApplyClick}
                    className="ripple bg-blue-500 rounded shadow transition-all duration-300 hover:bg-blue-600 md:p-3 p-2 w-28 text-white"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => {
                      setViewTheme(false);
                      setColors(null);
                    }}
                    className="bg-slate-300 rounded shadow md:p-3 p-2 w-28 text-black transition-all duration-300 hover:bg-slate-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
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
