import React, { ReactNode } from "react";
import { FieldError } from "react-hook-form";

interface InputContainerProps {
  title: string;
  error?: FieldError;
  required?: boolean;
  children: ReactNode;
}

const InputContainer = ({
  title,
  error,
  required,
  children,
}: InputContainerProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex flex-col gap-1.5">
        <div className="relative self-start">
          <span className="text-sm text-gray-700">{title}</span>
          {required && (
            <div className="absolute top-0.5 -right-2 text-xs text-red-600">
              *
            </div>
          )}
        </div>
        {children}
      </label>
      <div className="text-primary/70 h-5 pl-1 text-sm">{error?.message}</div>
    </div>
  );
};

export default InputContainer;
