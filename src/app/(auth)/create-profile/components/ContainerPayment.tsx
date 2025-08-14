"use client";

import { SetStateAction, useState } from "react";
import { Container } from "./Container";
import { PaymentForm } from "./Payment";

export const ContainerPayment = () => {
  const [step, setStep] = useState(0);

  const handleNext = () => setStep(step + 1);

  const stepComponents = [
    <Container key={0} handleNext={handleNext} />,
    <PaymentForm key={1} setStep={setStep} userId={""} />,
  ];

  return stepComponents[step];
};
