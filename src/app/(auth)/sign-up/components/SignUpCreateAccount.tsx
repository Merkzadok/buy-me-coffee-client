"use client";

import { Formik, Field, Form, FormikHelpers } from "formik";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

export const SignUpCreateAccount = () => {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Create Your Account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Choose a username for your page
        </p>

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
              // setSubmitting(false);
            }, 500);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <Field
                id="firstName"
                name="firstName"
                placeholder="Enter username here"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

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
                type="email"
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
