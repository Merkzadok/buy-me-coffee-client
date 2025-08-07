"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export type UsernameFieldProps = {
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  setData: Dispatch<SetStateAction<any>>;
  data: any;
};

interface Values {
  username: string;
}

const UsernameField = ({
  setStep,
  step,
  setData,
  data,
}: UsernameFieldProps) => {
  const handleSubmit = async (values: Values) => {
    console.log(values.username);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/check-username`,
        {
          username: values.username,
        }
      );
      if (response.status === 200) {
        setData(values.username);

        setStep(step + 1);
      } else if (response.status === 500) {
        console.log("username already taken");
        // toast("username has been taken");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    onSubmit: (values: Values) => {
      console.log(values);
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
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
