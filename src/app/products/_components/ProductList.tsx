"use client";
import { useEffect, useState } from "react";

import { getProducts } from "@/apis/product";
import InfiniteScrollList from "@/components/InfiniteScrollList";
import ProductItem from "@/components/ProductItem";
import { ELayout } from "@/types/mode";
import { ProductType } from "@/types/product";

import { setLayoutCookie } from "../action";

const LAYOUT_CN = {
  [ELayout.LIST]: "grid grid-cols-1 gap-2",
  [ELayout.GRID]: "grid grid-cols-4 gap-8",
};

interface ProductListProps {
  defaultLayoutMode: ELayout | undefined;
}

const ProductList = ({ defaultLayoutMode }: ProductListProps) => {
  const [layoutMode, setLayoutMode] = useState(defaultLayoutMode);

  useEffect(() => {
    (async () => {
      if (!defaultLayoutMode) setLayoutMode(await setLayoutCookie());
    })();
  }, [defaultLayoutMode]);

  if (!layoutMode) return <div></div>;

  return (
    <InfiniteScrollList<ProductType>
      className={LAYOUT_CN[layoutMode]}
      render={(product) => (
        <ProductItem key={product.id} product={product} layout={layoutMode} />
      )}
      fetchFn={async () => {
        const {
          data: { products },
        } = await getProducts({ limit: 20, skip: 0 });
        return products;
      }}
    />
  );
};

export default ProductList;
