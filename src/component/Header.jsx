import React, { useEffect, useRef, useState } from "react";
import {
  Globe,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Shield,
  Bell,
  Menu,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Header({
  onMenuClick,
  collapsed = false,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications] = useState(3);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const { user, isAuthenticated, lastLogin } = useSelector(
    (state) => state.auth
  );

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
    navigate("/secure-admin-login");
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "A";

  const profileImage =
    user?.profileImage?.url || user?.profilePhoto?.url || user?.avatar || "";

  const formattedLastLogin = lastLogin
    ? new Date(lastLogin).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "First Login";

  return (
    <header
      className={`fixed top-0 right-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-md transition-all duration-300 ${
        collapsed ? "lg:left-24" : "lg:left-72"
      } left-0`}
    >
      <div className="flex min-h-[70px] items-center justify-between gap-3 px-3 py-3 sm:px-4 md:px-6 lg:px-8">
        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl p-2 text-gray-600 transition hover:bg-gray-100 lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold text-gray-800 sm:text-base md:text-xl lg:text-2xl">
              Welcome, {isAuthenticated ? user?.name || "Admin" : "Guest"}
            </h1>
            <p className="truncate text-[10px] text-gray-500 sm:text-xs">
              Last Login: {formattedLastLogin}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3 lg:gap-5">
          {/* Notifications */}
          <button
            type="button"
            className="relative rounded-xl p-2 text-gray-600 transition hover:bg-gray-100"
          >
            <Bell size={18} />
            {notifications > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                {notifications}
              </span>
            )}
          </button>

          {/* Website Link */}
          <div className="hidden items-center gap-2 text-sm text-gray-600 xl:flex">
            <Globe size={16} />
            <a
              href="https://37-bites-frontend.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-orange-500"
            >
              View Website
            </a>
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-2xl px-1 py-1 transition hover:bg-gray-50 sm:px-2"
            >
              <div className="relative">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={user?.name || "Admin"}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-orange-100 sm:h-10 sm:w-10"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white sm:h-10 sm:w-10">
                    {userInitial}
                  </div>
                )}

                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                    isAuthenticated ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>

              <div className="hidden text-left lg:block">
                <p className="max-w-[140px] truncate text-sm font-medium text-gray-800">
                  {user?.name || "Admin"}
                </p>
                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs capitalize text-orange-600">
                  {user?.role || "Administrator"}
                </span>
              </div>

              <ChevronDown
                size={16}
                className={`hidden text-gray-600 transition-transform sm:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-[290px] max-w-[calc(100vw-20px)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:w-80">
                {/* User Info */}
                <div className="border-b border-gray-200 px-4 py-4 sm:px-5">
                  <div className="mb-4 flex items-center gap-3">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt={user?.name || "Admin"}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-orange-100 sm:h-14 sm:w-14"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-base font-bold text-white sm:h-14 sm:w-14 sm:text-lg">
                        {userInitial}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-gray-800">
                        {user?.name || "Admin"}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {user?.email || "No Email"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="break-words">
                      📱 {user?.mobile || "Not Available"}
                    </p>
                    <p className="break-words">
                      🕒 Last Login: {formattedLastLogin}
                    </p>
                    <p className="flex items-center gap-2 break-words">
                      <Shield size={14} />
                      Role: {user?.role || "Administrator"}
                    </p>
                    <p>
                      Status:{" "}
                      <span
                        className={`font-medium ${
                          isAuthenticated ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {isAuthenticated ? "Active" : "Logged Out"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="py-2">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/Admindashboard/profile");
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-50 sm:px-5"
                  >
                    <User size={16} />
                    Profile Settings
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/admin/settings");
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-50 sm:px-5"
                  >
                    <Settings size={16} />
                    Account Settings
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 transition hover:bg-red-50 sm:px-5"
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