import axiosInstance from "./axiosInstance";
import type { AuthResponse, ChangePasswordPayload, LoginPayload, RegisterPayload, User } from "@/types/auth";

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post("/auth/register", payload);
  return data;
};
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post("/auth/login", payload);
  return data;
};
export const adminLogin = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post("/auth/admin/login", payload);
  return data;
};
export const getMe = async (): Promise<{ success: boolean; user: User }> => {
  const { data } = await axiosInstance.get("/auth/me");
  return data;
};
export const changePassword = async (payload: ChangePasswordPayload): Promise<{ success: boolean; message: string }> => {
  const { data } = await axiosInstance.put("/auth/change-password", payload);
  return data;
};
