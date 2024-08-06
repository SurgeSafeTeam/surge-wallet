
// import "./App.css";


import { Route, Routes } from "react-router-dom";
import RouterLogProvider from "./context/RouterContext";
import "./style/daisyui-cover.css"; // 导入自定义的 DaisyUI 覆盖样式
import Home from "./pages/Home";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Account from "./pages/Account/Index";
import CreateAccount from "./pages/Account/Create/Index";
import './style/daisyui-cover.css'; // 导入自定义的 DaisyUI 覆盖样式
import './style/daisyui-cover.css';
import TransactionSection from './pages/TransactionsSection';
import Setting from './pages/Setting';
import UserHome from './pages/UserHome';
import AddressBook from './pages/AddressBook';
import AppC from './pages/App';
import Assets from './pages/Assets';
import Swap from './pages/Swap';
import Accounts from './pages/Accouts';
import SidebarLayout from './layout/SidebarLayout';
import Test from "./pages/Test/Index";

function App() {
  return (
    <RouterLogProvider>
        <div className="relative h-screen overflow-hidden bg-black">
          {/* 仅在 Home 页面显示背景图片 */}
          {location.pathname === "/" && (
            <div
              className="absolute right-0 top-0 z-0 h-full bg-right bg-no-repeat"
              style={{
                width: "1066px",
                backgroundImage: "url('/assets/images/bgImage.svg')", // 使用相对路径引用
                backgroundSize: "contain",
              }}
            ></div>
          )}
          </div>

        {/* 内容容器 */}
        <div className="relative z-10 flex h-full flex-col justify-between">
          <Header/>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/accounts" element={<Account />} />
              <Route path="/account/create" element={<CreateAccount />} />
              <Route path="/test" element={<Test />} />
              <Route path="/accounts" element={<SidebarLayout>   <Header /><Accounts /></SidebarLayout>} />
              <Route path="/user/home" element={<SidebarLayout><Header /><UserHome /></SidebarLayout>} />
              <Route path="/user/assets" element={<SidebarLayout><Header /><Assets /></SidebarLayout>} />
              <Route path="/user/transaction-section" element={<SidebarLayout><Header /><TransactionSection /></SidebarLayout>} />
              <Route path="/user/addressBook" element={<SidebarLayout><Header /><AddressBook /></SidebarLayout>} />
              <Route path="/user/swap" element={<SidebarLayout><Header /><Swap /></SidebarLayout>} />
              <Route path="/user/app" element={<SidebarLayout><Header /><AppC /></SidebarLayout>} />
              <Route path="/user/setting" element={<SidebarLayout><Header /><Setting /></SidebarLayout>} />
              {/* 其他路由 */}
            </Routes>
          </div>
        </div>
    </RouterLogProvider>
  );
}

export default App;
