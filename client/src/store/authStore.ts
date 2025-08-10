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
  token: string | null; //Todo 
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

// Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
