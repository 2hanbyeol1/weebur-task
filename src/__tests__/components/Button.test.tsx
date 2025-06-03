import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "@/components/Button/Button";

import "@testing-library/jest-dom";

describe("Button 컴포넌트", () => {
  it("href가 있는 경우 Link로 렌더링된다", () => {
    render(<Button href="/test">링크 버튼</Button>);
    const link = screen.getByRole("link", { name: "링크 버튼" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveClass("bg-primary/80"); // 공통 클래스
  });

  it("href가 없는 경우 button으로 렌더링된다", () => {
    render(<Button>기본 버튼</Button>);
    const button = screen.getByRole("button", { name: "기본 버튼" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary/80");
  });

  it("size가 sm일 때 클래스가 적용된다", () => {
    render(<Button size="sm">작은 버튼</Button>);
    const button = screen.getByRole("button", { name: "작은 버튼" });
    expect(button).toHaveClass("px-3.5", "py-1.5", "text-sm");
  });

  it("disabled 상태일 때 비활성화 스타일이 적용된다", () => {
    render(<Button disabled>비활성 버튼</Button>);
    const button = screen.getByRole("button", { name: "비활성 버튼" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("bg-primary/40", "cursor-not-allowed");
  });

  it("클릭 이벤트가 작동한다", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>클릭 버튼</Button>);
    const button = screen.getByRole("button", { name: "클릭 버튼" });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
