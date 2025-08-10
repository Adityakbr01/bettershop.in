// withGuest.tsx
"use client";

import { ComponentType } from "react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "@/utils/navigation";
import toast from "react-hot-toast";

export function withGuest<P extends object>(
  Component: ComponentType<P>
) {
  return function GuestWrapper(props: P) {
    const { user } = useAuthStore();
    const { goTo } = useNavigate();

    if (user) {
      goTo("/", { replace: true });
      toast("⚠️ You are already logged in");
      return null;
    }

    return <Component {...props} />;
  };
}
