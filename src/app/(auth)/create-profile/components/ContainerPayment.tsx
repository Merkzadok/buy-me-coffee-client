"use client";

import { SetStateAction, useState } from "react";
import { Container } from "./Container";
import { PaymentForm } from "./Payment";

export const ContainerPayment = () => {
  const [step, setStep] = useState(0);

  const handleNext = () => setStep(step + 1);

  // TODO: Replace 'yourUserId' with the actual userId value from your app's context or props
  const userId = "yourUserId";

  const stepComponents = [
    <Container key={0} handleNext={handleNext} />,
    <PaymentForm key={1} setStep={setStep} userId={userId} />,
  ];

  return stepComponents[step];
};
