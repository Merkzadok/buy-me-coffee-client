"use client";

import { UserType } from "@/lib/types";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type userContextType = {
  userProvider: UserType;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
  logout: () => void;
};

export const UserContext = createContext({} as userContextType);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userProvider, setUserProvider] = useState({} as UserType);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentUserByAccessToken = async () => {
    const token = localStorage.getItem("token") as string;

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("http://localhost:4200/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserProvider(response?.data?.user);
    } catch (error: any) {
      console.log("Error fetching user:", error);
      setError(error?.response?.data?.message || "Failed to fetch user data");

      // If token is invalid, remove it
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        localStorage.removeItem("token");
        setUserProvider({} as UserType);
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    await getCurrentUserByAccessToken();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserProvider({} as UserType);
    setError(null);
  };

  useEffect(() => {
    getCurrentUserByAccessToken();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userProvider,
        loading,
        error,
        refreshUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
