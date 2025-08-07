"use client";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

type EmailPasswordFieldsProps = {
  setStep: Dispatch<SetStateAction<number>>;
  data: any;
  setData: Dispatch<SetStateAction<any>>;
};

interface Values {
  email: string;
  password: string;
}

const EmailPasswordFields = ({
  setStep,
  data,
  setData,
}: EmailPasswordFieldsProps) => {
  const router = useRouter();

  const handleSubmit = async (values: Values) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth`,
        {
          email: values.email,
          password: values.password,
          username: data,
        }
      );

      if (response.status === 200) {
        setData({ email: values.email, password: values.password });

        router.push("/login");
      } else if (response.status === 500) {
        console.log("username already taken");
      }
    } catch (error) {
      console.error(error);
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
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password here"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-black hover:bg-sky-100 text-white hover:text-black font-semibold py-2 px-4 rounded-md transition-colors duration-200"
      >
        Continue
      </button>
    </form>
  );
};

export default EmailPasswordFields;
