// src/utils/api-error.ts
"use client";

import { AxiosError } from "axios";

type ErrorWithMessage = {
  message?: unknown;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return typeof error === "object" && error !== null && "message" in error;
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const msg = error.response?.data as { message?: string };
    return (
      msg?.message || error.message || "Failed to fetch data from the server"
    );
  }

  if (error instanceof Error) return error.message;

  if (typeof error === "string") return error;

  if (isErrorWithMessage(error)) {
    return String(error.message);
  }

  return "Something went wrong";
};
