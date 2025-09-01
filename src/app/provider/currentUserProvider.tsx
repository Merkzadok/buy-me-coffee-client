"use client";

import { UserType } from "@/lib/types";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: UserType | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
  logout: () => void;
  setUser: (user: UserType | null) => void;
};

const UserContext = createContext({} as UserContextType);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentUserByAccessToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get("http://localhost:4200/profile/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const profile = data.profile;

      if (profile?.user) {
        setUser({
          ...profile.user,
          profile: {
            id: profile.id,
            name: profile.name,
            about: profile.about,
            avatarImage: profile.avatarImage,
            socialMediaURL: profile.socialMediaURL,
            backgroundImage: profile.backgroundImage,
            successMessage: profile.successMessage,
          },
        });
      } else {
        setUser({} as UserType);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch user data");
      if (err?.response?.status === 401) setUser({} as UserType);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => getCurrentUserByAccessToken();

  const logout = () => {
    localStorage.removeItem("token");
    setUser({} as UserType);
    setError(null);
  };

  useEffect(() => {
    getCurrentUserByAccessToken();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, error, refreshUser, logout, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
