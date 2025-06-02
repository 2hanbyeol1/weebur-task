import Button from "@/components/Button";
import { PRODUCT_LIST_PATH } from "@/constants/path";

const NotFoundPage = () => {
  return (
    <div className="flex h-[calc(100vh-128px)] flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-1.5">
        <h1 className="text-xl font-medium">페이지를 찾지 못했어요</h1>
        <div className="text-gray-500">페이지 주소를 다시 확인해주세요</div>
      </div>
      <Button href={PRODUCT_LIST_PATH}>상품 목록 확인하기</Button>
    </div>
  );
};

export default NotFoundPage;
