import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10 text-center text-secondary/60">Loading...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return user.role === "admin" ? children : <Navigate to="/" replace />;
};
export default AdminProtectedRoute;
