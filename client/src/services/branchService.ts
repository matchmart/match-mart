import axiosInstance from "./axiosInstance";
import type { Branch, BranchFormValues } from "@/types/branch";

export const getActiveBranches = async (): Promise<{ success: boolean; count: number; branches: Branch[] }> => {
  const { data } = await axiosInstance.get("/branches");
  return data;
};
export const getAllBranchesAdmin = async (search?: string): Promise<{ success: boolean; count: number; branches: Branch[] }> => {
  const { data } = await axiosInstance.get("/branches/admin/all", { params: { search } });
  return data;
};
const buildBranchFormData = (values: BranchFormValues, imageFiles?: File[]): FormData => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("locationName", values.locationName);
  formData.append("address", values.address);
  formData.append("phone", values.phone || "");
  formData.append("whatsapp", values.whatsapp || "");
  formData.append("openingHours", values.openingHours || "");
  formData.append("googleMapEmbedUrl", values.googleMapEmbedUrl || "");
  formData.append("isFeatured", String(values.isFeatured));
  formData.append("isActive", String(values.isActive));
  imageFiles?.forEach((file) => formData.append("images", file));
  return formData;
};
export const createBranch = async (values: BranchFormValues, imageFiles?: File[]): Promise<{ success: boolean; message: string; branch: Branch }> => {
  const { data } = await axiosInstance.post("/branches", buildBranchFormData(values, imageFiles));
  return data;
};
export const updateBranch = async (id: string, values: BranchFormValues, imageFiles?: File[], removeImagePublicIds?: string[]): Promise<{ success: boolean; message: string; branch: Branch }> => {
  const formData = buildBranchFormData(values, imageFiles);
  if (removeImagePublicIds?.length) formData.append("removeImagePublicIds", JSON.stringify(removeImagePublicIds));
  const { data } = await axiosInstance.put(`/branches/${id}`, formData);
  return data;
};
export const deleteBranch = async (id: string): Promise<{ success: boolean; message: string }> => {
  const { data } = await axiosInstance.delete(`/branches/${id}`);
  return data;
};
