import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import * as authService from "@/services/authService";
import type { ChangePasswordPayload, LoginPayload, RegisterPayload, User } from "@/types/auth";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  register: (payload: RegisterPayload) => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  adminLogin: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  changePassword: (payload: ChangePasswordPayload) => Promise<void>;
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("match_mart_token");
    if (!token) { setLoading(false); return; }
    authService.getMe().then(({ user }) => setUser(user)).catch(() => localStorage.removeItem("match_mart_token")).finally(() => setLoading(false));
  }, []);
  const saveAuth = (token: string, user: User) => { localStorage.setItem("match_mart_token", token); setUser(user); };
  const value = useMemo<AuthContextValue>(() => ({
    user, loading,
    register: async (payload) => { const res = await authService.register(payload); saveAuth(res.token, res.user); },
    login: async (payload) => { const res = await authService.login(payload); saveAuth(res.token, res.user); },
    adminLogin: async (payload) => { const res = await authService.adminLogin(payload); saveAuth(res.token, res.user); },
    logout: () => { localStorage.removeItem("match_mart_token"); setUser(null); },
    changePassword: async (payload) => { await authService.changePassword(payload); },
  }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
