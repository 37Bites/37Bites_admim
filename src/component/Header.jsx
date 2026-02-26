import React, { useState, useEffect, useRef } from "react";
import {
  Globe,
  User,
  LogOut,
  Settings,
  ChevronDown
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function AdminHeader({ title = "Dashboard" }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [online, setOnline] = useState(true);

  const dispatch = useDispatch();
  const profileRef = useRef(null);

  /* Close on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-72 right-0 bg-white shadow-sm px-6 py-4 flex items-center justify-between z-40">

      {/* LEFT SIDE */}
      <h1 className="text-xl font-semibold text-gray-700 uppercase tracking-wide">
        {title}
      </h1>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* Online Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {online ? "Online" : "Offline"}
          </span>

          <button
            onClick={() => setOnline(!online)}
            className={`w-10 h-5 flex items-center rounded-full p-1 transition duration-300 ${
              online ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
                online ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Website */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
          <Globe size={16} />
          <span>37Bites.com</span>
          <a
            href="#"
            className="text-blue-500 hover:underline"
          >
            View Website
          </a>
        </div>

        {/* Language */}
        <select className="text-sm border border-gray-300 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-blue-400">
          <option>English</option>
        </select>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-black"
          >
            <User size={18} />
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-44 bg-white border rounded-lg shadow-lg py-2 z-50">

              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm">
                <User size={16} /> Profile
              </button>

              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm">
                <Settings size={16} /> Change Password
              </button>

              <button
                onClick={() => dispatch(logout())}
                className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 w-full text-sm text-red-500"
              >
                <LogOut size={16} /> Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}