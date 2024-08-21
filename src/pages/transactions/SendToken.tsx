import { useState } from "react";
import Vline from "@/assets/svg/vline.svg?react";
import useMultiWalletStore from "@/stores/useMultiWalletStore";
import {
  TaprootMultisigWallet,
  Psbt,
  networks,
  BtcHotWallet,
  AddressType,
} from "@metalet/utxo-wallet-sdk";
import { truncateStr } from "@/lib/format";
import { unisatApi } from "@/utils/request";
import { UTXO } from "@/types/utxo";
import Decimal from "decimal.js";
import { addTx } from "@/querys/tx";
import { useNavigate } from "react-router-dom";
import useWalletStore from "@/stores/useWalletStore";

export default function SendToken() {
  const navigate = useNavigate();
  const { publicKey } = useWalletStore();
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState<number>();
  const [confirmed, setConfirmed] = useState(false);
  const { address: multiAddress, publicKeys, num } = useMultiWalletStore();

  const createTx = async () => {
    const psbt = new Psbt({ network: networks.testnet });
    const wallet = new TaprootMultisigWallet(
      publicKeys.map((pubkey) => Buffer.from(pubkey, "hex").subarray(1)),
      num,
    );

    console.log("publicKey", wallet.publicKey);

    // console.log("hotWallet address", hotWallet.getAddress());

    const utxos = await unisatApi<UTXO[]>("/address/btc-utxo", "testnet").get({
      address: multiAddress,
    });

    console.log("utxos", utxos);

    for (let i = 0; i < utxos.length; i++) {
      wallet.addInput(psbt, utxos[i].txid, utxos[i].vout, utxos[i].satoshis);
    }
    psbt.addOutput({
      value:
        utxos.reduce((total, cur) => total + Number(cur.satoshis), 0) - 1000,
      address: address,
    });

    // @ts-ignore
    const [walletAddress] = await window.unisat.getAccounts();
    console.log("walletAddress", walletAddress);

    console.log(
      "options",
      psbt.data.inputs.map((_, index) => ({
        index,
        address: walletAddress,
        disableTweakSigner: true,
      })),
    );

    console.log("psbtHex", psbt.toHex());

    // @ts-ignore
    const psbtHex = await window.unisat.signPsbt(psbt.toHex(), {
      autoFinalized: false,
      toSignInputs: psbt.data.inputs.map((_, index) => ({
        index,
        address: walletAddress,
        disableTweakSigner: true,
      })),
    });

    console.log("psbtHex",psbtHex);

    await addTx(multiAddress, psbtHex, [publicKey]);
    navigate("/user/home");
  };

  return (
    <div>
      <div className="flex min-h-screen flex-col text-white">
        <header className="p-6">
          <h1 className="text-3xl font-bold">
            {confirmed ? "Confirm Transaction" : "New Transaction"}
          </h1>
        </header>
        <main className="flex flex-grow p-6">
          <div className="mr-6 h-[780px] w-[368px] flex-1 rounded-lg bg-[#101111] p-6">
            {confirmed ? (
              <>
                <h2 className="mb-6">Send Tokens</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-x-4 rounded-2xl bg-[#161717] px-[18px] py-[30px] text-white">
                    <span>Recipient Address</span>
                    <div className="grow">{truncateStr(address, 6)}</div>
                  </div>
                  <div className="flex items-center gap-x-4 rounded-2xl bg-[#161717] px-[18px] py-[30px] text-white">
                    <span>Amount</span>
                    <div className="grow">{amount}</div>
                  </div>
                  <button
                    onClick={() => createTx()}
                    className="mx-auto mt-8 rounded-3xl bg-[#12FF80] px-8 py-3 text-black"
                  >
                    Confirm
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="mb-6">Send Tokens</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-x-4 rounded-2xl bg-[#161717] px-[18px] py-[30px] text-white">
                    <span>Recipient Address</span>
                    <input
                      type="text"
                      className="grow bg-transparent outline-none"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-x-4 rounded-2xl bg-[#161717] px-[18px] py-[30px] text-white">
                    <span>Amount</span>
                    <input
                      min={0}
                      step={0.00001}
                      type="number"
                      className="grow bg-transparent outline-none"
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                  </div>
                  <button
                    onClick={() => setConfirmed(true)}
                    className="mx-auto mt-8 rounded-3xl bg-[#12FF80] px-8 py-3 text-black"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="w-1/3">
            <div className="rounded-lg bg-[#101111] p-6">
              <h2 className="mb-4 text-xl font-semibold">Transaction Status</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  Create
                </li>
                <Vline className="ml-1" />
                <li className="flex items-center text-white/50">
                  <span className="mr-2 h-2 w-2 rounded-full bg-gray-400"></span>
                  Confirmed (1 of 2)
                </li>
                <Vline className="ml-1" />
                <li className="flex items-center text-white/50">
                  <span className="mr-2 h-2 w-2 rounded-full bg-gray-400"></span>
                  Execute
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
