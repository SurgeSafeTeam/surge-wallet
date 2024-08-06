import { create } from "zustand";

interface WalletStoreState {
  publicKey: string;
  address: string;
  setPublicKey: (key: string) => void;
  setAddress: (addr: string) => void;
  clearWalletInfo: () => void;
}

const useWalletStore = create<WalletStoreState>((set) => ({
  address: "",
  publicKey: "",
  setAddress: (address: string) => set({ address }),
  setPublicKey: (publicKey: string) => set({ publicKey }),
  clearWalletInfo: () => set({ publicKey: "", address: "" }),
}));

export default useWalletStore;
