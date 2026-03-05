import Sidebar from "../../component/Sidebar";
import Header from "../../component/Header";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Layout */}
      <div className="flex flex-col flex-1 lg:ml-64">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-6 mt-16 overflow-y-auto bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <Outlet />
        </main>

      </div>
    </div>
  );
}