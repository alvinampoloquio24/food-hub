"use client";
import React from "react";
import ProfileNav from "../components/sad";
export default function EditProfile() {
  return (
    <div className="h-screen grid grid-cols-12">
      <ProfileNav />
      <div className="col-span-10 flex p-12">
        <p className="text-2xl font-bold">Theme</p>
      </div>
    </div>
  );
}
