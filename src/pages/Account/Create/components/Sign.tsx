import { useState, useEffect } from "react";
import AddIcon from "@/assets/svg/add.svg?react";
import useWalletStore from "@/stores/useWalletStore";
import { getAddressFromPublickey } from "@/lib/tools";
import BitcoinIcon from "@/assets/svg/bitcoin.svg?react";

export default function Sign({
  preStep,
  nextStep,
  signerNum,
  publicKeys,
  setSignerNum,
  setPublicKeys,
}: {
  signerNum: number;
  publicKeys: string[];
  preStep: () => void;
  nextStep: () => void;
  setSignerNum: React.Dispatch<React.SetStateAction<number>>;
  setPublicKeys: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const { publicKey } = useWalletStore();

  const [error, setError] = useState("");

  const handleAddInput = () => {
    setPublicKeys([...publicKeys, ""]);
  };

  const handleDeletePubKey = (index: number) => {
    const updatedPubKeys = [...publicKeys];
    updatedPubKeys.splice(index, 1);
    setPublicKeys(updatedPubKeys);
  };

  useEffect(() => {
    const uniquePubKeys = new Set(publicKeys);
    if (uniquePubKeys.size !== publicKeys.length) {
      setError("Duplicate pubkey detected");
    } else {
      setError("");
    }
  }, [publicKeys]);

  const handleChangePubKey = (index: number, publicKey: string) => {
    const updatedPubKeys = [...publicKeys];
    setPublicKeys(updatedPubKeys);
    updatedPubKeys[index] = publicKey;
  };

  return (
    <div className="mt-[18px] grid w-full grid-cols-3 gap-x-6">
      <div className="col-span-2 rounded-3xl bg-[#0A0A0A] p-6">
        <h6>Signers and confirmations</h6>
        <p className="mt-2 text-xs text-white/50">
          Set the signer wallets of your Surge Account and how many need to
          confirm to execute a valid transaction.
        </p>
        {publicKeys.map((pubKey, index) => (
          <div className="space-y-2 text-xs" key={index}>
            <div className="mt-5 flex items-center gap-x-4 rounded-2xl bg-[#141516] px-[18px] py-5">
              <span className="w-16">PubKey {index + 1}:</span>
              <input
                type="text"
                value={pubKey}
                placeholder={`Enter public key ${index + 1}`}
                onChange={(e) => handleChangePubKey(index, e.target.value)}
                className="grow border-none bg-transparent text-xs outline-none placeholder:text-white/50"
              />
              {publicKey !== pubKey && (
                <button
                  onClick={() => handleDeletePubKey(index)}
                  className="text-xs text-red-500"
                >
                  Delete
                </button>
              )}
            </div>
            <div className="mt-5 flex items-center gap-x-4 rounded-2xl px-[18px] py-2">
              <span className="w-16">Address:</span>
              <div>{getAddressFromPublickey(pubKey)}</div>
            </div>
          </div>
        ))}
        {error ? <p className="py-2 text-xs text-red-500">{error}</p> : null}
        <button
          onClick={handleAddInput}
          className="mt-8 flex items-center gap-x-2 rounded-3xl border border-[#12FF80] px-3 py-2 text-[#12FF80]"
        >
          <AddIcon />
          Add new signer
        </button>
        <h6 className="mt-14 text-white">Threshold</h6>
        <p className="mt-2 text-xs text-white/50">
          Any transaction requires the confirmation of:
        </p>
        <div className="mt-7 space-x-4">
          <select
            defaultValue={Number(signerNum)}
            className="select border-white bg-transparent text-white outline-none active:border-none active:shadow-none active:outline-none"
            onChange={(e) => {
              setSignerNum(Number(e.target.value));
            }}
          >
            {Array.from({ length: publicKeys.length }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <span>out of {publicKeys.length} signer(s)</span>
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
