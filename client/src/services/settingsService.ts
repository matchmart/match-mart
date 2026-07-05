import axiosInstance from "./axiosInstance";
import type { UpdateSettingsPayload, WebsiteSettings } from "@/types/settings";

export const getSettings = async (): Promise<{ success: boolean; settings: WebsiteSettings }> => {
  const { data } = await axiosInstance.get("/settings");
  return data;
};
export const updateSettings = async (payload: UpdateSettingsPayload): Promise<{ success: boolean; settings: WebsiteSettings; message: string }> => {
  const { data } = await axiosInstance.put("/settings", payload);
  return data;
};
export const uploadLogo = async (file: File): Promise<{ success: boolean; logoUrl: string; settings: WebsiteSettings }> => {
  const formData = new FormData();
  formData.append("logo", file);
  const { data } = await axiosInstance.post("/settings/logo", formData);
  return data;
};
export const uploadFavicon = async (file: File): Promise<{ success: boolean; faviconUrl: string; settings: WebsiteSettings }> => {
  const formData = new FormData();
  formData.append("favicon", file);
  const { data } = await axiosInstance.post("/settings/favicon", formData);
  return data;
};
