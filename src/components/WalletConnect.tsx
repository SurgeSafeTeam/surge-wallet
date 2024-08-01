import {
  UniSatWallet,
  useConnectWallet,
  useCurrentAddress,
  useWalletStore,
  useWallets,
} from "@roochnetwork/rooch-sdk-kit";
import { useMemo } from "react";
import { installWallet } from "../utils";

interface Props {
  className?: string; // 允许className为可选参数
}

function WalletConnected({ className }: Props) {
  const currentAddress = useCurrentAddress();
  const setWalletDisconnected = useWalletStore(
    (state) => state.setWalletDisconnected,
  );

  const shortenedAddress = useMemo(() => {
    const address = currentAddress?.genRoochAddress().toStr();

    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [currentAddress]);

  return (
    <div className="text-sm font-medium  text-white">
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className={`btn-wallet btn ${className}`}
        >
          {shortenedAddress}
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
        >
          <li>
            <a>
              {" "}
              <button className="text-black" onClick={() => setWalletDisconnected()}>
                Disconnect
              </button>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function ConnectWallet({ className }: Props) {
  const wallets = useWallets();
  const { mutateAsync: connectWallet } = useConnectWallet();

  return (
    <div>
      <button
        className={`btn-wallet btn bg-electric-green text-sm font-medium hover:border-green-700 hover:bg-green-600 text-black ${className}`}
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          )?.showModal()
        }
      >
        Connect Wallet
      </button>
      <dialog id="my_modal_3" className="modal" >
        <div className="modal-box">
            {/* if there is a button in form, it will close the modal */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="text-lg font-bold text-black">Select Wallet</h3>
          <div className="join join-vertical mx-auto mt-7 flex w-2/3">
            <button
              key="unisat"
              onClick={async (e) => {
                const unisate = new UniSatWallet()?.getTarget() || null;
                if (!unisate?._initialized) {
                  installWallet("unisat", e);
                }
                await connectWallet({ wallet: wallets[0] });
              }}
              className="btn join-item hover:bg-[#8B5FBF]"
            >
              <img
                className="mr-2 h-7 w-7"
                src={`https://lh3.googleusercontent.com/FpdgjbCU_f4VZUrc3uNC7RY70OIrDpn1bQM-eSw9tIgaGtztz7A_REOwDCxFsZMWnw43IWCEn9PtD2A8Y0env7lB2OU=s120`}
                alt="wallet"
              />
              Connect UniSat Wallet
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default function WalletBar({ className }: Props) {
  const connectionStatus = useWalletStore((state) => state.connectionStatus);

  return connectionStatus === "connected" ? (
    <WalletConnected className={className} />
  ) : (
    <ConnectWallet className={className} />
  );
}
