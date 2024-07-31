import axios, { Axios } from "axios";

let AxiosCreator;

export const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (typeof window !== "undefined") {
  AxiosCreator = axios.create({
    baseURL: apiUrl,
  });

  AxiosCreator.interceptors.request.use(async (config) => {
    return config;
  });

  AxiosCreator.interceptors.response.use(
    async (res) => {
      return res;
    },
    (err) => {
      if (err?.response?.status === 401) {
        console.log("401 err : ", err);
      }
      throw err?.response;
    }
  );
}

export default AxiosCreator;
