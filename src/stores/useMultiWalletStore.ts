import { create } from "zustand";

interface WalletStoreState {
  num: number;
  address: string;
  publicKeys: string[];
  setNum: (num: number) => void;
  setAddress: (address: string) => void;
  setPublicKeys: (publicKeys: string[]) => void;
  clearWalletInfo: () => void;
}

const useMultiWalletStore = create<WalletStoreState>((set) => ({
  num: 0,
  address: "",
  publicKeys: [],
  setNum: (num: number) => set({ num }),
  setAddress: (address: string) => set({ address }),
  setPublicKeys: (publicKeys: string[]) => set({ publicKeys }),
  clearWalletInfo: () => set({ publicKeys: [], address: "" }),
}));

export default useMultiWalletStore;
