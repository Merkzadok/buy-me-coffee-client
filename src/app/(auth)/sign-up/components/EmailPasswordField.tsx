"use client";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingProfile } from "@/components/LoadingProfile";

type EmailPasswordFieldsProps = {
  setStep: Dispatch<SetStateAction<number>>;
  data: string; // username string from previous step
  setData: Dispatch<SetStateAction<any>>;
};

interface Values {
  email: string;
  password: string;
}

const EmailPasswordFields = ({
  setStep,
  data: username,
  setData,
}: EmailPasswordFieldsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: Values) => {
    if (!username) {
      console.error("Username missing from previous step");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
        {
          email: values.email,
          password: values.password,
          username: username, // use string directly
        }
      );

      if (response.status === 201 && response.data.accessToken) {
        const token = response.data.accessToken;

        // Move to next step or redirect user
        router.push("/login");
      } else {
        console.error("Unexpected response from signup:", response.data);
      }
    } catch (error: any) {
      console.error("Error during sign-up", error);
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

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
          <LoadingProfile />
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email here"
            value={formik.values.email}
            onChange={formik.handleChange}
            disabled={loading}
            required
          />
        </div>

        <div>
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
            disabled={loading}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 font-semibold py-2 px-4 rounded-md transition-colors duration-200 ${
            loading
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-black hover:bg-sky-100 text-white hover:text-black"
          }`}
        >
          {loading ? "Loading..." : "Continue"}
        </button>
      </form>
    </>
  );
};

export default EmailPasswordFields;
