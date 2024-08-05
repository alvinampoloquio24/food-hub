"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Poster from "@/api/poster";
import { HashLoader } from "react-spinners";
import Lottie from "react-lottie";
import Success from "@/lottie/success.json";
import Error from "@/lottie/error.json";
import Link from "next/link";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [message, setMessage] = useState("");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Success,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: Error,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const tokenParam = searchParams.get("token");

    if (tokenParam) {
      verifyEmail(tokenParam);
    } else {
      setIsVerifying(false);
    }
  }, [searchParams]);

  const verifyEmail = async (token: any) => {
    try {
      const response = await Poster.verifyEmail(token);

      if (response.response.error) {
        setMessage(response.response.message);
        setSuccess(false);
      } else {
        setMessage(response.response.message);
        setSuccess(true);
      }
    } catch (error) {
      setMessage("An error occurred while verifying your email.");
      setSuccess(false);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div>
      {isVerifying ? (
        <div className="h-screen bg-white flex items-center gap-3 justify-center">
          <HashLoader color="#ff6b00" />
          <p>Verifying...</p>
        </div>
      ) : success ? (
        <div className="flex h-screen bg-white flex-col items-center justify-center">
          <Lottie options={defaultOptions} height={200} width={200} />
          <p className="text-xl">
            {message}
            <Link href="/account/login">
              <span className="font-semibold text-blue-600 underline">
                {" "}
                go to login
              </span>
            </Link>
          </p>
        </div>
      ) : (
        <div className="flex h-screen bg-white flex-col items-center justify-center">
          <Lottie options={defaultOptions2} height={200} width={150} />
          <p className="text-xl pt-4">
            <span className="font-semibold text-pink-600">Sorry!</span>{" "}
            {message}
          </p>
        </div>
      )}
    </div>
  );
}
