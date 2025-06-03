"use client";
import { useEffect, useState } from "react";

import { ToastTypes, useToast } from "@/context/toast";
import Success from "@/svgs/Success";
import { cn } from "@/util/util";

const Toast = ({ id, content }: ToastTypes) => {
  const [isVisible, setIsVisible] = useState(false);
  const TOAST_TRANSITION = 500;
  const TOAST_DURATION = 3000;

  const { del } = useToast();

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, TOAST_DURATION);
    setTimeout(() => {
      del(id);
    }, TOAST_DURATION + TOAST_TRANSITION);
  }, [del, id]);

  return (
    <div
      className={cn(
        "border-primary/40 flex w-76 items-center gap-2 rounded-lg border-2 bg-white px-3.5 py-3.5 duration-500",
        isVisible ? "translate-x-0" : "translate-x-[400px]",
      )}
    >
      <Success width={28} height={28} />
      <div className="font-medium">{content}</div>
    </div>
  );
};

export default Toast;
