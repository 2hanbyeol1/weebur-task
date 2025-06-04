import axios, { isAxiosError } from "axios";

import { BASE_URL_PATH } from "@/constants/path";
import NetworkError from "@/errors/NetworkError";
import UnExpectedError from "@/errors/UnExpectedError";

const api = axios.create({ baseURL: BASE_URL_PATH, timeout: 7000 });

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.request.status === 0) throw new NetworkError();
    if (!isAxiosError(error)) throw new UnExpectedError();
    if (!error.response) throw new UnExpectedError();
    const errorMessage = error.response.data.message;
    throw new Error(errorMessage, {
      cause: error.status,
    });
  },
);

export default api;
