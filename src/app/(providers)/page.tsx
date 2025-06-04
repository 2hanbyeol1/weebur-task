import Button from "@/components/Button";
import { CREATE_PRODUCT_PATH, PRODUCT_LIST_PATH } from "@/constants/path";

const MainPage = () => {
  return (
    <div className="flex h-[calc(100vh-128px)] flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-1.5">
        <h1 className="text-xl font-medium">안녕하세요</h1>
        <div className="text-gray-500">
          과제를 확인하시려면 링크를 클릭해주세요
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button href={PRODUCT_LIST_PATH} size="sm">
          상품 목록 확인하기
        </Button>
        <Button href={CREATE_PRODUCT_PATH} size="sm">
          상품 등록하기
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
