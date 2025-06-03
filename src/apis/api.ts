import axios from "axios";

import { BASE_URL_PATH } from "@/constants/path";

const api = axios.create({ baseURL: BASE_URL_PATH });

export default api;
