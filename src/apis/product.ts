import { ProductType } from "@/types/product";

import api from "./api";

interface GetProductsParams {
  limit: number;
  skip: number;
}

interface GetProductsResponse {
  products: ProductType[];
}

export function getProducts({ limit, skip }: GetProductsParams) {
  return api.get<GetProductsResponse>("/products", {
    params: { limit, skip },
  });
}
