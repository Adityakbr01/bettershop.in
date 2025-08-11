"use client";

import { Routes } from "@/constants";
import { useMe } from "@/queries/auth/mutations";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "@/utils/navigation";
import Link from "next/link";

export default function Home() {
  const { goTo } = useNavigate()
  const { data, error } = useMe();
  const { user, setUser } = useAuthStore();

  if (data?.data && user?.id !== data.data.id) {
    setUser(data.data);
  }

  return (
    <div>
      <h2>Working hai Brother</h2>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}

      <Link href={Routes.SIGNIN}>Sign In</Link>
      <Link href={Routes.SIGNUP}>Sign up</Link>
      <Link href={"/admin/dashboard"}>admin Dashboard</Link>
    </div>
  );
}
