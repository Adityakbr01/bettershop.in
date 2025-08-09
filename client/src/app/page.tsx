"use client";

import { Button } from "@/components/ui/button";
import { useMe } from "@/queries/auth/mutations";
import { useAuthStore } from "@/store/authStore";

export default function Home() {
  const { data } = useMe();
  const { user, setUser } = useAuthStore();

  // Jab bhi `data` update ho, store me set karo
  if (data?.data && user?.id !== data.data.id) {
    setUser(data.data);
  }

  return (
    <div>
      <h1>Ping Response</h1>
      <Button>Increase Bears</Button>

      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
    </div>
  );
}
