import axiosInstance from "./axiosInstance";
import type { Product, ProductFilters, ProductFormValues } from "@/types/product";

export const getActiveProducts = async (filters?: ProductFilters): Promise<{ success: boolean; count: number; products: Product[] }> => {
  const { data } = await axiosInstance.get("/products", { params: filters });
  return data;
};
export const getProductBySlug = async (slug: string): Promise<{ success: boolean; product: Product }> => {
  const { data } = await axiosInstance.get(`/products/${slug}`);
  return data;
};
export const getAllProductsAdmin = async (filters?: ProductFilters): Promise<{ success: boolean; count: number; products: Product[] }> => {
  const { data } = await axiosInstance.get("/products/admin/all", { params: filters });
  return data;
};
const buildProductFormData = (values: ProductFormValues, imageFiles?: File[]): FormData => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("description", values.description || "");
  formData.append("price", String(values.price));
  if (typeof values.discountPrice === "number" && !Number.isNaN(values.discountPrice)) formData.append("discountPrice", String(values.discountPrice));
  formData.append("category", values.category);
  formData.append("stock", String(values.stock));
  formData.append("sizes", values.sizes || "");
  formData.append("colors", values.colors || "");
  formData.append("isFeatured", String(values.isFeatured));
  formData.append("isNewArrival", String(values.isNewArrival));
  formData.append("status", values.status);
  imageFiles?.forEach((file) => formData.append("images", file));
  return formData;
};
export const createProduct = async (values: ProductFormValues, imageFiles?: File[]): Promise<{ success: boolean; message: string; product: Product }> => {
  const { data } = await axiosInstance.post("/products", buildProductFormData(values, imageFiles));
  return data;
};
export const updateProduct = async (id: string, values: ProductFormValues, imageFiles?: File[], removeImagePublicIds?: string[]): Promise<{ success: boolean; message: string; product: Product }> => {
  const formData = buildProductFormData(values, imageFiles);
  if (removeImagePublicIds?.length) formData.append("removeImagePublicIds", JSON.stringify(removeImagePublicIds));
  const { data } = await axiosInstance.put(`/products/${id}`, formData);
  return data;
};
export const deleteProduct = async (id: string): Promise<{ success: boolean; message: string }> => {
  const { data } = await axiosInstance.delete(`/products/${id}`);
  return data;
};
