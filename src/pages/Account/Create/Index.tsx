import { useState } from "react";
import Info from "./components/Info";
import Sign from "./components/Sign";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@/assets/svg/info.svg?react";
import SignIcon from "@/assets/svg/sign.svg?react";
import ReviewIcon from "@/assets/svg/review.svg?react";
import StepArrowIcon from "@/assets/svg/step-arrow.svg?react";

export default function Create() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const preStep = () => {
    if (step === 1) {
     return
    } else {
      setStep(step - 1);
    }
  };
  const nextStep = () => {
    if (step === 3) {
      navigate("/accounts");
    } else {
      setStep(step + 1);
    }
  };
  return (
    <div className="mx-auto mt-24 flex max-w-[1200px] flex-col items-center justify-center text-white">
      <h4 className="mt-30 w-full text-lg">Create new Surge accounts</h4>
      <div className="mt-8 flex w-full items-center justify-between rounded-3xl bg-[#121314] px-20 py-6">
        <button
          onClick={() => setStep(1)}
          className={[
            "flex flex-col items-center gap-y-2",
            step === 1 ? "text-electric-green" : "",
          ].join(" ")}
        >
          <InfoIcon />
          <span className="text-xs">Information</span>
        </button>
        <StepArrowIcon />
        <button
          onClick={() => setStep(2)}
          className={[
            "flex flex-col items-center gap-y-2",
            step === 2 ? "text-electric-green" : "",
          ].join(" ")}
        >
          <SignIcon />
          <span className="text-xs">Signers and confirmation</span>
        </button>
        <StepArrowIcon />
        <button
          onClick={() => setStep(3)}
          className={[
            "flex flex-col items-center gap-y-2",
            step === 3 ? "text-electric-green" : "",
          ].join(" ")}
        >
          <ReviewIcon />
          <span className="text-xs">Review</span>
        </button>
      </div>
      {step === 1 && <Info nextStep={nextStep} />}
      {step === 2 && <Sign preStep={preStep} nextStep={nextStep} />}
      {step === 3 && <Sign nextStep={nextStep} />}
    </div>
  );
}
