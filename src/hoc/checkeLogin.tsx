import { useAuth } from "@/context/authProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Lottie from "react-lottie";
import Loading from "@/lottie/loading.json";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const { isLoggedIn, loading } = useAuth();
    const router = useRouter();

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: Loading,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    useEffect(() => {
      if (!loading && !isLoggedIn) {
        router.push("/account/login");
      }
    }, [loading, isLoggedIn, router]);

    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center">
          <Lottie options={defaultOptions} height={200} width={200} />
        </div>
      );
    }

    if (!isLoggedIn) {
      return null;
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
