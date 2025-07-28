"use client";
import { Field } from "formik";

const UsernameField = () => {
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
    </div>
  );
};

export default UsernameField;
