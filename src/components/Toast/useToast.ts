import { useContext } from "react";
import { ToastContext } from "./ToastProvider";
import { ToastContextType } from "./toastTypes";

const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default useToast;