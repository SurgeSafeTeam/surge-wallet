// src/layout/SidebarLayout.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';


import homeIcon from "/assets/icons/home.svg";
import assetsIcon from "/assets/icons/assets.svg";
import TransactionSectionIcon from "/assets/icons/transactionSection.svg";
import addressBookIcon from "/assets/icons/addressBook.svg";
import swapIcon from "/assets/icons/swap.svg";
import appIcon from "/assets/icons/app.svg";
import settingIcon from "/assets/icons/setting.svg";



// Sidebar 组件
const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <aside className="w-64 shadow-md h-full bg-[#151617] text-[#E1E1E1] text-base">
      <div className="p-4 text-lg font-bold text-center border-b">
        <div className={`inline-flex items-center`}>
          <img
            className="w-32 mr-2 h-9"
            src={`/assets/images/logo&text.svg`}
            alt="logo"
          />
        </div>
      </div>
      <ul className="p-4 menu menu-compact">
        {/* <li>
          <button onClick={() => handleNavigation('/')} className="active">
            Dashboard
          </button>
        </li> */}
        <li>
          <button onClick={() => handleNavigation('/user/home')}>
            <div className={`inline-flex items-center`}>
              <img
                className="w-4 mr-2 h-4"
                src={homeIcon}
                alt="logo"
              />
            </div> Home
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/user/assets')}>
            <div className={`inline-flex items-center`}>
              <img
                className="w-4 mr-2 h-4"
                src={assetsIcon}
                alt="logo"
              />
            </div>Assets
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/user/transaction-section')}>
            <div className={`inline-flex items-center`}>
              <img
                className="w-4 mr-2 h-4"
                src={TransactionSectionIcon}
                alt="logo"
              />
            </div>TransactionSection
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/user/addressBook')} className="active">
            <div className={`inline-flex items-center`}>
              <img
                className="w-4 mr-2 h-4"
                src={addressBookIcon}
                alt="logo"
              />
            </div>AddressBook
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/user/swap')} className="active">
            <div className={`inline-flex items-center`}>
              <img
                className="w-4 mr-2 h-4"
                src={swapIcon}
                alt="logo"
              />
            </div> swap
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/user/app')} className="active">
            <div className={`inline-flex items-center`}>
              <img
                className="w-4 mr-2 h-4"
                src={appIcon}
                alt="logo"
              />
            </div>app
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/user/setting')} className="active">
            <div className={`inline-flex items-center`}>
              <img
                className="w-4 mr-2 h-4"
                src={settingIcon}
                alt="logo"
              />
            </div> setting
          </button>
        </li>
      </ul>
    </aside>
  );
};

// SidebarLayout 组件
interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
