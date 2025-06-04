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

/**
 * 무작위로 레이아웃 타입을 반환합니다.
 * 50% 확률로 LIST 또는 GRID 중 하나를 선택합니다.
 * @returns 무작위로 선택된 레이아웃 타입 (LIST 또는 GRID)
 */
export function getRandomLayout() {
  return Math.random() < 0.5 ? ELayout.LIST : ELayout.GRID;
}

/**
 * 할인율을 적용한 가격을 계산합니다.
 * @param {number} price 원래 가격
 * @param {number} discountPercentage 할인 비율 (0~100)
 * @returns 할인 적용 후 가격
 */
export function getDiscountPrice(price: number, discountPercentage: number) {
  if (price < 0) throw Error("가격은 양수여야 합니다");
  if (discountPercentage < 0) throw Error("할인율은 양수여야 합니다");
  if (discountPercentage === 0) return price;
  return price - (price * discountPercentage) / 100;
}

/**
 * clsx와 tailwind-merge를 결합하여 클래스 이름을 병합합니다.
 * 중복되거나 충돌하는 Tailwind 클래스는 자동으로 정리됩니다.
 * @param {...ClassValue[]} inputs 클래스 입력 값들
 * @returns 병합된 클래스
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * react-hook-form의 register 함수를 확장하여 onBlur/onChange 시 유효성 검사를 수행합니다.
 * 또한 해당 필드의 오류 상태를 함께 반환합니다.
 * @template T react-hook-form의 FieldValues 타입
 * @param {Object} params 등록에 필요한 객체
 * @param {Path<T>} params.name 필드 이름
 * @param {UseFormRegister<T>} params.register useForm에서 전달된 register 함수
 * @param {UseFormTrigger<T>} params.trigger 유효성 검사 트리거 함수
 * @param {FieldErrors<T>} params.errors 현재 유효성 검사 오류 객체
 * @returns register 속성과 error 속성을 포함한 객체
 */
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
