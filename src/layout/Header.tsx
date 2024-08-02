import { Logo } from "../components/Logo";
import { Navbar } from "../components/Navbar";
import { Section } from "../components/Section";
import SupportGithub from "../components/SupoortGithub";
import noteIcon from "/assets/icons/note.svg";
import { useNavigate } from "react-router-dom";

import WalletBar from "../components/WalletConnect";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-transparent py-4 text-white">
      <div className="container mx-auto flex max-w-[1200px] items-center justify-between px-4">
        {/* 左边Logo */}
        <div
          className="flex items-center"
          onClick={() => navigate("/accounts")}
        >
          <div className={`inline-flex items-center`}>
            <img
              className="w-30 mr-2 h-10"
              src={`/assets/images/logo&text.svg`}
              alt="logo"
            ></img>
          </div>
        </div>
        {/* 右边按钮 */}
        <div className="flex items-center space-x-4">
          <img className="mr-2 h-5 w-5" src={noteIcon} alt="logo"></img>
          <WalletBar className="rounded-full" />
        </div>
      </div>
    </header>
  );
};

export default Header;
