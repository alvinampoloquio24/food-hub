import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NextComponentType, NextPageContext } from "next";

// Define a type for the props that will be passed to the wrapped component
type WithAuthProps = {
  [key: string]: any;
};

// Define the HOC function
export default function withAuth<P extends WithAuthProps>(
  WrappedComponent: NextComponentType<NextPageContext, any, P>
) {
  // Return a new component
  const Auth = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      // Check if the user is authenticated
      const isAuthenticated = checkUserAuthentication();

      if (!isAuthenticated) {
        // If not authenticated, redirect to login page
        router.push("http://localhost:3000/account/login");
      }
    }, []);

    // If authenticated, render the wrapped component with its props
    return <WrappedComponent {...props} />;
  };

  // Copy getInitialProps so it will run as well
  if (WrappedComponent.getInitialProps) {
    Auth.getInitialProps = WrappedComponent.getInitialProps;
  }
  return Auth;
}

// Helper function to check user authentication
// Replace this with your actual authentication logic
function checkUserAuthentication(): boolean {
  // For example, check if a token exists in localStorage
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return !!token;
}
