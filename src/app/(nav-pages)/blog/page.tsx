/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */

import React, { useEffect } from "react";
import Email from "../../props/email";
import getPoster from "@/api/poster";
import { MdClear } from "react-icons/md";
import { TiArrowUpThick } from "react-icons/ti";
import { IoMdArrowDropright } from "react-icons/io";
import Navagation from "@/app/components/Navagation";
import Content from "./content";
import Search from "./search";

export default async function blog() {
  const getArticle = async () => {
    try {
      const data = await getPoster.getArticle();
      return data.response;
    } catch (error) {
      throw error;
    }
  };

  const content = await getArticle();
  return (
    <>
      <Navagation />
      <main className="bg-base-white lg:px-64 md:px-12 px-4 ">
        <p className="md:text-2xl text-xl font-bold text-center pt-5">
          Blog & Article
        </p>
        <Search />
        {/* ///content */}
        <Content content={content} />
        <p className="p-4 text-center">End of Content</p>
      </main>
    </>
  );
}
