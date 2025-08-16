// queries/products/mutations.ts
import { payment_options } from "@/constants";
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

// Type for a single payment option
export type PaymentOption = typeof payment_options[number];


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
   payment_options: PaymentOption[];
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
  variants: VariantItem[];
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


// -------------------- Variant Types --------------------

export type VariantItem = {
  id: number;
  product_id: number;
  stock_level: number;
  price: number;
  sku: string;
  attributes?: Record<string, any>; // e.g. { size: "M", color: "Red" }
};

export type VariantRes = {
  id: number;
  product_id: number;
  sku: string;
  price: number;
  attributes: { name: string; sku: string; size: string };
  stock_level: number;
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

const addVariantFn = async (data: {
  productId: number;
  stock_level: number;
  price: number;
  attributes: { name: string; sku: string; size: string };
}) => {
  const res = await api.post<VariantRes>("/products/variant/add", data);
  return res.data;
};
const updateProductFn = async (data: {
  productId: number;
  stock_level?: number;
  price?: number;
  attributes?: { name?: string; sku?: string; size?: string };
  active?:boolean
}) => {
  const { productId, ...rest } = data;
  
  // Filter out undefined / empty fields
  const filteredData: any = {};
  Object.entries(rest).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      filteredData[key] = value;
    }
  });
  const res = await api.put<VariantRes>(`/products/${productId}`, filteredData);
  return res.data;
};

const deleteProductFn = async (productId: number) => {
    const res = await api.delete<VariantRes>(`/products/${productId}`);
    return res.data;
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

export const useAddVariant = () => {
  const queryClient = useQueryClient();
  return useMutation<VariantRes, Error, {
    productId: number;
    stock_level: number;
    price: number;
    attributes: { name: string; sku: string; size: string };
  }>({
    mutationFn: addVariantFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProductFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useDeleteProduct = ()=>{
   const queryClient = useQueryClient();
   return useMutation({
    mutationFn: deleteProductFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  }); 
}


