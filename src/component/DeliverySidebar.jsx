import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Bike,
  ClipboardList,
  MapPinned,
  Wallet,
  Star,
  Settings,
  LogOut,
  X,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/delivery",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: "My Orders",
    path: "/delivery/orders",
    icon: ClipboardList,
  },
  {
    name: "Active Delivery",
    path: "/delivery/active",
    icon: Bike,
  },
  {
    name: "Route Map",
    path: "/delivery/map",
    icon: MapPinned,
  },
  {
    name: "Earnings",
    path: "/delivery/earnings",
    icon: Wallet,
  },
  {
    name: "Reviews",
    path: "/delivery/reviews",
    icon: Star,
  },
  {
    name: "Settings",
    path: "/delivery/settings",
    icon: Settings,
  },
];

export default function DeliverySidebar({
  open,
  setOpen,
  onLogout,
  deliveryBoy = {
    name: "Rahul Delivery",
    id: "DB1025",
    rating: 4.8,
    status: "Online",
    city: "Indore",
    totalDeliveries: 1284,
    avatar: "",
  },
}) {
  const location = useLocation();

  const handleClose = () => {
    if (setOpen) setOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 transition-all duration-300 lg:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-[290px]
          bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
          text-white shadow-2xl border-r border-white/10
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Top Header */}
        <div className="h-16 px-4 sm:px-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Bike size={22} className="text-white" />
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-wide text-white">
                37BITES
              </h2>
              <p className="text-[11px] text-orange-400 font-medium">
                Delivery Partner
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="lg:hidden p-2 rounded-xl hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Card */}
        <div className="p-4 border-b border-white/10">
          <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-4 shadow-lg">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-yellow-400/10 rounded-full blur-2xl" />

            <div className="relative flex items-start gap-3">
              {deliveryBoy.avatar ? (
                <img
                  src={deliveryBoy.avatar}
                  alt={deliveryBoy.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-white/10"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-lg font-bold shadow-md">
                  {getInitials(deliveryBoy.name)}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate">
                  {deliveryBoy.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  ID: {deliveryBoy.id}
                </p>

                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${
                      deliveryBoy.status === "Online"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                        : "bg-red-500/15 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {deliveryBoy.status}
                  </span>

                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">
                    ⭐ {deliveryBoy.rating} Rating
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 border border-white/10 px-3 py-3">
                <p className="text-[11px] text-slate-400">City</p>
                <p className="text-sm font-semibold text-white mt-1 truncate">
                  {deliveryBoy.city}
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 px-3 py-3">
                <p className="text-[11px] text-slate-400">Deliveries</p>
                <p className="text-sm font-semibold text-white mt-1">
                  {deliveryBoy.totalDeliveries}+
                </p>
              </div>
            </div>

            <div className="relative mt-4 flex items-center gap-2 text-[12px] text-emerald-400">
              <ShieldCheck size={15} />
              <span>Verified Partner Account</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 overflow-y-auto h-[calc(100vh-330px)] custom-scrollbar">
          <div className="mb-3 px-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Main Menu
            </p>
          </div>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={handleClose}
                  className={`
                    group flex items-center justify-between
                    rounded-2xl px-4 py-3.5 transition-all duration-200
                    border
                    ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-400/30 shadow-lg shadow-orange-500/20"
                        : "bg-transparent text-slate-300 border-transparent hover:bg-white/5 hover:text-white hover:border-white/10"
                    }
                  `}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`
                        flex items-center justify-center w-10 h-10 rounded-xl transition
                        ${
                          isActive
                            ? "bg-white/15"
                            : "bg-white/5 group-hover:bg-white/10"
                        }
                      `}
                    >
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {item.name}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    size={17}
                    className={`transition ${
                      isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-40 group-hover:opacity-100 group-hover:translate-x-1"
                    }`}
                  />
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom Logout */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/10 bg-slate-950/90 backdrop-blur-md">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red-500 hover:bg-red-600 active:scale-[0.99] transition-all px-4 py-3.5 font-semibold shadow-lg shadow-red-500/20"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}