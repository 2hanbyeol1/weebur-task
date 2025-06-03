"use client";
import { createContext, useContext } from "react";

export interface ToastTypes {
  id: string;
  content: string;
}

interface ToastContextTypes {
  add: (content: ToastTypes["content"]) => void;
  del: (id: ToastTypes["id"]) => void;
}

const initialValue: ToastContextTypes = {
  add: () => {},
  del: () => {},
};

export const ToastContext = createContext(initialValue);

export const useToast = () => useContext(ToastContext);
