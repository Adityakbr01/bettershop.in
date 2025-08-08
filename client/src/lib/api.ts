import axios, { AxiosError } from "axios";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1",
  withCredentials: true,
  timeout: 10000
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message || error.message || "API request failed";
    return Promise.reject(error);
  }
);
