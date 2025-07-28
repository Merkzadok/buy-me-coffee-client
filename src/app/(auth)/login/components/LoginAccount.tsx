"use client";

import { Formik, Form, FormikHelpers, Field } from "formik";
import { LoginButton } from "../../login/components/LoginButton";
import { SignUpButton } from "../../sign-up/components/SignUpButton";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

export const LoginAccount = () => {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 bg-gray-100 px-4 relative">
      <div className="absolute top-10 right-10 ">
        {" "}
        <SignUpButton />{" "}
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
          Welcome back
        </h1>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
            }, 500);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Field
                id="email"
                name="email"
                placeholder="Enter password here"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-black hover:bg-sky-100 text-white hover:text-black font-semibold py-2 px-4 rounded-md transition-colors cursor-pointer duration-200"
            >
              Continue
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
