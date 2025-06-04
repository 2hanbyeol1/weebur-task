import Button from "@/components/Button";
import ScrollTopButton from "@/components/Button/ScrollTopButton";
import { CREATE_PRODUCT_PATH } from "@/constants/path";

import ProductList from "./_components/ProductList";
import { getLayoutCookie } from "./action";

const ProductListPage = async () => {
  const viewMode = await getLayoutCookie();

  return (
    <div className="flex flex-col gap-10">
      <Button href={CREATE_PRODUCT_PATH} size="sm" className="self-end">
        추가하기
      </Button>
      <ProductList defaultLayoutMode={viewMode} />
      <ScrollTopButton />
    </div>
  );
};

export default ProductListPage;
