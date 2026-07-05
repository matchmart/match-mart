import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10 text-center text-secondary/60">Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
