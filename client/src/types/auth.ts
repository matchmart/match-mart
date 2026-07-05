export type UserRole = "user" | "admin";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginPayload { email: string; password: string; }
export interface RegisterPayload { name: string; email: string; password: string; }
export interface ChangePasswordPayload { currentPassword: string; newPassword: string; }
export interface AuthResponse { success: boolean; token: string; user: User; message?: string; }
