// stores/authStore.ts
import { create } from "zustand";

type User = {
  id: number;
  email: string;
  name: string | null;
  created_at: string;
  role: string;
  status: string;
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

// Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
