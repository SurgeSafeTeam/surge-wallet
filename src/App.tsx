import { Route, Routes } from "react-router-dom";
// import "./App.css";

import { Logo } from "./components/Logo";
import { Navbar } from "./components/Navbar";
import { Section } from "./components/Section";
import SupportGithub from "./components/SupoortGithub";

import WalletBar from "./components/WalletConnect";
import RouterLogProvider from "./context/RouterContext";
import "./style/daisyui-cover.css"; // 导入自定义的 DaisyUI 覆盖样式
import Home from "./pages/Home";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Account from "./pages/Account/Index";
import CreateAccount from "./pages/Account/Create/Index";

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

        {/* 内容容器 */}
        <div className="relative z-10 flex h-full flex-col justify-between">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/accounts" element={<Account />} />
              <Route path="/account/create" element={<CreateAccount />} />
              {/* 其他路由 */}
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </RouterLogProvider>
  );
}

export default App;
