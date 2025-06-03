"use client";
import { useEffect, useState } from "react";

import { getProducts } from "@/apis/product";
import InfiniteScrollList from "@/components/InfiniteScrollList";
import { ELayout } from "@/types/mode";
import { ProductType } from "@/types/product";

import { setLayoutCookie } from "../action";

import ProductItem from "./ProductItem";

const LAYOUT_CN = {
  [ELayout.LIST]: "grid grid-cols-1 gap-4",
  [ELayout.GRID]: "grid grid-cols-4 gap-x-8 gap-y-16",
};

interface ProductListProps {
  defaultLayoutMode?: ELayout;
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
      fetchFn={async (page: number) => {
        const {
          data: { products, skip, total },
        } = await getProducts({ limit: 20, skip: page * 20 });
        return { newData: products, isLastPage: skip + 20 >= total };
      }}
    />
  );
};

export default ProductList;
