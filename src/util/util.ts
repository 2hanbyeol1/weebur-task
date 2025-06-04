import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormTrigger,
} from "react-hook-form";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { ELayout } from "@/types/mode";

/**
 * 주어진 문자열이 ELayout enum의 유효한 값인지 확인합니다.
 * @param value 확인할 문자열
 * @returns 문자열이 ELayout enum의 유효한 값이라면 true, 그렇지 않으면 false
 */
export function isELayout(value: unknown): value is ELayout {
  return !!Object.values(ELayout).find((e) => e === value);
}

export function getRandomLayout() {
  return Math.random() < 0.5 ? ELayout.LIST : ELayout.GRID;
}

export function getDiscountPrice(price: number, discountPercentage: number) {
  if (price <= 0) return 0;
  if (discountPercentage <= 0) return price;
  return price - (price * discountPercentage) / 100;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function registerWith<T extends FieldValues>({
  name,
  register,
  trigger,
  errors,
}: {
  name: Path<T>;
  register: UseFormRegister<T>;
  trigger: UseFormTrigger<T>;
  errors: FieldErrors<T>;
}) {
  return {
    ...register(name, {
      onBlur: () => trigger(name),
      onChange: () => trigger(name),
    }),
    error: errors[name],
  };
}
