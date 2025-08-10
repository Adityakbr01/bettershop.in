// withAuth.tsx
"use client";

import { ComponentType, JSX } from "react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "@/utils/navigation";
import toast from "react-hot-toast";

export function withAuth<P extends object>(
  Component: ComponentType<P>
) {
  return function AuthWrapper(props: P) {
    const { user } = useAuthStore();
    const { goTo } = useNavigate();

    if (!user) {
      toast("⚠️ Please log in first");
      goTo("/signin", { replace: true });
      return null;
    }

    return <Component {...props} />;
  };
}
