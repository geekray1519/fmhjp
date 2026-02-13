"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { Toast } from "./Toast";

interface ToastContextValue {
  showToast: (message: string, type?: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

interface ToastState {
  message: string;
  type: "success" | "error";
  visible: boolean;
  key: number;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "success",
    visible: false,
    key: 0,
  });

  const showToast = useCallback(
    (message: string, type: "success" | "error" = "success") => {
      setToast((prev) => ({
        message,
        type,
        visible: true,
        key: prev.key + 1,
      }));
    },
    []
  );

  const handleClose = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        key={toast.key}
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  );
}
