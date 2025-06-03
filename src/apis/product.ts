import { ADD_PRODUCT_API_PATH, GET_PRODUCTS_API_PATH } from "@/constants/path";
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
  return api.get<GetProductsResponse>(GET_PRODUCTS_API_PATH, {
    params: { limit, skip },
  });
}

type AddProductRequestBody = Pick<
  ProductType,
  "title" | "description" | "price" | "discountPercentage" | "brand"
>;

export function addProduct({ data }: { data: AddProductRequestBody }) {
  return api.post(ADD_PRODUCT_API_PATH, data);
}
