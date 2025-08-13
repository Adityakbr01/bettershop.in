// components/auth/ProtectedRoute.tsx
"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // optional — defaults to "any logged-in user"
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (allowedRoles && !allowedRoles.includes(user?.role ?? "")) {
          router.replace("/");
          return;
        }
      } catch {
        router.replace("/signin");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [user, allowedRoles]);

  if (loading || !user) {
    return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
  }


  return <>{children}</>;
}
