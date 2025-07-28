"use client";

import { Formik, Form, FormikHelpers } from "formik";
import EmailPasswordFields from "./EmailPasswordField";
import UsernameField from "./UsernameField";
import { LoginButton } from "../../login/components/LoginButton";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

export const SignUpCreateAccount = () => {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 bg-gray-100 px-4 relative">
      <div className="absolute top-10 right-10 ">
        {" "}
        <LoginButton />{" "}
      </div>
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
            }, 500);
          }}
        >
          <Form className="flex flex-col gap-4">
            <UsernameField />
            <EmailPasswordFields />

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
