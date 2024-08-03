import noteIcon from "/assets/icons/note.svg";

import WalletBar from "../components/WalletConnect";

interface HeaderProps {
  isHome?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHome = false }) => {
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
          <img className="mr-2 h-5 w-5" src={noteIcon} alt="logo" />
          <WalletBar className="rounded-full" />
        </div>
      </div>
    </header>
  );
};

export default Header;
