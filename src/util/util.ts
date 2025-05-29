import { ELayout } from "@/types/mode";

export function getRandomLayout() {
  return Math.random() < 0.5 ? ELayout.LIST : ELayout.GRID;
}
