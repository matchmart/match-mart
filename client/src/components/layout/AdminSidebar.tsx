import { NavLink } from "react-router-dom";
import { FiBox, FiGrid, FiHome, FiMapPin, FiSettings, FiShoppingBag } from "react-icons/fi";
const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: FiHome },
  { label: "Products", path: "/admin/products", icon: FiShoppingBag },
  { label: "Categories", path: "/admin/categories", icon: FiGrid },
  { label: "Branches", path: "/admin/branches", icon: FiMapPin },
  { label: "Settings", path: "/admin/settings", icon: FiSettings },
];
const AdminSidebar = () => <aside className="hidden min-h-screen w-64 border-r border-gray-100 bg-white px-4 py-6 lg:block"><div className="px-3"><div className="flex items-center gap-2"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white"><FiBox size={20}/></div><div><p className="text-sm font-bold text-secondary">Match Mart</p><p className="text-xs text-secondary/40">Admin Panel</p></div></div></div><nav className="mt-8 space-y-1">{navItems.map(({label,path,icon:Icon}) => <NavLink key={path} to={path} className={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-secondary/60 hover:bg-gray-50 hover:text-secondary"}`}><Icon size={18}/>{label}</NavLink>)}</nav></aside>;
export default AdminSidebar;
