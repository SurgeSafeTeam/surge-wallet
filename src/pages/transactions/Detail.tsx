import { useEffect, useState } from "react";
import Vline from "@/assets/svg/vline.svg?react";
import useMultiWalletStore from "@/stores/useMultiWalletStore";
import {
  TaprootMultisigWallet,
  Psbt,
  networks,
  BtcHotWallet,
} from "@metalet/utxo-wallet-sdk";
import { truncateStr } from "@/lib/format";
import { unisatApi } from "@/utils/request";
import { UTXO } from "@/types/utxo";
import Decimal from "decimal.js";
import { addTx, getOrder } from "@/querys/tx";
import { useNavigate } from "react-router-dom";
import useWalletStore from "@/stores/useWalletStore";
import useOrderStore from "@/stores/useOrderStore";

export default function SendToken() {
  const navigate = useNavigate();
  const { publicKeys, num } = useMultiWalletStore();

  const { orderId } = useOrderStore();
  const [psbtHex, setPsbtHex] = useState();
  const [txid, setTxid] = useState("");

  useEffect(() => {
    if (orderId) {
      getOrder(orderId).then((order: any) => {
        setPsbtHex(order[0].cp);
        // console.log(order);
      });
    }
  }, [orderId]);

  const createTx = async () => {
    const wallet = new TaprootMultisigWallet(
      publicKeys.map((pubkey) => Buffer.from(pubkey, "hex").subarray(1)),
      num,
    );
    console.log("psbtHex", psbtHex);
    let psbt = Psbt.fromHex(psbtHex!, { network: networks.testnet });

    // @ts-ignore
    const [walletAddress] = await window.unisat.getAccounts();

    console.log(
      "options",
      psbt.data.inputs.map((_, index) => ({
        index,
        address: walletAddress,
        disableTweakSigner: true,
      })),
    );

    // @ts-ignore
    const _psbtHex = await window.unisat.signPsbt(psbt.toHex(), {
      autoFinalized: false,
      toSignInputs: psbt.data.inputs.map((_, index) => ({
        index,
        address: walletAddress,
        disableTweakSigner: true,
      })),
    });

    console.log("_psbtHex", _psbtHex);

    psbt = Psbt.fromHex(_psbtHex!, { network: networks.testnet });

    wallet.addDummySigs(psbt)

    console.log("wallet.address", wallet.address);
    console.log("wallet.addDummySigs(_psbt)", wallet.address);

    psbt.finalizeAllInputs();
    const rawTx = psbt.extractTransaction().toHex();
    // const id = psbt.extractTransaction().getId();
    console.log("rawTx", rawTx);
    // console.log("id", id);

    // https://mempool.space/zh/testnet/tx/8037b0ee1c9269f01b8ad542b0ff31f10dc20a49f58ff7562df80c896c65afba

    const txid = await unisatApi<string>('/tx/broadcast', "testnet").post({
        rawtx: rawTx,
    })

    setTxid(txid);
    // setTxid("8037b0ee1c9269f01b8ad542b0ff31f10dc20a49f58ff7562df80c896c65afba")

    // await addTx(multiAddress, psbtHex, [publicKey])
    // navigate('/user/home')
  };

  return (
    <div>
      <div className="flex min-h-screen flex-col text-white">
        <header className="p-6">
          <h1 className="text-3xl font-bold">Sign Transaction</h1>
        </header>
        <main className="flex flex-grow p-6">
          <div className="mr-6 h-[780px] w-[368px] flex-1 rounded-lg bg-[#101111] p-6">
            <h2 className="mb-6">Send Tokens</h2>
            {txid ? (
              <a
                target="_blank"
                className="mt-2 text-white underline"
                href={`https://mempool.space/zh/testnet/tx/${txid}`}
              >
                view on mempool
              </a>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col gap-y-4 rounded-2xl bg-[#161717] px-[18px] py-[30px] text-white">
                  <span>PSBT Hex</span>
                  <div className="grow break-all">{psbtHex}</div>
                </div>
                <button
                  onClick={() => createTx()}
                  className="mx-auto mt-8 rounded-3xl bg-[#12FF80] px-8 py-3 text-black"
                >
                  Sign
                </button>
              </div>
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
