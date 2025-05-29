import Button from "@/components/Button";

import ProductList from "./_components/ProductList";
import { getLayoutCookie } from "./action";

const ProductListPage = async () => {
  const viewMode = await getLayoutCookie();

  return (
    <div className="flex flex-col gap-2">
      <Button href="/products/new" className="self-end">
        상품 등록
      </Button>
      <ProductList defaultLayoutMode={viewMode} />
    </div>
  );
};

export default ProductListPage;
