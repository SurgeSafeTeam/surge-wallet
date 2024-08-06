import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { networkConfig } from "./utils/networks";
import { ToastProvider } from "@/components/Toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RoochProvider, WalletProvider } from "@roochnetwork/rooch-sdk-kit";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RoochProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider chain={"bitcoin"} autoConnect>
          <HashRouter>
            <ToastProvider>
              <App />
            </ToastProvider>
          </HashRouter>
        </WalletProvider>
      </RoochProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
