"use client";
import { ComponentProps, useState } from "react";
import { FieldError } from "react-hook-form";

import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/util/util";

import InputContainer from "./InputContainer";

interface SelectBoxProps extends ComponentProps<"input"> {
  title: string;
  error?: FieldError;
  options: string[];
}
const SelectBox = ({
  className,
  title,
  error,
  options,
  ...props
}: SelectBoxProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(options[0]);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const close = () => {
    setOpen(false);
  };

  const handleSelect = (newValue: string) => {
    setValue(newValue);
    close();
  };

  const { ref } = useClickOutside<HTMLDivElement>(close);

  return (
    <InputContainer title={title} error={error}>
      <div ref={ref} className="relative">
        <button
          type="button"
          className={cn(
            "focus:ring-primary/70 hover:ring-primary/30 w-full cursor-pointer rounded-md px-4 py-3 text-start ring-1 ring-gray-300/50 duration-200 outline-none hover:ring-2 focus:ring-2",
            className,
          )}
          onClick={toggle}
        >
          {value}
        </button>
        {isOpen && (
          <div className="absolute top-full z-50 mt-1 flex w-full flex-col bg-white p-1 shadow-lg">
            {options?.map((option) => (
              <label
                key={`select-${option}`}
                className="cursor-pointer rounded-md px-4 py-3 hover:bg-gray-50"
                onClick={() => handleSelect(option)}
              >
                {option}
                <input
                  type="radio"
                  className="hidden"
                  value={option}
                  {...props}
                />
              </label>
            ))}
          </div>
        )}
      </div>
    </InputContainer>
  );
};

export default SelectBox;
