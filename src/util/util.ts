import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { ELayout } from "@/types/mode";

export function getRandomLayout() {
  return Math.random() < 0.5 ? ELayout.LIST : ELayout.GRID;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
