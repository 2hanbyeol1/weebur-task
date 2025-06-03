"use client";
import { ReactNode, useState } from "react";

import { ToastContext, ToastTypes } from "@/context/toast";

import Toast from "./Toast";

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastTypes[]>([]);
  const value = {
    add: (content: ToastTypes["content"]) => {
      setToasts((prev) => [{ id: crypto.randomUUID(), content }, ...prev]);
    },
    del: (id: ToastTypes["id"]) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    },
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
        {toasts &&
          toasts.map((toast) => (
            <Toast key={toast.id} id={toast.id} content={toast.content} />
          ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
