import Send from "@/assets/svg/send.svg?react";
import Swap from "@/assets/svg/swap.svg?react";
import { useToast } from "@/components/Toast";
import { useNavigate } from "react-router-dom";
import useMultiWalletStore from "@/stores/useMultiWalletStore";
import { useEffect } from "react";

export default function Transaction() {
  const toast = useToast();
  const navigate = useNavigate();
  const { address } = useMultiWalletStore();

  useEffect(() => {
    if(!address){
      navigate('/accounts')
    }
  },[address])

  function sendToken() {
    navigate("/user/transaction/send");
  }

  function swapToken() {
    toast.info("Coming soon!");
  }

  return (
    <div className="mx-auto">
      <h1 className="text-[28px] text-white">New Transaction</h1>
      <div className="mt-10 flex h-[450px] items-center justify-between rounded-3xl bg-[#101111] pl-[56px] pr-[132px] text-white xl:w-[1200px]">
        <div className="flex flex-col items-center gap-y-1">
          <img
            src="/public/assets/images/new-transaction.svg"
            className="w-64"
          />
          <span className="text-2xl">New transaction</span>
        </div>
        <div className="flex flex-col gap-y-6 text-black">
          <span className="text-white">Manage Assets</span>
          <button
            className="flex w-[380px] items-center justify-center gap-x-2 rounded-2xl bg-[#12FF80] py-6"
            onClick={sendToken}
          >
            <Send />
            <span>Send Token</span>
          </button>
          <button
            className="flex w-[380px] items-center justify-center gap-x-2 rounded-2xl bg-[#12FF80] py-6"
            onClick={swapToken}
          >
            <Swap />
            Swap Tokens
          </button>
          <span className="text-white">Interact with contracts</span>
          <button
            className="flex w-[380px] items-center justify-center gap-x-2 rounded-2xl border border-white py-6 text-white"
            onClick={swapToken}
          >
            <Swap />
            Transaction Builder
          </button>
        </div>
      </div>
    </div>
  );
}
