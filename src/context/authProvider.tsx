"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const api = process.env.NEXT_PUBLIC_LOCALHOST;

interface User {
  _id: string;
  name: string;
  email: string;
  coverPhoto: any;
  profile: any;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  refreshUser: () => Promise<void>;
  checkLoginStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const checkLoginStatus = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("token");
      } else {
        const response = await fetch(`${api}/getUser`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));

          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUser(null);
          localStorage.removeItem("token"); // Clear token on failure
        }
      }
    } catch (error) {
      console.error("Failed to check login status:", error);
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false); // Ensure loading is set to false after all cases
    }
  };

  const refreshUser = async () => {
    await checkLoginStatus(); // Re-fetch user data when needed
  };

  useEffect(() => {
    checkLoginStatus(); // Run once on mount to fetch initial user data
  }, []);

  const value = {
    user,
    isLoggedIn,
    loading,
    refreshUser,
    checkLoginStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
