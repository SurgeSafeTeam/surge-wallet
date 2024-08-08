import { useEffect, useState } from "react";
import { useToast } from "@/components/Toast";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@/assets/svg/check.svg?react";
import { getAddressFromPublickey } from "@/lib/tools";
import BitcoinIcon from "@/assets/svg/bitcoin.svg?react";
import { addAccount, findAccount } from "@/querys/account";
import { TaprootMultisigWallet } from "@metalet/utxo-wallet-sdk";

export default function Review({
  name,
  preStep,
  signerNum,
  publicKeys,
}: {
  name: string;
  signerNum: number;
  preStep: () => void;
  publicKeys: string[];
}) {
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [multiAddress, setMultiAddress] = useState("");
  const [multiPubkey, setMultiPubkey] = useState("");
  useEffect(() => {
    if (publicKeys.length < 2) {
      setError("Please add at least 2 public keys");
    } else {
      const wallet = new TaprootMultisigWallet(
        publicKeys.map((pubkey) => Buffer.from(pubkey, "hex").subarray(1)),
        signerNum,
      );
      setMultiAddress(wallet.address);
      setMultiPubkey(wallet.publicKey);
      console.log("publicKey", wallet.publicKey);
    }
  }, [publicKeys, signerNum]);
  return (
    <div className="mt-[18px] grid w-full grid-cols-3 gap-x-6">
      <div className="col-span-2 rounded-3xl bg-[#0A0A0A] p-6">
        <h6>Review</h6>
        <p className="mt-2 text-xs text-white/50">
          You're about to create a new Surge Account and will have to confirm
          the transaction with your connected wallet.
        </p>
        <div className="mt-5 space-y-2 text-xs">
          <div className="flex items-center gap-x-2 rounded-2xl bg-[#141516] px-[18px] py-5">
            <span className="w-16">Name</span>
            <div className="grow">{name}</div>
          </div>
          <div className="flex items-center gap-x-2 rounded-2xl bg-[#141516] px-[18px] py-5">
            <span className="w-16">Threshold</span>
            <div className="grow">
              {signerNum} out of {publicKeys.length} signer(s)
            </div>
          </div>
          <div className="flex flex-col items-start gap-y-2 rounded-2xl bg-[#141516] px-[18px] py-5">
            <span className="w-20">Signers</span>
            <div className="flex flex-col gap-y-2">
              {publicKeys.map((publicKey, index) => (
                <div className="grow space-y-2 rounded-lg" key={index}>
                  <div className="flex items-center">
                    <div className="w-14">PubKey:</div>
                    <div className="grow">{publicKey}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-14">Address:</div>
                    <div className="grow">
                      {getAddressFromPublickey(publicKey)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-x-2 rounded-2xl bg-[#141516] px-[18px] py-5">
            <span className="w-20">Multi Address</span>
            <div className="grow">{multiAddress}</div>
          </div>
        </div>
        <div className="mt-16">Before you continue</div>
        <div className="col-span-2 mt-5 flex flex-col gap-y-4">
          <div className="flex items-center gap-x-2">
            <CheckIcon />
            <p className="text-white/50">
              There will be a one-time network fee to activate your smart
              account wallet.
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <CheckIcon />
            <p className="text-white/50">
              If you choose to pay later, the fee will be included with the
              first transaction you make.
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <CheckIcon />
            <p className="text-white/50">Safe doesn't profit from the fees.</p>
          </div>
        </div>
        {/* <div className="flex items-center gap-x-2">
          <div></div>
          <div></div>
        </div>
        <p>
          You will have to confirm a transaction and pay an estimated fee
          of ≈ 0.00183 ETH with your connected wallet
        </p> */}
        {error && <p className="py-3 text-xs text-red-500">{error}</p>}
        {loading ? (
          <div className="py-3 text-right text-xs text-white">Loading...</div>
        ) : (
          <div className="mt-12 flex items-center justify-end gap-x-2">
            <button
              onClick={preStep}
              className="rounded-full border border-white px-8 py-3 text-sm"
            >
              Back
            </button>
            <button
              onClick={async () => {
                const count = await findAccount(multiAddress);
                setLoading(true);
                if (count === 0) {
                  await addAccount(multiAddress, name, publicKeys, signerNum);
                  setLoading(false);
                  toast.success("Create Multisig address successfully!");
                  const timeId = setTimeout(() => {
                    clearTimeout(timeId);
                    navigate("/accounts");
                  }, 2000);
                } else {
                  setLoading(false);
                  toast.warn("Multisig address already registered.");
                }
              }}
              className="rounded-full border border-[#12FF80] bg-[#12FF80] px-8 py-3 text-sm text-black"
            >
              Create
            </button>
          </div>
        )}
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
          <BitcoinIcon className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
