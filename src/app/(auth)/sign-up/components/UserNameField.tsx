"use client";
import { Field } from "formik";
import { Dispatch, SetStateAction } from "react";

type UsernameFieldProps = {
  setStep: Dispatch<SetStateAction<number>>;
};

const UsernameField = ({ setStep }: UsernameFieldProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
        Username
      </label>
      <Field
        id="firstName"
        name="firstName"
        placeholder="Enter username here"
        className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        className="mt-4 bg-black hover:bg-sky-100 text-white hover:text-black font-semibold py-2 px-4 rounded-md transition-colors cursor-pointer duration-200"
        onClick={() => setStep(1)}
      >
        Continue
      </button>
    </div>
  );
};

export default UsernameField;
