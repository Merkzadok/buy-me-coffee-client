"use client";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { SignUpButton } from "../../sign-up/components/SignUpButton";
import { useState } from "react";
import { toast } from "sonner";

interface Values {
  email: string;
  password: string;
}

export const LoginAccount = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (values: Values) => {
    setLoading(true);
    setEmailError("");
    setPasswordError("");

    try {
      const response = await axios.post<{ accesstoken: string }>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
        {
          email: values.email,
          password: values.password,
        }
      );

      // ✅ Login success
      localStorage.setItem("token", response.data.accesstoken);
      router.push("/home");
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.message || "";

      if (status === 404 || message.toLowerCase().includes("email")) {
        setEmailError("Email not found");
        toast.error("Email not found");
      } else if (status === 401 || message.toLowerCase().includes("password")) {
        setPasswordError("Incorrect password");
        toast.error("Incorrect password");
      } else {
        toast.error("Login failed. Please try again.");
        console.error("Login error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
  });

  const isDisabled = loading || emailError !== "" || passwordError !== "";

  return (
    <div className="flex flex-col items-center justify-center w-1/2 bg-gray-100 px-4 relative">
      <div className="absolute top-10 right-10">
        <SignUpButton />
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
          Welcome back
        </h1>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
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
              className={`mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              disabled={loading}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          {/* Password */}
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
              className={`mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              disabled={loading}
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          {/* Continue button */}
          <button
            type="submit"
            disabled={isDisabled}
            className={`mt-4 font-semibold py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer
              ${
                isDisabled
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-black hover:bg-sky-100 text-white hover:text-black"
              }`}
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};
