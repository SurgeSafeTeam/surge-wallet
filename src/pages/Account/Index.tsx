import { truncateStr } from "@/lib/format";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@/assets/svg/add.svg?react";
import { getAccountList } from "@/querys/account";
import useWalletStore from "@/stores/useWalletStore";
import BitcoinIcon from "@/assets/svg/bitcoin.svg?react";

export default function Account() {
  const navigate = useNavigate();
  const { publicKey } = useWalletStore();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (publicKey) {
      getAccountList(publicKey).then((accounts: any) => {
        console.log("accounts", accounts);
        setAccounts(accounts);
      });
    }
  }, [publicKey]);
  return (
    <div className="mx-auto mt-24 flex max-w-[1200px] flex-col items-center justify-center text-white">
      <div className="mt-30 flex w-full items-center justify-between">
        <h4 className="text-lg">Surge Accounts</h4>
        <button
          className="rounded-full border border-electric-green px-5 py-3 text-electric-green"
          onClick={() => navigate("/account/create")}
        >
          Create Account
        </button>
      </div>
      <div className="mt-10 w-full space-y-2 rounded-2xl bg-[#121314] px-2 py-6">
        <h6 className="px-6">My Accounts({accounts.length})</h6>
        {accounts.map((account: any) => (
          <div
            className="flex w-full cursor-pointer items-center justify-between rounded-3xl px-6 hover:bg-black/50"
            onClick={() => navigate("/user/home")}
          >
            <div className="flex items-center gap-4 py-6">
              <div className="size-12 rounded-full bg-white"></div>
              <div>
                <div>{account.name}</div>
                <div>{truncateStr(account.md, 6)}</div>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <BitcoinIcon className="scale-150" />
              <span className="text-lg">Bitcoin</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 w-[1000px] rounded-3xl bg-[#121314] p-6">
        <div className="flex items-center justify-between">
          <h6>Watchlist</h6>
          <button className="flex items-center rounded-full border bg-white/5 px-2.5 py-1 text-sm">
            <AddIcon />
            <span>Add coins</span>
          </button>
        </div>
        <p className="py-16 text-center text-white/50">
          Watch any Watch any Surge Account to keep an eye on its activity to
          keep an eye on its activity
        </p>
      </div>
    </div>
  );
}
