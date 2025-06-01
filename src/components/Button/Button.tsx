import { ComponentProps } from "react";
import Link from "next/link";

import { cn } from "@/util/util";

interface ButtonProps {
  size?: "sm" | "md";
}

const BUTTON_CN =
  "bg-primary/80 text-white flex items-center justify-center rounded-md";

const BUTTON_SIZE = {
  sm: "px-3.5 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
};

function Button({
  className,
  size = "md",
  children,
  ...props
}: ButtonProps & (ComponentProps<"button"> | ComponentProps<typeof Link>)) {
  if ("href" in props)
    return (
      <Link className={cn(BUTTON_CN, BUTTON_SIZE[size], className)} {...props}>
        {children}
      </Link>
    );

  return (
    <button
      className={cn(
        BUTTON_CN,
        BUTTON_SIZE[size],
        props.disabled ? "bg-primary/40 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
