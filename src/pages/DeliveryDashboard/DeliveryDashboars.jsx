import { useState } from "react";
import DeliverySidebar from "../../component/DeliverySidebar";
import DeliveryHeader from "../../component/DeliveryHeader";
import { Outlet } from "react-router-dom";

export default function DeliveryLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}
      <DeliverySidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Header */}
      <DeliveryHeader onMenuClick={() => setSidebarOpen(true)} />

      {/* Main Content */}
      <div className="lg:ml-[290px] pt-20">

        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}