"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  duration?: number;
  type?: "success" | "error";
}

export function Toast({
  message,
  visible,
  onClose,
  duration = 2000,
  type = "success",
}: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      // Small delay to trigger transition
      requestAnimationFrame(() => setShow(true));
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-20 sm:bottom-6 left-1/2 z-[200] -translate-x-1/2 transition-all duration-300 ease-out ${
        show
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95"
      }`}
    >
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-medium ${
        type === "success"
          ? "bg-card border border-green-500/20 shadow-green-500/5"
          : "bg-card border border-red-500/20 shadow-red-500/5"
      }`}>
        {type === "success" ? (
          <div className="p-1 rounded-full bg-green-500/10">
            <Check size={12} className="text-green-500 shrink-0" />
          </div>
        ) : (
          <div className="p-1 rounded-full bg-red-500/10">
            <X size={12} className="text-red-500 shrink-0" />
          </div>
        )}
        <span>{message}</span>
      </div>
    </div>
  );
}
