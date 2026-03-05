import React, { useState, useEffect, useRef } from "react";
import {
  Globe,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Shield,
  Bell,
  Moon,
  Sun
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [online, setOnline] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(3); // dummy unread count

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const { user, lastLogin } = useSelector((state) => state.auth);

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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "A";

  // Format last login
  const formattedLastLogin = lastLogin
    ? new Date(lastLogin).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      })
    : "First Login";

  return (
    <div className="fixed top-0 left-72 right-0 bg-white/90 backdrop-blur border-b px-8 py-4 flex items-center justify-between z-40">

      {/* LEFT SIDE */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome,{user?.name || "Admin"}
        </h1>
        <p className="text-xs text-gray-400">
          {new Date().toDateString()}
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell size={18} />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {notifications}
            </span>
          )}
        </div>

        {/* Website link */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
          <Globe size={16} />
          <a
            href="https://37-bites-frontend.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500 transition"
          >
            View Website
          </a>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3"
          >
            {/* Avatar with online dot */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
                {userInitial}
              </div>

              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  online ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            </div>

            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-800">
                {user?.name || "Admin"}
              </p>
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full capitalize">
                {user?.role || "Administrator"}
              </span>
            </div>

            <ChevronDown
              size={16}
              className={`transition-transform ${profileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border py-4 z-50 animate-fadeIn">

              {/* User Info */}
              <div className="px-6 pb-4 border-b">

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold">
                    {userInitial}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 text-lg">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email || "No Email"}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>📱 {user?.mobile || "Not Available"}</p>
                  <p>🕒 Last Login: {formattedLastLogin}</p>
                  <p className="flex items-center gap-1">
                    <Shield size={14} />
                    Role: {user?.role || "Administrator"}
                  </p>
                  <p>Status: <span className="text-green-600 font-medium">Active</span></p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-3">
                <button className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 w-full text-sm transition">
                  <User size={16} /> Profile Settings
                </button>

                <button className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 w-full text-sm transition">
                  <Settings size={16} /> Account Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-6 py-3 hover:bg-red-50 w-full text-sm text-red-500 transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}