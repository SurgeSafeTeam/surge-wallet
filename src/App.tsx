// import "./App.css";


import { Route, Routes } from "react-router-dom";
import RouterLogProvider, { RouterLogContext } from "./context/RouterContext";
// import "./style/daisyui-cover.css"; // 导入自定义的 DaisyUI 覆盖样式
import Home from "./pages/Home";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import CreateAccount from "./pages/Account/Create/Index";
// import './style/daisyui-cover.css'; // 导入自定义的 DaisyUI 覆盖样式
import TransactionSection from "./pages/transactions/TransactionsSection.tsx";
import Setting from './pages/Setting';
import UserHome from './pages/UserHome';
import AddressBook from './pages/AddressBook';
import AppC from './pages/App';
import Assets from './pages/Assets';
import Swap from './pages/Swap';
import SidebarLayout from './layout/SidebarLayout';
import Test from "./pages/Test/Index";
import Account from "./pages/Account/Index";
import SendToken from "./pages/transactions/SendToken.tsx";
import { useContext } from "react";

function App() {
  const { current } = useContext(RouterLogContext);
  return (
    <RouterLogProvider>
      <div className="relative h-screen overflow-hidden bg-black">
        {/* 仅在 Home 页面显示背景图片 */}
        {current === "/" && (
          <div
            className="absolute right-0 top-0 z-0 h-full bg-right bg-no-repeat"
            style={{
              width: "1066px",
              backgroundImage: "url('/assets/images/bgImage.svg')", // 使用相对路径引用
              backgroundSize: "contain",
            }}
          ></div>
        )}
        {/* 内容容器 */}
        <div className="relative z-10 flex h-full flex-col justify-between">
          {/* <Header/> */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/accounts" element={<Account />} />
              <Route path="/account/create" element={<CreateAccount />} />
              <Route path="/test" element={<Test />} />
              <Route
                path="/accounts"
                element={
                  <div>
                    <Header haveSidebar={true} />
                    <Account />
                  </div>
                }
              />
              <Route
                path="/user/home"
                element={
                  <SidebarLayout>
                    <Header />
                    <UserHome />
                  </SidebarLayout>
                }
              />
              <Route
                path="/user/assets"
                element={
                  <SidebarLayout>
                    <Header />
                    <Assets />
                  </SidebarLayout>
                }
              />
              <Route
                path="/user/transaction-section"
                element={
                  <SidebarLayout>
                    <Header />
                    <TransactionSection />
                  </SidebarLayout>
                }
              />
              <Route
                path="/user/addressBook"
                element={
                  <SidebarLayout>
                    <Header />
                    <AddressBook />
                  </SidebarLayout>
                }
              />
              <Route
                path="/user/swap"
                element={
                  <SidebarLayout>
                    <Header />
                    <Swap />
                  </SidebarLayout>
                }
              />
              <Route
                path="/user/app"
                element={
                  <SidebarLayout>
                    <Header />
                    <AppC />
                  </SidebarLayout>
                }
              />
              <Route
                path="/user/setting"
                element={
                  <SidebarLayout>
                    <Header />
                    {/* <SendToken /> */}
                    <Setting />
                  </SidebarLayout>
                }
              />
              <Route path="/account/create" element={<CreateAccount />} />
              {/* 其他路由 */}
            </Routes>
          </div>
        </div>
      </div>
    </RouterLogProvider>
  );
}

export default App;
