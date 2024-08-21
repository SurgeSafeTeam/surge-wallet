import noteIcon from "/assets/icons/note.svg"
import { useNavigate } from "react-router-dom"
import Logo from "@/assets/svg/Logo.svg?react"
import LogoWithText from "@/assets/svg/LogoWithText.svg?react"
import WalletBar from "../components/WalletConnect"
import noNotificationIcon from "/assets/icons/copy.svg"
interface HeaderProps {
  haveSidebar?: boolean
}

const Header: React.FC<HeaderProps> = ({ haveSidebar = false }) => {
  const notifications: string[] = [
    "Notification 1",
    "Notification 2",
    "Notification 3",
    "Notification 4",
    "Notification 5",
    "Notification 6",
  ]
  const navigate = useNavigate()
  return (
    <header className="xs:py-4 w-screen bg-transparent py-2 text-white">
      <div className="container mx-auto flex max-w-[1200px] items-center justify-between px-4">
        {
          <div
            className="flex items-center"
            onClick={() => navigate("/accounts")}
          >
            <Logo className="size-8 sm:hidden" />
            <LogoWithText className="hidden w-48 sm:inline-block" />
          </div>
        }
        <div
          className={`flex items-center space-x-2 ${haveSidebar ? "" : "ml-auto"}`}
        >
          <details className="dropdown dropdown-left dropdown-bottom hidden text-white">
            <summary className="btn m-1 flex items-center space-x-2 border-none">
              <div className="relative inline-flex items-center">
                <img className="h-5 w-5" src={noteIcon} alt="Notifications" />
                <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-none bg-electric-green">
                  {notifications.length > 0 && (
                    <div>
                      <span className="text-[8px] font-bold text-black">
                        {notifications.length}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </summary>
            <div className="dropdown-content z-[1] mt-1 w-80 rounded-lg bg-[#161717] p-0 shadow-lg">
              <div className="w-full border-b-2 border-black px-4 py-2 text-base">
                <p> Notifications</p>
              </div>
              {notifications.length > 0 ? (
                <ul className="max-h-40 space-y-2 divide-y divide-gray-600 overflow-y-auto">
                  {notifications.map((notification, index) => (
                    <li
                      key={index}
                      className="rounded-tl-none bg-[#161717] px-4 py-2"
                    >
                      {notification}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex h-32 flex-col items-center justify-center">
                  <img
                    className="mb-2 h-12 w-12"
                    src={noNotificationIcon}
                    alt="No notifications"
                  />
                  <p className="text-sm text-gray-500">No notifications</p>
                </div>
              )}
            </div>
          </details>
          <WalletBar className="rounded-full" />
        </div>
      </div>
    </header>
  )
}

export default Header
