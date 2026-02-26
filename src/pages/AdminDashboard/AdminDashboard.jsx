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
  const adminMenu = [
    { label: "Dashboard", icon: Home, route:"/admin" },
    { label: "Users", icon: Users, route:"/admin/users" },
    { label: "Forms request", icon: FileText, route:"/admin/formrequest" },
    { label: "Sub-admin", icon: UserCog, route:"/admin/subadmin"},
    { label: "Employee", icon: UserCheck,route:"/admin/employee" },
    { label: "Form Category", icon: BarChart3, route:"/admin/formcategory" },
    { label: "Billing", icon: Receipt, route:"/admin/billing"},
  ];

  return (
    <div className="flex h-screen">
  
  <Sidebar menuItems={adminMenu} />

  <div className="ml-0 lg:ml-64 w-full flex flex-col">

    {/* Fixed Header */}
    <div className="sticky top-0 z-50">
      <Header username="Welcome, Aakanksha Yadav" />
    </div>

    {/* Scrollable Content */}
    <div className="p-6 overflow-y-auto flex-1">
      <Outlet />
      
      {/* <AdminHome /> */}
    </div>

  </div>

</div>

  );
}