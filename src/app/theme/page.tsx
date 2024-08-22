"use client";
import React from "react";
import ProfileNav from "../components/sad";
export default function EditProfile() {
  return (
    <div className="h-screen grid md:grid-cols-12">
      <ProfileNav />
      <div className="lg:col-span-10 md:col-span-11 flex p-12">
        <p className="text-2xl font-bold">Theme</p>
      </div>
    </div>
  );
}
