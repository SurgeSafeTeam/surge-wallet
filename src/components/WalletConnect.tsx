import {
  UniSatWallet,
  useConnectWallet,
  useCurrentAddress,
  useWalletStore,
  useWallets,
} from "@roochnetwork/rooch-sdk-kit";
import { useMemo, useState } from "react";
import { installWallet } from "../utils";
import okxIcon from "/assets/icons/okx.png";
import logo from "/assets/icons/logo.svg";
import completeIcon from "/assets/icons/complete.svg";

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
    <div className="text-sm font-medium text-white">
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
              <button
                className="text-black"
                onClick={() => setWalletDisconnected()}
              >
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
  const [step, setStep] = useState(0);
  const nextStep = () => setStep((prev) => prev + 1);
  const handleConnect = async (e) => {
    setStep(1); // 设置步骤为 1，表示正在连接
    try {
      const unisate = new UniSatWallet()?.getTarget() || null;
      if (!unisate?._initialized) {
        await installWallet("unisat", e); // 等待安装钱包完成
      }
      await connectWallet({ wallet: wallets[0] }); // 等待钱包连接
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

  }
  return (
    <div>
      <button
        className={`btn-wallet btn bg-electric-green text-sm font-medium text-black hover:border-green-700 hover:bg-green-600 ${className}`}
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          )?.showModal()
        }
      >
        Connect Wallet
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box h-[311px] w-[533] bg-[#0D0D0D] p-0">
          {/* if there is a button in form, it will close the modal */}
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex h-full">
            {/* 左边的说明和进度条 */}
            <div className="h-full w-[45%] bg-[#101111] p-6">
              <div className="flex items-center pb-5">
                <div className={`inline-flex items-center`}>
                  <img
                    className="mr-2 h-10 w-28"
                    src={`/assets/images/logo&text.svg`}
                    alt="logo"
                  ></img>
                </div>
              </div>
              <div className="flex-grow">
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
              </div>
              {/* 步骤条 */}
              <div className="-mx-6 justify-center">
                <ul className="steps w-full">
                  {/* <li className="step step-primary"></li>
                  <li className="step step-primary"></li>
                  <li className="step"></li> */}
                  <li
                    className={`step ${step >= 0 ? "step-primary" : ""}`}
                  ></li>
                  <li
                    className={`step ${step >= 1 ? "step-primary" : ""}`}
                  ></li>
                  <li
                    className={`step ${step >= 2 ? "step-primary" : ""}`}
                  ></li>
                </ul>
              </div>
            </div>
            {/* 右侧按钮 */}
            <div className="join join-vertical mx-auto mt-7 flex py-2">
              <p className="mb-6 text-base"> Available wallets</p>
              <button
                key="unisat"
                onClick={handleConnect}
                className={`btn h-20 w-56 ${step === 2 ? 'border-[#12ff80]' : 'border-white/5'
                  } rounded-2xl border hover:bg-[#12ff80] mb-5`}
              >
                {step === 0 && (
                  <div className="flex h-3/4 w-full items-center">
                    <img
                      className="mr-2 h-7 w-7"
                      src={`https://lh3.googleusercontent.com/FpdgjbCU_f4VZUrc3uNC7RY70OIrDpn1bQM-eSw9tIgaGtztz7A_REOwDCxFsZMWnw43IWCEn9PtD2A8Y0env7lB2OU=s120`}
                      alt="wallet"
                    />
                    UniSat Wallet
                  </div>
                )}
                {step === 1 && (
                  <div className="flex h-1/2 w-full items-center">
                    <img className="mr-2 h-7 w-7" src={logo} alt="wallet" />
                    <img
                      className="mr-2 h-7 w-7"
                      src={`https://lh3.googleusercontent.com/FpdgjbCU_f4VZUrc3uNC7RY70OIrDpn1bQM-eSw9tIgaGtztz7A_REOwDCxFsZMWnw43IWCEn9PtD2A8Y0env7lB2OU=s120`}
                      alt="wallet"
                    />
                    <div className="flex h-full flex-col justify-between">
                      <p className="text-xs">Connecting...</p>
                      <p className="text-[8px] leading-none text-white/50">
                        Make sure to select all accounts that you want to grant
                        access to.
                      </p>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="flex h-1/2 w-full items-center">
                    <img className="mr-2 h-7 w-7" src={logo} alt="wallet" />
                    <img
                      className="mr-2 h-7 w-7"
                      src={`https://lh3.googleusercontent.com/FpdgjbCU_f4VZUrc3uNC7RY70OIrDpn1bQM-eSw9tIgaGtztz7A_REOwDCxFsZMWnw43IWCEn9PtD2A8Y0env7lB2OU=s120`}
                      alt="wallet"
                    />
                    <p className="mr-3">Connected</p>
                    <img
                      className="mr-2 h-7 w-7"
                      src={completeIcon}
                      alt="complete"
                    />
                  </div>
                )}
              </button>
              {/* <button
                key="okx"
                title="Coming Soon"
                onClick={async (e) => {
                  const unisate = new UniSatWallet()?.getTarget() || null;
                  if (!unisate?._initialized) {
                    installWallet("unisat", e);
                  }
                  await connectWallet({ wallet: wallets[0] });
                }}
                className="btn  h-16 w-56 border-white/5  rounded-2xl  border   hover:bg-[#12ff80] "
              >
                <img
                  className="mr-2 h-7 w-7"
                  src={okxIcon}
                  alt="okxWallet"
                />
                OKX Wallet
              </button> */}
            </div>
          </div>
          {/* <h3 className="text-lg font-bold text-black">Select Wallet</h3> */}
        </div>
        {/* <div className="modal-backdrop backdrop-blur-sm bg-black/50"></div> */}
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
