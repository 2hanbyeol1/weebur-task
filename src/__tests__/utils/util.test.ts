import { ELayout } from "@/types/mode";
import { cn, getRandomLayout, isELayout } from "@/util/util";

describe("isELayout", () => {
  it("ELayout의 유효한 값을 넣으면 true를 반환한다", () => {
    expect(isELayout(ELayout.GRID)).toBe(true);
    expect(isELayout(ELayout.LIST)).toBe(true);
  });

  it("ELayout에 없는 값을 넣으면 false를 반환한다", () => {
    expect(isELayout("")).toBe(false);
    expect(isELayout("GRID")).toBe(false);
    expect(isELayout(123)).toBe(false);
    expect(isELayout(null)).toBe(false);
    expect(isELayout(undefined)).toBe(false);
  });
});

describe("getRandomLayout", () => {
  it("Math.random이 0.3이면 LIST를 반환한다", () => {
    Math.random = jest.fn(() => 0.3);
    expect(getRandomLayout()).toBe(ELayout.LIST);
  });

  it("Math.random이 0.7이면 GRID를 반환한다", () => {
    Math.random = jest.fn(() => 0.7);
    expect(getRandomLayout()).toBe(ELayout.GRID);
  });
});

describe("cn", () => {
  it("클래스를 공백으로 합친다", () => {
    expect(cn("text-sm", "text-center")).toBe("text-sm text-center");
  });

  it("조건부 클래스에서 falsy 값은 무시된다", () => {
    expect(cn("p-2", false && "text-sm")).toBe("p-2");
    expect(cn("p-2", null, undefined)).toBe("p-2");
  });

  it("truthy 조건부 클래스는 포함된다", () => {
    expect(cn("text-sm", true && "font-bold")).toBe("text-sm font-bold");
  });

  it("중복된 Tailwind 클래스는 병합된다", () => {
    expect(cn("text-sm", "text-md", "text-xl", "text-lg")).toBe("text-lg");
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });
});
