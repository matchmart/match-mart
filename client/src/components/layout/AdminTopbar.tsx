import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
const AdminTopbar = () => { const { user, logout } = useAuth(); return <div className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-6"><div><p className="text-sm font-semibold text-secondary">Admin Panel</p><p className="text-xs text-secondary/40">Manage Match Mart</p></div><div className="flex items-center gap-3"><Link to="/" className="text-sm text-secondary/60 hover:text-primary">View site</Link><span className="text-sm text-secondary/60">{user?.name}</span><button onClick={logout} className="rounded-lg bg-secondary px-3 py-2 text-sm font-semibold text-white">Logout</button></div></div> };
export default AdminTopbar;
