import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/store/authStore";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1",
  withCredentials: true,
  timeout: 10000
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      // Cookie/session expired → clear zustand store
      useAuthStore.getState().clearUser();
    }

    const message =
      error.response?.data?.message || error.message || "API request failed";
    return Promise.reject({ ...error, message });
  }
);
