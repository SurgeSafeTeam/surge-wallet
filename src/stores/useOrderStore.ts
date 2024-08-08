import { create } from "zustand";

interface OrderStoreState {
  orderId: string;
  setOrderId: (orderId: string) => void;
}

const useOrderStore = create<OrderStoreState>((set) => ({
  orderId: "",
  setOrderId: (orderId: string) => set({ orderId }),
}));

export default useOrderStore;
