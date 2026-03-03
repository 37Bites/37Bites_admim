import Sidebar from "../../component/Sidebar";
import Header from "../../component/Header";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">

      <Sidebar />

      <div className="ml-0 lg:ml-64 w-full flex flex-col">

        <Header />

        <div className="pt-20 px-6 overflow-y-auto flex-1 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <Outlet />
        </div>

      </div>
    </div>
  );
}