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
  Sun,
  Monitor,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [online] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(3);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleProfileSettings = () => {
    setProfileOpen(false);
    navigate("/Admindashboard/profile");
  };

  const handleAccountSettings = () => {
    setProfileOpen(false);
    navigate("/Admindashboard/account-settings");
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "A";

  const formattedLastLogin = lastLogin
    ? new Date(lastLogin).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "First Login";

  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-xl lg:left-72">
      <div className="flex min-h-[76px] items-center justify-between px-4 py-4 md:px-6 xl:px-8">
        {/* LEFT SIDE */}
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            Admin Panel
          </p>
          <h1 className="mt-1 truncate text-xl font-bold text-slate-900 md:text-2xl">
            Welcome, {user?.name || "Admin"}
          </h1>
          <p className="mt-1 text-xs text-slate-500 md:text-sm">
            {new Date().toDateString()}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="ml-4 flex items-center gap-2 md:gap-3 lg:gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900"
            title="Toggle Theme"
          >
            {darkMode ? (
              <Sun size={18} className="transition group-hover:rotate-12" />
            ) : (
              <Moon size={18} className="transition group-hover:-rotate-12" />
            )}
          </button>

          {/* Notifications */}
          <button
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900"
            title="Notifications"
          >
            <Bell size={18} />
            {notifications > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow">
                {notifications}
              </span>
            )}
          </button>

          {/* Website Link */}
          <a
            href="https://37-bites-frontend.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 lg:inline-flex"
          >
            <Globe size={16} />
            View Website
          </a>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm transition hover:bg-slate-50 md:px-3"
            >
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-bold text-white shadow-md">
                  {userInitial}
                </div>

                <span
                  className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                    online ? "bg-green-500" : "bg-slate-400"
                  }`}
                />
              </div>

              <div className="hidden min-w-0 text-left md:block">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {user?.name || "Admin"}
                </p>
                <span className="inline-flex rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-semibold capitalize text-orange-600">
                  {user?.role || "Administrator"}
                </span>
              </div>

              <ChevronDown
                size={16}
                className={`text-slate-500 transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-[320px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl">
                {/* Top Profile Section */}
                <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-5 text-white">
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-500/20 blur-2xl" />

                  <div className="relative flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 text-xl font-bold text-white backdrop-blur-sm">
                      {userInitial}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-lg font-bold">
                        {user?.name || "Admin"}
                      </p>
                      <p className="truncate text-sm text-slate-300">
                        {user?.email || "No Email"}
                      </p>
                      <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
                        <Shield size={12} />
                        {user?.role || "Administrator"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 px-5 py-4">
                  <InfoRow label="Mobile" value={user?.mobile || "Not Available"} />
                  <InfoRow label="Last Login" value={formattedLastLogin} />
                  <InfoRow
                    label="Status"
                    value={
                      <span className="font-semibold text-green-600">Active</span>
                    }
                  />
                  <InfoRow
                    label="Theme"
                    value={
                      <span className="inline-flex items-center gap-1 text-slate-700">
                        <Monitor size={14} />
                        {darkMode ? "Dark Mode" : "Light Mode"}
                      </span>
                    }
                  />
                </div>

                {/* Actions */}
                <div className="border-t border-slate-100 p-3">
                  <button
                    onClick={handleProfileSettings}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <User size={16} />
                    Profile Settings
                  </button>

                  <button
                    onClick={handleAccountSettings}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <Settings size={16} />
                    Account Settings
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="text-right text-sm text-slate-800">{value}</span>
    </div>
  );
}