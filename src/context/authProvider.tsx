"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const api = process.env.NEXT_PUBLIC_LOCALHOST;

interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
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
        return;
      }

      const response = await fetch(`${api}/getUser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User data:", userData);
        setUser(userData);
        setIsLoggedIn(true);
        console.log("isLoggedIn after setting to true:", true);
      } else {
        console.log("Error: response not ok");
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Failed to check login status:", error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    console.log("isLoggedIn updated:", isLoggedIn);
  }, [isLoggedIn]);

  const value = {
    user,
    isLoggedIn,
    loading,
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