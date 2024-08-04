import { useState } from "react";
import AddIcon from "@/assets/svg/add.svg?react";
import BitcoinIcon from "@/assets/svg/bitcoin.svg?react";

export default function Sign({
  preStep,
  nextStep,
}: {
  preStep: () => void;
  nextStep: () => void;
}) {
  const [signerNum, setSignerNum] = useState(1);
  return (
    <div className="mt-[18px] grid w-full grid-cols-3 gap-x-6">
      <div className="col-span-2 rounded-3xl bg-[#0A0A0A] p-6">
        <h6>Signers and confirmations</h6>
        <p className="mt-2 text-xs text-white/50">
          Set the signer wallets of your Surge Account and how many need to
          confirm to execute a valid transaction.
        </p>
        <div className="mt-5 grid grid-cols-9 gap-x-2">
          <div className="col-span-4 flex items-center gap-x-10 rounded-2xl bg-[#141516] px-[18px] py-5">
            <span className="text-xs">Signer Name</span>
            <input
              type="text"
              placeholder="Signer 1"
              className="grow border-none bg-transparent text-xs outline-none placeholder:text-white/50"
            />
          </div>
          <div className="col-span-5 flex items-center gap-x-4 rounded-2xl bg-[#141516] px-[18px] py-5">
            <span className="text-xs">Signer</span>
            <span className="text-xs text-white/50">0x716...63fe</span>
          </div>
        </div>
        <button className="mt-8 flex items-center gap-x-2 rounded-3xl border border-[#12FF80] px-3 py-2 text-[#12FF80]">
          <AddIcon />
          Add new signer
        </button>
        <h6 className="mt-14 text-white">Threshold</h6>
        <p className="mt-2 text-xs text-white/50">
          Any transaction requires the confirmation of:
        </p>
        <div className="mt-7 space-x-4">
          <select
            className="select border-white bg-transparent text-white outline-none active:border-none active:shadow-none active:outline-none"
            onChange={(e) => {
              setSignerNum(Number(e.target.value));
            }}
          >
            <option selected>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
          <span>out of 1 signe(s)</span>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-2">
          <button
            onClick={preStep}
            className="rounded-full border border-white px-8 py-3 text-sm"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            className="rounded-full border border-[#12FF80] bg-[#12FF80] px-8 py-3 text-sm text-black"
          >
            Next
          </button>
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-y-5 rounded-3xl bg-[#0A0A0A] p-6">
        <h6>Your Surge Account preview</h6>
        <div className="grid grid-cols-3 gap-x-4 rounded-2xl bg-[#141516] px-5 py-6">
          <span className="col-span-1">Wallet</span>
          <div className="col-span-2 flex items-center gap-x-2">
            <div className="h-8 w-8 rounded-full bg-white"></div>
            <div>0x716...63fe</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-4 rounded-2xl bg-[#141516] px-5 py-6">
          <span className="col-span-1">Network</span>
          <div className="col-span-2 flex items-center gap-x-2">
            <BitcoinIcon className="h-8 w-8" />
            <div>Bitcoin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
