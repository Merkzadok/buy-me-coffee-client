"use client";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingProfile } from "@/components/LoadingProfile";
import { SignUpButton } from "../../sign-up/components/SignUpButton";

interface Values {
  email: string;
  password: string;
}

export const LoginAccount = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: Values) => {
    setLoading(true);

    try {
      const response = await axios.post<{ accessToken: string }>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
        values
      );

      localStorage.setItem("token", response.data.accessToken);
      router.push("/home");
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.message?.toLowerCase() || "";

      if (status === 404 || message.includes("email"))
        toast.error("Email not found");
      else if (status === 401 || message.includes("password"))
        toast.error("Incorrect password");
      else toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: handleSubmit,
  });

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
          <LoadingProfile />
        </div>
      )}

      <div className="flex flex-col items-center justify-center w-1/2 bg-gray-100 px-4 relative">
        <div className="absolute top-10 right-10">
          <SignUpButton />
        </div>

        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-2xl font-bold mb-2 text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
            Welcome back
          </h1>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email here"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password here"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 font-semibold py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer ${
                loading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-black hover:bg-sky-100 text-white hover:text-black"
              }`}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
