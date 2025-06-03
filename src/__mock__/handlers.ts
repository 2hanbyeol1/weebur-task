import { http, HttpResponse } from "msw";

import {
  ADD_PRODUCT_API_PATH,
  BASE_URL_PATH,
  GET_PRODUCTS_API_PATH,
} from "@/constants/path";

import { products } from "./data";

const getProducts = http.get(
  `${BASE_URL_PATH}${GET_PRODUCTS_API_PATH}`,
  ({ params }: { params: { limit: string; skip: string } }) => {
    const { limit, skip } = params;

    return HttpResponse.json({
      products: products.slice(parseInt(skip), parseInt(skip + limit)),
      total: products.length,
      skip,
      limit,
    });
  },
);

const addProduct = http.post(
  `${BASE_URL_PATH}${ADD_PRODUCT_API_PATH}`,
  ({ request }) => {
    const { body } = request;

    return HttpResponse.json(
      {
        ...body,
      },
      { status: 201 },
    );
  },
);

export const handlers = [getProducts, addProduct];
