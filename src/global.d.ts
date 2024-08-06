/// <reference types="chrome" />

interface Window {
  unisat: {
    getPublicKey: () => Promise<string>;
    signPsbt: (psbtHex: string) => Promise<string>;
    switchNetwork: (
      network: "livenet" | "testnet",
    ) => Promise<"livenet" | "testnet">;
  };
}
