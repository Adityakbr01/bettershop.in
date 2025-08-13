// queries/auth/mutations.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

// -------------------- Types --------------------
export type SignupPayload = {
  name?: string;
  email: string;
  password: string;
};

export type SigninPayload = {
  email: string;
  password: string;
};

export type UserInfo = {
  id: number;
  email: string;
  name: string | null;
  role: string;
  status: string;
  token: string;
};

export type AuthResponse = {
  token: string;
  user: UserInfo;
  data: UserInfo;
};

// -------------------- API Calls --------------------
export const signupFn = async (data: SignupPayload): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/signup", data);
  return res.data;
};

export const signinFn = async (data: SigninPayload): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/signin", data);
  return res.data;
};

export const logoutFn = async (): Promise<{ message: string }> => {
  const res = await api.post<{ message: string }>("/auth/logout");
  return res.data;
};


const meFn = async (): Promise<any> => {
  try {
    const res = await api.get<any>("/auth/me");
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      // session expire → clear store
      useAuthStore.getState().clearUser();
    }
    throw error;
  }
};



// -------------------- React Query Hooks --------------------
export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signupFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] }); // refetch user data
    }
  });
};

export const useSignin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signinFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      queryClient.setQueryData(["auth"], null); // clear cached user
    }
  });
};

export const useMe = () => {
  return useQuery<any, any>({
    queryKey: ["auth"],
    queryFn: meFn,
    retry:false,
  });
};
