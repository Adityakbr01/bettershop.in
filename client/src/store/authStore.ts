// stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: number;
  email: string;
  name: string | null;
  role: string;
  status: string;
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

// Zustand store with persist
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // key for localStorage
      partialize: (state) => ({ user: state.user }),
    }
  )
);
