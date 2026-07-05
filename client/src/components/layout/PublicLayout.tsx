import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const PublicLayout = () => <div className="min-h-screen bg-white"><Navbar/><main><Outlet/></main><Footer/></div>;
export default PublicLayout;
