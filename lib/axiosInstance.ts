import axios from "axios";
import { sha256 } from "js-sha256";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const defaultOptions = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(
  function (config) {
    let token = "";
    if (config.url?.startsWith("/")) {
      const userAgent = window.navigator.userAgent;
      token = sha256(`${config.url + userAgent}`);
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
