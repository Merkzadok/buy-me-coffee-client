"use client";

import { Formik, Form, FormikHelpers } from "formik";
import EmailPasswordFields from "./EmailPasswordField";
import UsernameField from "./UsernameField";
import { LoginButton } from "../../login/components/LoginButton";
import { useState } from "react";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

export const SignUpCreateAccount = () => {
  const [step, setStep] = useState(0);
  const StepComponent = [
    <UsernameField setStep={setStep} />,
    <EmailPasswordFields setStep={setStep} />,
  ];
  return (
    <div className="flex flex-col items-center justify-center w-1/2 bg-gray-100 px-4 relative">
      <div className="absolute top-10 right-10 ">
        {" "}
        <LoginButton />{" "}
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-transparent bg-gradient-to-r from-orange-500 via-amber-400 to-lime-500 bg-clip-text">
          Create Your Account
        </h1>

        <p className="text-sm text-gray-500  mb-6">
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
          <Form className="flex flex-col gap-4">{StepComponent[step]}</Form>
        </Formik>
      </div>
    </div>
  );
};
