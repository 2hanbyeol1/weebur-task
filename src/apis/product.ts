import { OffsetPaginationMetaType } from "@/types/pagination";
import { ProductType } from "@/types/product";

import api from "./api";

interface GetProductsParams {
  limit: number;
  skip: number;
}

interface GetProductsResponse extends OffsetPaginationMetaType {
  products: ProductType[];
}

export function getProducts({ limit, skip }: GetProductsParams) {
  return api.get<GetProductsResponse>("/products", {
    params: { limit, skip },
  });
}

type AddProductRequestBody = Pick<
  ProductType,
  "title" | "description" | "price" | "discountPercentage" | "brand"
>;

export function createProduct({ data }: { data: AddProductRequestBody }) {
  return api.post("/products/add", data);
}
