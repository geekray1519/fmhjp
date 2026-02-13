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
      className={`fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 transition-all duration-300 ease-out ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl shadow-lg shadow-black/10 text-sm">
        {type === "success" ? (
          <Check size={14} className="text-green-500 shrink-0" />
        ) : (
          <X size={14} className="text-red-500 shrink-0" />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
}
