import Sidebar from "../../component/Sidebar";
import Header from "../../component/Header";
import AdminHome from "./AdminHome";

import {
  Home,
  Users,
  FileText,
  UserCog,
  UserCheck,
  BarChart3,
  Receipt,
} from "lucide-react";

import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen">

      <Sidebar />

      <div className="ml-0 lg:ml-64 w-full flex flex-col">

        {/* Fixed Header */}
        <Header />

        {/* Content should start BELOW header */}
        <div className="pt-20 px-6 overflow-y-auto flex-1 bg-gray-50">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
