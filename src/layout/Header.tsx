import noteIcon from "/assets/icons/note.svg";

import WalletBar from "../components/WalletConnect";
import noNotificationIcon from "/assets/icons/copy.svg";
interface HeaderProps {
  isHome?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHome = false }) => {
  
  const notifications: string[] = [
    "Notification 1",
    "Notification 2",
    "Notification 3",
    "Notification 4",
    "Notification 5",
    "Notification 6"
  ];
  return (
    <header className="w-full bg-transparent py-4 text-white">
      <div className="container mx-auto flex max-w-[1200px] items-center justify-between px-4">
        {/* 左边Logo：仅在主页显示 */}
        {isHome && (
          <div className="flex items-center">
            <div className={`inline-flex items-center`}>
              <img
                className="w-30 mr-2 h-10"
                src={`/assets/images/logo&text.svg`}
                alt="logo"
              />
            </div>
          </div>
        )}
        {/* 右边按钮 */}
        <div
          className={`flex items-center space-x-4 ${isHome ? "" : "ml-auto"}`}
        >
          <details className="dropdown dropdown-left dropdown-bottom text-white " open>
            <summary className="btn m-1 flex items-center space-x-2 border-none">
              <div className="relative inline-flex items-center">
                <img className="h-5 w-5" src={noteIcon} alt="Notifications" />
                <div className="absolute -bottom-1 -right-1 flex items-center justify-center h-4 w-4 bg-electric-green border-none rounded-full ">
                  {notifications.length > 0 && (
                    <div>
                      <span className="text-[8px] font-bold text-black">{notifications.length}</span>
                    </div>
                  )
                   
                  }
                </div>
              </div>
            
            </summary>
            <div className="dropdown-content bg-[#161717] rounded-lg z-[1] w-80 p-0 shadow-lg mt-1">
              <div className="w-full  text-base border-b-2 border-black py-2 px-4">
                <p > Notifications</p>
              </div>
              {notifications.length > 0 ? (
                <ul className="max-h-40 overflow-y-auto space-y-2 divide-y divide-gray-600">
                  {notifications.map((notification, index) => (
                    <li key={index} className="py-2 px-4 bg-[#161717] rounded-tl-none ">
                      {notification}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-32">
                  <img
                    className="h-12 w-12 mb-2"
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
  );
};

export default Header;
