"use client";
import { Field } from "formik";

const EmailPasswordFields = () => {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <Field
          id="lastName"
          name="lastName"
          placeholder="Enter email here"
          type="email"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <Field
          id="email"
          name="email"
          placeholder="Enter password here"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </>
  );
};

export default EmailPasswordFields;
