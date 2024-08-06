import Info from "./components/Info";
import Sign from "./components/Sign";
import Review from "./components/Review";
import { useEffect, useState } from "react";
import { useToast } from "@/components/Toast";
import InfoIcon from "@/assets/svg/info.svg?react";
import SignIcon from "@/assets/svg/sign.svg?react";
import useWalletStore from "@/stores/useWalletStore";
import ReviewIcon from "@/assets/svg/review.svg?react";
import StepArrowIcon from "@/assets/svg/step-arrow.svg?react";
import { addAccount } from "@/querys/account";

export default function Create() {
  const toast = useToast();
  const { publicKey } = useWalletStore();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [signerNum, setSignerNum] = useState(1);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);

  useEffect(() => {
    addAccount("2222", ["1", "1", "1"]);
  }, []);

  useEffect(() => {
    if (publicKey && !publicKeys.includes(publicKey)) {
      publicKeys.push(publicKey);
      setPublicKeys(publicKeys);
    }
  }, [publicKey, publicKeys]);

  const preStep = () => {
    if (step === 1) {
      return;
    } else {
      setStep(step - 1);
    }
  };
  const nextStep = () => {
    if (step === 3) {
      return;
    } else {
      if (step === 1 && !name) {
        toast.warn("Please enter a name");
        return;
      }
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
          onClick={() => (step === 1 ? nextStep() : setStep(2))}
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
      {step === 1 && <Info nextStep={nextStep} setName={setName} />}
      {step === 2 && (
        <Sign
          preStep={preStep}
          nextStep={nextStep}
          publicKeys={publicKeys}
          setSignerNum={setSignerNum}
          setPublicKeys={setPublicKeys}
        />
      )}
      {step === 3 && (
        <Review
          name={name}
          preStep={preStep}
          signerNum={signerNum}
          publicKeys={publicKeys}
        />
      )}
    </div>
  );
}
