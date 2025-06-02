import { render, screen } from "@testing-library/react";

import NotFoundPage from "@/app/not-found";
import { PRODUCT_LIST_PATH } from "@/constants/path";

import "@testing-library/jest-dom";

describe("NotFound Page", () => {
  beforeEach(() => {
    render(<NotFoundPage />);
  });

  it("페이지를 찾지 못했다는 메시지를 보여준다", () => {
    expect(screen.getByText("페이지를 찾지 못했어요")).toBeInTheDocument();
  });

  it("주소 확인 문구를 보여준다", () => {
    expect(
      screen.getByText("페이지 주소를 다시 확인해주세요"),
    ).toBeInTheDocument();
  });

  it("상품 목록 확인하기 버튼을 보여준다", () => {
    const button = screen.getByRole("link", { name: "상품 목록 확인하기" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", PRODUCT_LIST_PATH);
  });
});
