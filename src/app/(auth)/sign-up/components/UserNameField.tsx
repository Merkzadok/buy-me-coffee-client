"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

export type UsernameFieldProps = {
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  setData: Dispatch<SetStateAction<any>>;
  data: any;
};
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4200";

interface Values {
  username: string;
}

const UsernameField = ({
  setStep,
  step,
  setData,
  data,
}: UsernameFieldProps) => {
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (values: Values) => {
    setErrorMsg("");

    if (!values.username.trim()) {
      const message = "Username cannot be empty";
      toast.error(message);
      setErrorMsg(message);
      return;
    }
    if (values.username.trim().length < 4) {
      const message = "Username is too short";
      toast.error(message);
      setErrorMsg(message);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/check-username`,
        { username: values.username }
      );

      if (response.status === 200) {
        setData(values.username);
        setStep(step + 1);
      }
    } catch (error: any) {
      if (error.response?.status === 409 || error.response?.status === 500) {
        const message = "Username is already taken";
        toast.error(message);
        setErrorMsg(message);
      } else {
        toast.error("Something went wrong. Please try again.");
        console.error(error);
      }
    }
  };

  const formik = useFormik({
    initialValues: { username: "" },
    onSubmit: (values: Values) => {
      setData(values);
      handleSubmit(values);
    },
  });

  return (
    <div className="flex flex-col">
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <Label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username
        </Label>
        <Input
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="Enter username here"
          className={`mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errorMsg ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        <button
          type="submit"
          className="mt-4 bg-black hover:bg-sky-100 text-white hover:text-black font-semibold py-2 px-4 rounded-md transition-colors cursor-pointer duration-200"
        >
          Continue
        </button>
      </form>
    </div>
  );
};
export default UsernameField;
