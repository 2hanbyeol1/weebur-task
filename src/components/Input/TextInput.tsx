import { ComponentProps } from "react";
import { FieldError } from "react-hook-form";

import { cn } from "@/util/util";

import InputContainer from "./InputContainer";

interface TextInputProps extends ComponentProps<"input"> {
  type?: "text" | "email" | "tel" | "url" | "email" | "search" | "number";
  title: string;
  error?: FieldError;
  unit?: string;
}
const TextInput = ({
  className,
  type = "text",
  title,
  error,
  unit,
  required,
  ...props
}: TextInputProps) => {
  return (
    <InputContainer title={title} required={required} error={error}>
      <div
        className={cn(unit && "grid grid-cols-[1fr_30px] items-center gap-2")}
      >
        <input
          className={cn(
            "focus:ring-primary/70 hover:ring-primary/30 w-full rounded-md px-4 py-3 ring-1 ring-gray-300/50 duration-200 outline-none hover:ring-2 focus:ring-2",
            error && "ring-primary/50",
            className,
          )}
          type={type}
          {...props}
        />
        {unit && <span>{unit}</span>}
      </div>
    </InputContainer>
  );
};

export default TextInput;
