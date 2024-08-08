import { truncateStr } from "@/lib/format";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTxList } from "@/querys/tx";
import useWalletStore from "@/stores/useWalletStore";
import useOrderStore from "@/stores/useOrderStore";
import BitcoinIcon from "@/assets/svg/bitcoin.svg?react";
import useMultiWalletStore from "@/stores/useMultiWalletStore";

export default function Account() {
    const navigate = useNavigate();
    const { publicKey } = useWalletStore();
    const { setOrderId } = useOrderStore();
    const [txs, setTxs] = useState([]);
    const { address } = useMultiWalletStore();

    useEffect(() => {
        if (publicKey) {
            getTxList(address).then((txs: any) => {
                console.log("txs", txs);
                setTxs(txs);
            });
        }
    }, [publicKey]);
    return (
        <div className="mx-auto mt-24 flex max-w-[1200px] flex-col items-center justify-center text-white">
            <div className="mt-30 flex items-center justify-between w-[1000px]">
                <h4 className="text-lg">Surge Accounts</h4>
                <button
                    className="rounded-full border border-electric-green px-5 py-3 text-electric-green"
                    onClick={() => navigate("/account/create")}
                >
                    Create Account
                </button>
            </div>
            <div className="mt-10 w-full space-y-2 rounded-2xl bg-[#121314] px-2 py-6">
                <h6 className="px-6">My Transactions({txs.length})</h6>
                {txs.map((account: any, index: number) => (
                    <div
                        key={index}
                        className="flex w-full cursor-pointer items-center justify-between rounded-3xl px-6 hover:bg-black/50"
                        onClick={() => {
                            setOrderId(account.orderid);
                            navigate("/user/tx/detail");
                        }}
                    >
                        <div className="flex items-center gap-4 py-6">
                            <div className="size-12 rounded-full bg-white"></div>
                            <div>
                                <div>{account.orderid}</div>
                                <div>{truncateStr(account.md, 6)}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <div className="flex flex-col items-end gap-x-2">
                                <div className="flex items-center gap-x-4">
                                    <BitcoinIcon className="scale-150" />
                                    <span className="text-lg">Bitcoin</span>
                                </div>
                                <span className="p-2 bg-black rounded-xl text-xs">{account.pubs.includes(publicKey) ? "Singed" : "Need Sign"}</span>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
