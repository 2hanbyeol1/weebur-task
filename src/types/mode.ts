export enum ELayout {
  LIST = "list",
  GRID = "grid",
}

/**
 * 주어진 문자열이 ELayout enum의 유효한 값인지 확인합니다.
 * @param value 확인할 문자열
 * @returns 문자열이 ELayout enum의 유효한 값이라면 true, 그렇지 않으면 false
 */
export function isELayout(value: unknown): value is ELayout {
  return !!Object.values(ELayout).find((e) => e === value);
}
