import axiosInstance from "./axiosInstance";
import type { Category, CategoryFormValues } from "@/types/category";

export const getActiveCategories = async (): Promise<{ success: boolean; count: number; categories: Category[] }> => {
  const { data } = await axiosInstance.get("/categories");
  return data;
};
export const getAllCategoriesAdmin = async (): Promise<{ success: boolean; count: number; categories: Category[] }> => {
  const { data } = await axiosInstance.get("/categories/admin/all");
  return data;
};
export const createCategory = async (values: CategoryFormValues, imageFile?: File | null): Promise<{ success: boolean; message: string; category: Category }> => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("description", values.description || "");
  formData.append("isActive", String(values.isActive));
  if (imageFile) formData.append("image", imageFile);
  const { data } = await axiosInstance.post("/categories", formData);
  return data;
};
export const updateCategory = async (id: string, values: CategoryFormValues, imageFile?: File | null): Promise<{ success: boolean; message: string; category: Category }> => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("description", values.description || "");
  formData.append("isActive", String(values.isActive));
  if (imageFile) formData.append("image", imageFile);
  const { data } = await axiosInstance.put(`/categories/${id}`, formData);
  return data;
};
export const deleteCategory = async (id: string): Promise<{ success: boolean; message: string }> => {
  const { data } = await axiosInstance.delete(`/categories/${id}`);
  return data;
};
