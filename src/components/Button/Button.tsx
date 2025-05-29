import { ComponentProps } from "react";
import clsx from "clsx";
import Link from "next/link";

type ButtonProps = ComponentProps<"button"> | ComponentProps<typeof Link>;

const BUTTON_CN =
  "px-4 py-1.5 bg-primary text-white flex items-center justify-center rounded-md";

function Button({ className, children, ...props }: ButtonProps) {
  if ("href" in props)
    return (
      <Link className={clsx(BUTTON_CN, className)} {...props}>
        {children}
      </Link>
    );

  return (
    <button className={BUTTON_CN} {...props}>
      {children}
    </button>
  );
}

export default Button;
