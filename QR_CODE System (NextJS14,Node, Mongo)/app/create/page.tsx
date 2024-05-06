"use client";
import dynamic from 'next/dynamic';
import StepOne from "@/components/Stepper/StepOne";
const StepTwo = dynamic(() => import('@/components/Stepper/StepTwo'), {
  ssr: false, // This prevents server-side rendering of the component
});
import StepThree from "@/components/Stepper/StepThree";
import { nanoid } from "nanoid";
import Layout from "@/components/Layout";
import React, {
  useState,
  ChangeEvent,
} from "react";
import QRCodeStyling, {
  DotType,
  CornerSquareType,
  CornerDotType,
} from "qr-code-styling";
interface StepTwoProps {
  prevStep: () => void;
  nextStep: () => void;
  handleCornerSquareOptionClick: (cornerSquareType: CornerSquareType) => void;
  handleCornerDotOptionClick: (cornerDotType: CornerDotType) => void;
  handleDotOptionClick: (dotType: DotType) => void;
}
const Page = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [shortId, setshortId] = useState('');
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const [currentURL, setCurrentURL] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const handleDataURLChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentURL(event.target.value);
    
  };
  const handleTitleLChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleShortenUrl = () => {
    const newshortId = nanoid(6); // Change '8' to the length you prefer
    setshortId(newshortId);
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            nextStep={nextStep}
            currentURL={currentURL}
            title={title}
            handleDataURLChange={handleDataURLChange}
            handleTitleLChange={handleTitleLChange}
            handleShortenUrl={handleShortenUrl}
          />
        );
      case 2:
        return (
          <StepTwo
            currentURL={currentURL}
            shortid={shortId}
            title={title}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 3:
        return <StepThree prevStep={prevStep} />;
      default:
        return null;
    }
  };
  return <Layout>
    <div className="">
    {renderStep()}
    </div>
  </Layout>;
};

export default Page;
