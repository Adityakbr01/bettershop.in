// queries/products/mutations.ts
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// -------------------- Types --------------------

export type CategoryItem = {
  id: number;
  name: string;
  slug: string;
  parent_category_id: number | null;
};


export type CategoryResponse = {
  success: boolean;
  status: number;
  message: string;
  data: CategoryItem[];
};

export type ProductItemRes = {
  id: number;
  name: string;
  slug: string;
  description: string;
  base_price: number;
  category_id: number;
  size_chart: string | null;
  created_at: string;
  updated_at: string;
  return_policy_id: number | null;
  payment_options: string[];
  estimated_delivery_days: number;
  active: boolean,
  stock: number,
  sku: string
  category?: {
    id: number,
    name: string,
    slug: string,
    parent_category_id: number
  }
}


export type ProductRes = {
  success: boolean;
  status: number;
  message: string;
  data: ProductItemRes;
  timestamp: string;
};


export type ProductsRes = {
  success: boolean;
  status: number;
  message: string;
  data: ProductItemRes[];
  timestamp: string;
};

// -------------------- API Calls --------------------

const getCategoryFn = async (): Promise<CategoryResponse> => {
  try {
    const res = await api.get<CategoryResponse>("/products/category");
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      // session expired → clear store
      useAuthStore.getState().clearUser();
    }
    throw error;
  }
};

export const createProductFn = async (data: any): Promise<ProductRes> => {
  const res = await api.post<ProductRes>("/products/create", data);
  return res.data;
};

const getProducts = async (): Promise<any> => {
  try {
    const res = await api.get<ProductsRes>("/products/");
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      // session expired → clear store
      useAuthStore.getState().clearUser();
    }
    throw error;
  }
};


// -------------------- React Query Hooks --------------------

export const useGetCategory = () => {
  return useQuery<CategoryResponse, Error>({
    queryKey: ["category"],
    queryFn: getCategoryFn,
    retry: false,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<ProductRes, Error, any>({
    mutationFn: createProductFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useGetProducts = () => {
  return useQuery<ProductsRes, Error>({
    queryKey: ["products"],
    queryFn: getProducts,
    retry: false,
  });
};