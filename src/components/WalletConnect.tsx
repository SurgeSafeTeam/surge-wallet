import { installWallet } from "../utils"
import logo from "/assets/icons/logo.svg"
import Logo from "@/assets/svg/Logo.svg?react"
import LogoWithText from "@/assets/svg/LogoWithText.svg?react"
import useMyWalletStore from "@/stores/useWalletStore"
import { useMemo, useState, useEffect } from "react"
import completeIcon from "/assets/icons/complete.svg"
import {
  UniSatWallet,
  useConnectWallet,
  useCurrentAddress,
  useWalletStore,
  useWallets,
} from "@roochnetwork/rooch-sdk-kit"
// import stepStyle from "../style/wallet-daisyui-cover.module.css";

interface Props {
  className?: string // 允许className为可选参数
}

function WalletConnected({ className }: Props) {
  const currentAddress = useCurrentAddress()
  const setWalletDisconnected = useWalletStore(
    (state) => state.setWalletDisconnected,
  )

  const shortenedAddress = useMemo(() => {
    const address = currentAddress?.toStr()

    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }, [currentAddress])

  return (
    <div className="text-sm font-medium text-white">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className={`border border-white px-2 py-1.5 ${className}`}
        >
          {shortenedAddress}
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content dropdown-right z-[1] rounded-box bg-base-100 p-1 shadow"
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
  )
}

function ConnectWallet({ className }: Props) {
  const wallets = useWallets()
  const { mutateAsync: connectWallet } = useConnectWallet()
  const [step, setStep] = useState(0)
  const handleConnect = async (e: any) => {
    setStep(1) // 设置步骤为 1，表示正在连接
    try {
      const unisate = new UniSatWallet()?.getTarget() || null
      if (!unisate?._initialized) {
        await installWallet("unisat", e) // 等待安装钱包完成
      }
      await connectWallet({ wallet: wallets[0] }) // 等待钱包连接
      setStep(2) // 设置步骤为 2，表示连接完成
      // 停留1秒后关闭弹窗
      setTimeout(() => {
        (document.getElementById("my_modal_3") as HTMLDialogElement)?.close()
        setStep(0) // 重置步骤
      }, 1000)
    } catch (error) {
      console.error("Connection failed", error)
      setStep(0) // 设置步骤为 0，表示连接失败
    }
  }
  return (
    <div>
      <button
        className={`bg-electric-green px-5 py-1.5 text-sm font-medium text-black hover:border-green-700 hover:bg-green-600 ${className}`}
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          )?.showModal()
        }
      >
        Connect
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box flex h-[311px] w-[533] flex-col items-end overflow-hidden bg-[#0D0D0D] p-0">
          <form method="dialog">
            <button className="absolute right-4 top-2">✕</button>
          </form>
          <div className="xs:flex-row flex h-full w-full flex-col py-6">
            <div className="xs:w-[40%] xs:flex-col xs:justify-start flex w-full shrink-0 flex-row gap-x-2 bg-[#101111] px-6">
              <div className="flex items-center pb-5">
                <div className={`inline-flex items-center`}>
                  <Logo className="xs:hidden size-6" />
                  <LogoWithText className="xs:inline-block xs:w-full hidden w-32" />
                </div>
              </div>
              <div className="xs:flex-grow">
                {step === 0 && (
                  <div className="xs:mb-7">
                    <h4 className="mb-2 text-lg">Connect</h4>
                    <p className="xs:text-sm xs:block hidden space-x-4 text-pretty text-xs text-white/50">
                      Connecting your wallet is like “logging in” to Web3.
                      Select your wallet from the options to get started.
                    </p>
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
                <ul className={"step w-full"}>
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
            <div className="join join-vertical mx-auto flex w-full grow px-6">
              <p className="mb-6 text-base"> Available wallets</p>
              <button
                key="unisat"
                onClick={handleConnect}
                className={`btn h-20 w-full ${
                  step === 2 ? "border-[#12ff80]" : "border-white/5"
                } mb-5 rounded-2xl border hover:bg-[#12ff80]`}
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
  )
}

export default function WalletBar({ className }: Props) {
  const { setPublicKey } = useMyWalletStore()
  const connectionStatus = useWalletStore((state) => state.connectionStatus)

  useEffect(() => {
    if (connectionStatus === "connected") {
      window.unisat.getPublicKey().then((publicKey) => {
        setPublicKey(publicKey)
      })
    }
  }, [connectionStatus, setPublicKey])

  return connectionStatus === "connected" ? (
    <WalletConnected className={className} />
  ) : (
    <ConnectWallet className={className} />
  )
}
