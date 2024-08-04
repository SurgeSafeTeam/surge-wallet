import { useState } from "react";
import { Section } from "../components/Section";
import  "../style/transation-daisyui-cover.css";
import WalletBar from "../components/WalletConnect";
import Header from "../layout/Header";

export default function () {

  const [step, setStep] = useState(0);
  const nextStep = () => setStep((prev) => prev + 1);
  const handleConnect = async (e) => {
    setStep(1); // 设置步骤为 1，表示正在连接
    try {
      // 等待钱包连接
      setStep(2); // 设置步骤为 2，表示连接完成
      // 停留1秒后关闭弹窗
      setTimeout(() => {
        (document.getElementById("my_modal_3") as HTMLDialogElement)?.close();
        setStep(0); // 重置步骤
      }, 1000);
    } catch (error) {
      console.error("Connection failed", error);
      setStep(0); // 设置步骤为 0，表示连接失败
    }
  };
  return (
    <>
      <Section>
        <div className="flex w-[400px] h-56">
          {/* 左边的说明和进度条 */}
          <div className="h-full  w-full  bg-[#101111] p-6 rounded-3xl">

            <div className="items-center">
              <p className="text-white text-base">Transation Status</p>
            </div>

            {/* <div className="flex-grow">
              {step === 0 && (
                <div className="mb-7">
                  <p className="mb-2 text-lg">Connect your wallet</p>
                  <div className="space-x-4 text-sm text-white/50">
                    Connecting your wallet is like “logging in” to Web3.
                    Select your wallet from the options to get started.
                  </div>
                </div>
              )}
              {(step === 1 || step === 2) && (
                <div className="mb-7">
                  <p className="mb-2 text-lg">Approve Connection</p>
                  <div className="space-x-4 text-sm text-white/50">
                    Please approve the connection in your wallet and authorize
                    access to continue.
                  </div>
                </div>
              )}
            </div> */}
            {/* 步骤条 */}

            <div className=" justify-center">
              <ul  className=" steps w-full  steps-vertical">
                <li className="step step-primary"></li>
                <li className="step step-primary"></li>
                <li className="step"></li>
                {/* <li
                  className={`step ${step >= 0 ? "step-primary" : ""}`}
                ></li>
                <li
                  className={`step ${step >= 1 ? "step-primary" : ""}`}
                ></li>
                <li
                  className={`step ${step >= 2 ? "step-primary" : ""}`}
                ></li> */}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
