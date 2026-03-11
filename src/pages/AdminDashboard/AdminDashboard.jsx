import { useState } from "react";
import Sidebar from "../../component/Sidebar";
import Header from "../../component/Header";
import { Outlet } from "react-router-dom";
import api from "../../api/axios";
import { useEffect } from "react";
export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [adminProfile, setAdminProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/admin/profile");
        setAdminProfile(res.data.data);
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`min-h-screen transition-all duration-300 ${
          collapsed ? "lg:pl-24" : "lg:pl-72"
        }`}
      >
         <Header collapsed={collapsed} adminProfile={adminProfile} />
        <main className="pt-[78px]">
          <div className="min-h-[calc(100vh-78px)] bg-gray-50 p-4 transition-colors duration-300 sm:p-6 dark:bg-gray-800">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}