// Use client directive to enable client-side rendering
"use client";

import React from "react";
import Email from "@/lottie/email.json";
import Lottie from "react-lottie";

// Define the props for CheckEmail component

// Export CheckEmail component as default
export default function CheckEmail({ email }: any) {
  // Define options for Lottie animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Email,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Render the component
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4 relative">
        <div className="flex flex-col items-center gap-6">
          <Lottie options={defaultOptions} height={200} width={200} />
          <h2 className="md:text-3xl text-xl font-bold text-base-dark text-center">
            Email Confirmation
          </h2>
          <p className="md:text-lg text-sm text-center text-gray-600 pb-6 border-b border-gray-200">
            Weve sent an email to{" "}
            <span className="font-semibold text-base-dark">{email}</span> to
            verify your email address. To finalize your registration, please
            check your inbox and click on the link provided in the message.
          </p>
          <p className="text-center md:text-sm text-xs">
            If you did not receive any email,{" "}
            <button className="text-blue-500 underline">
              resend confirmation email
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
