import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

import ProductForm from "@/app/(providers)/products/new/_components/ProductForm";
import { PRODUCT_LIST_PATH } from "@/constants/path";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ProductForm", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({ push: jest.fn() }));
  });

  it("기본값들이 입력창에 렌더링된다. 제출 버튼이 활성화 되어있다.", () => {
    render(<ProductForm />);
    expect(screen.getByLabelText("상품명")).toHaveValue("");
    expect(screen.getByLabelText("상품 설명")).toHaveValue("");
    expect(screen.getByLabelText("가격")).toHaveValue(null);
    expect(screen.getByLabelText("브랜드")).toHaveTextContent("Apple");
    expect(screen.getByRole("button", { name: "제출하기" })).toBeEnabled();
  });

  it("상품명이 공백일 때 폼을 제출하면, 메시지가 뜨고 제출 버튼이 비활성화된다.", async () => {
    render(<ProductForm />);
    const titleInput = screen.getByLabelText("상품명");
    const submitButton = screen.getByRole("button", { name: "제출하기" });

    await userEvent.clear(titleInput);
    await userEvent.click(submitButton);

    expect(screen.getByText("상품명을 입력해 주세요")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "제출하기" })).toBeDisabled();
  });

  it("상품명을 16자 이상 입력해도 15자까지만 입력된다.", async () => {
    render(<ProductForm />);
    const titleInput = screen.getByLabelText("상품명") as HTMLInputElement;

    await userEvent.type(titleInput, "가나다라마바사아자차카타파하1234567890");

    expect(titleInput.value.length).toBe(15);
  });

  it("가격의 값이 공백이거나 1000보다 작을 때 폼을 제출하면, 메시지가 뜨고 제출 버튼이 비활성화된다.", async () => {
    render(<ProductForm />);
    const priceInput = screen.getByLabelText("가격");
    const submitButton = screen.getByRole("button", { name: "제출하기" });

    await userEvent.clear(priceInput);
    await userEvent.click(submitButton);

    expect(screen.getByText("1000원부터 입력할 수 있어요")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "제출하기" })).toBeDisabled();

    await userEvent.type(priceInput, "500");
    await userEvent.click(submitButton);

    expect(screen.getByText("1000원부터 입력할 수 있어요")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "제출하기" })).toBeDisabled();
  });

  it("할인율이 100보다 클 때 폼을 제출하면, 메시지가 뜨고 제출 버튼이 비활성화된다.", async () => {
    render(<ProductForm />);
    const discountInput = screen.getByLabelText("할인율");
    const submitButton = screen.getByRole("button", { name: "제출하기" });

    await userEvent.type(discountInput, "101");
    await userEvent.click(submitButton);

    expect(screen.getByText("100%까지만 입력할 수 있어요")).toBeInTheDocument();
  });

  it("가격에서 할인율로 계산된 최종 가격이 실시간으로 렌더링된다.", async () => {
    render(<ProductForm />);
    const priceInput = screen.getByLabelText("가격");
    const discountInput = screen.getByLabelText("할인율");

    await userEvent.type(priceInput, "3000");
    await userEvent.type(discountInput, "10");

    expect(screen.getByText(/2,700/)).toBeInTheDocument();
  });

  it("유효한 폼을 제출했을 때, 상품 리스트 페이지로 이동한다.", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push }));

    render(<ProductForm />);

    await userEvent.type(screen.getByLabelText("상품명"), "제품");
    await userEvent.type(screen.getByLabelText("가격"), "1000");
    await userEvent.click(screen.getByRole("button", { name: "제출하기" }));

    expect(push).toHaveBeenCalledWith(PRODUCT_LIST_PATH);
  });
});
