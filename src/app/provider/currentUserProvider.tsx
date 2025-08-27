// "use client";

// import { UserType } from "@/lib/types";
// import axios from "axios";
// import React, { createContext, useContext, useEffect, useState } from "react";

// type userContextType = {
//   userProvider: UserType;
//   loading: boolean;
//   error: string | null;
//   refreshUser: () => Promise<void>;
//   logout: () => void;
// };

// export const UserContext = createContext({} as userContextType);

// export default function UserContextProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [userProvider, setUserProvider] = useState({} as UserType);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const getCurrentUserByAccessToken = async () => {
//     const token = localStorage.getItem("token") as string;

//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const response = await axios.get("http://localhost:4200/profile/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("Fetched user:", response.data); // <-- check structure

//       setUserProvider(response?.data?.user);
//     } catch (error: any) {
//       console.log("Error fetching user:", error);
//       setError(error?.response?.data?.message || "Failed to fetch user data");

//       // 🔥 don't remove token automatically anymore
//       setUserProvider({} as UserType);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const refreshUser = async () => {
//     await getCurrentUserByAccessToken();
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUserProvider({} as UserType);
//     setError(null);
//   };

//   useEffect(() => {
//     getCurrentUserByAccessToken();
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         userProvider,
//         loading,
//         error,
//         refreshUser,
//         logout,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }

// export const useUser = () => useContext(UserContext);
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
      console.log("🔍 No token found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log(
        "🔍 Fetching user with token:",
        token.substring(0, 20) + "..."
      );

      const response = await axios.get("http://localhost:4200/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("🔍 API Response:", response.data);
      console.log("🔍 Response structure:", {
        hasUser: !!response.data?.user,
        hasDirectData: !!response.data?.id,
        responseKeys: Object.keys(response.data || {}),
      });

      // FIX 1: Handle different response structures
      // Check if the user data is directly in response.data or in response.data.user
      let userData;
      if (response.data?.user) {
        userData = response.data.user;
      } else if (response.data?.id) {
        userData = response.data;
      } else {
        console.warn("⚠️ Unexpected response structure");
        userData = response.data;
      }

      console.log("🔍 Setting user data:", userData);
      setUserProvider(userData);

      // FIX 2: Remove the duplicate line that was overwriting the data
      // setUserProvider(response?.data?.user); // ← This was duplicated and possibly wrong
    } catch (error: any) {
      console.error("❌ Error fetching user:", error);
      console.error("❌ Error response:", error?.response?.data);

      setError(error?.response?.data?.message || "Failed to fetch user data");

      // Only clear user data if it's actually an auth error
      if (error?.response?.status === 401) {
        console.log("🔍 401 error - clearing user data");
        setUserProvider({} as UserType);
        // Optionally remove invalid token
        // localStorage.removeItem("token");
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    console.log("🔍 Refreshing user data...");
    await getCurrentUserByAccessToken();
  };

  const logout = () => {
    console.log("🔍 Logging out user");
    localStorage.removeItem("token");
    setUserProvider({} as UserType);
    setError(null);
  };

  useEffect(() => {
    getCurrentUserByAccessToken();
  }, []);

  // Debug: Log context state changes
  useEffect(() => {
    console.log("🔍 Context state changed:", {
      hasUser: !!userProvider?.id,
      loading,
      error,
      userKeys: Object.keys(userProvider || {}),
    });
  }, [userProvider, loading, error]);

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
