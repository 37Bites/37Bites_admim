import React, { useState } from "react";
import {
  Bell,
  Search,
  User,
  Menu,
  Sun,
  Moon,
  MapPin,
} from "lucide-react";

export default function DeliveryHeader({ onMenuClick }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 h-16 bg-white border-b border-gray-200 shadow-sm px-4 md:px-6 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-lg md:text-xl font-bold text-gray-800">
            Delivery Panel
          </h1>
          <p className="text-xs text-gray-500 hidden sm:block">
            Manage deliveries, earnings and orders
          </p>
        </div>
      </div>

      {/* Center Search */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-3 py-2 w-[320px] lg:w-[420px]">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search orders, customer, location..."
          className="bg-transparent outline-none border-none ml-2 w-full text-sm text-gray-700 placeholder:text-gray-400"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl hover:bg-gray-100 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
          <MapPin size={16} className="text-green-600" />
          <span className="text-sm text-gray-700">Online</span>
        </div>

        <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-2 md:px-3 py-2">
          <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
            D
          </div>
          <div className="hidden md:block leading-tight">
            <p className="text-sm font-semibold text-gray-800">Delivery Boy</p>
            <p className="text-xs text-gray-500">del@example.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}