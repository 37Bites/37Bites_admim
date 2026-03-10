import { useState } from "react";
import Sidebar from "../../component/Sidebar";
import Header from "../../component/Header";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`min-h-screen transition-all duration-300 ${
          collapsed ? "lg:pl-24" : "lg:pl-72"
        }`}
      >
        <Header collapsed={collapsed} />
        <main className="pt-[78px]">
          <div className="min-h-[calc(100vh-78px)] bg-gray-50 p-4 transition-colors duration-300 sm:p-6 dark:bg-gray-800">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}