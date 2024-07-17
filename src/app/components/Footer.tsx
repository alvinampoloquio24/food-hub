import React from "react";

export default function Footer() {
  return (
    <footer className="flex text-black flex-col items-center md:flex-row border-t-2 md:px-4 xl:px-16">
      <div className="bg-white py-6 px-3 w-full items-center md:items-start flex flex-col flex-1">
        <p className=" text-lg font-bold md:text-2xl">LOGO</p>
        <p className="text-sm md:text-sm">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <ul className="flex gap-8 p-4 md:text-lg flex-1 justify-end">
        <li>Recipe</li>
        <li>Blog</li>
        <li>Contact</li>
        <li>About Us</li>
      </ul>
    </footer>
  );
}
