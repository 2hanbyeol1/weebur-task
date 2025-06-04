"use client";
import { ComponentProps } from "react";

import Arrow from "@/svgs/Arrow";
import { cn } from "@/util/util";

const ScrollTopButton = ({ className, ...props }: ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "bg-primary/80 fixed right-6 bottom-6 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full",
        className,
      )}
      onClick={() => {
        scrollTo({ top: 0 });
      }}
      {...props}
    >
      <Arrow className="h-6 w-6 fill-white" />
    </button>
  );
};

export default ScrollTopButton;
