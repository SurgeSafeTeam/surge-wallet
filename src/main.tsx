import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RoochProvider, WalletProvider } from "@roochnetwork/rooch-sdk-kit";
import { networkConfig } from "./utils/networks";

import "./index.css";
import { HashRouter } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RoochProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider chain={"bitcoin"} autoConnect>
          <HashRouter>
            <App />
          </HashRouter>
        </WalletProvider>
      </RoochProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
