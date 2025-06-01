import React, { ComponentProps } from "react";
import { FieldError } from "react-hook-form";

import { cn } from "@/util/util";

import InputContainer from "./InputContainer";

interface TextareaProps extends ComponentProps<"textarea"> {
  title: string;
  error?: FieldError;
  resizable?: boolean;
}

const Textarea = ({
  className,
  title,
  error,
  required,
  resizable,
  ...props
}: TextareaProps) => {
  return (
    <InputContainer title={title} required={required} error={error}>
      <textarea
        className={cn(
          "focus:ring-primary/70 hover:ring-primary/30 h-32 w-full rounded-md px-4 py-3 ring-1 ring-gray-300/50 duration-200 outline-none hover:ring-2 focus:ring-2",
          error && "ring-primary/50",
          !resizable && "resize-none",
          className,
        )}
        {...props}
      />
    </InputContainer>
  );
};

export default Textarea;
