import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiUser, FiX } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
const navLinks = [
  { label: "Home", path: "/" }, { label: "Products", path: "/products" }, { label: "Categories", path: "/categories" }, { label: "Branches", path: "/branches" },
];
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const linkClass = ({ isActive }: { isActive: boolean }) => `text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-secondary/60 hover:text-secondary"}`;
  return <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link to="/" className="text-lg font-bold tracking-tight text-secondary">Match <span className="text-primary">Mart</span></Link>
      <nav className="hidden items-center gap-7 md:flex">{navLinks.map(l => <NavLink key={l.path} to={l.path} className={linkClass}>{l.label}</NavLink>)}</nav>
      <div className="hidden items-center gap-3 md:flex">{user ? <><Link to="/profile" className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-secondary hover:bg-gray-50"><FiUser size={15}/>Profile</Link><button onClick={logout} className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white hover:opacity-90">Logout</button></> : <><Link to="/login" className="text-sm font-medium text-secondary/60 hover:text-secondary">Login</Link><Link to="/register" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90">Register</Link></>}</div>
      <button type="button" onClick={() => setMobileOpen(p => !p)} className="rounded-lg p-2 text-secondary md:hidden" aria-label="Toggle menu">{mobileOpen ? <FiX size={22}/> : <FiMenu size={22}/>}</button>
    </div>
    {mobileOpen && <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden"><nav className="space-y-2">{navLinks.map(l => <NavLink key={l.path} to={l.path} onClick={() => setMobileOpen(false)} className={({isActive}) => `block rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "bg-primary/10 text-primary" : "text-secondary/70 hover:bg-gray-50"}`}>{l.label}</NavLink>)}</nav><div className="mt-4 border-t border-gray-100 pt-4">{user ? <><Link to="/profile" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-secondary/70 hover:bg-gray-50">Profile</Link><button type="button" onClick={() => {logout(); setMobileOpen(false)}} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-500 hover:bg-red-50">Logout</button></> : <><Link to="/login" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-secondary/70 hover:bg-gray-50">Login</Link><Link to="/register" onClick={() => setMobileOpen(false)} className="mt-2 block rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white">Register</Link></>}</div></div>}
  </header>;
};
export default Navbar;
