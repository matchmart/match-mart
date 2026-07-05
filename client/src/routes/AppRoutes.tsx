import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import AdminProtectedRoute from "@/routes/AdminProtectedRoute";
import HomePage from "@/pages/public/HomePage";
import ProductsPage from "@/pages/public/ProductsPage";
import ProductDetailsPage from "@/pages/public/ProductDetailsPage";
import CategoriesPage from "@/pages/public/CategoriesPage";
import BranchesPage from "@/pages/public/BranchesPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ProfilePage from "@/pages/auth/ProfilePage";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminSettingsPage from "@/pages/admin/AdminSettingsPage";
import AdminProductsPage from "@/pages/admin/AdminProductsPage";
import AdminCategoriesPage from "@/pages/admin/AdminCategoriesPage";
import AdminBranchesPage from "@/pages/admin/AdminBranchesPage";

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:slug" element={<ProductDetailsPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/branches" element={<BranchesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
    </Route>
    <Route path="/admin/login" element={<AdminLoginPage />} />
    <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
      <Route index element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboardPage />} />
      <Route path="settings" element={<AdminSettingsPage />} />
      <Route path="products" element={<AdminProductsPage />} />
      <Route path="categories" element={<AdminCategoriesPage />} />
      <Route path="branches" element={<AdminBranchesPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
export default AppRoutes;
