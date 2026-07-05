import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
const AdminLayout = () => <div className="min-h-screen bg-gray-50 lg:flex"><AdminSidebar/><div className="min-w-0 flex-1"><AdminTopbar/><main className="p-6"><Outlet/></main></div></div>;
export default AdminLayout;
