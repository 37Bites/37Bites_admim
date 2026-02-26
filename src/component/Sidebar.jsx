import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  ClipboardList,
  Store,
  Calculator,
  Users,
  BarChart3,
  Map,
  MessageCircle,
  User,
  Shield,
  Layers,
  FileText,
  Package,
  Sliders,
  Percent,
  CreditCard,
  Truck,
  UserCog,
  Database,
  Megaphone,
  Ticket,
  Gift,
  Wrench
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  const toggle = (name) => {
    setDropdown(dropdown === name ? null : name);
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition
    ${
      isActive
        ? "bg-white text-orange-600 font-semibold"
        : "text-white hover:bg-orange-600/80"
    }`;

  const subLinkClass = ({ isActive }) =>
    `block pl-10 py-1.5 text-sm transition
    ${
      isActive
        ? "text-white font-medium"
        : "text-orange-100 hover:text-white"
    }`;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-orange-500 text-white p-2 rounded-md"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-gradient-to-b
        from-orange-500 via-orange-600 to-orange-700 text-white shadow-xl z-40
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="px-6 py-5 border-b border-orange-400">
          <h1 className="text-xl font-bold">37BITES</h1>
          <p className="text-xs opacity-80">Restaurant Admin</p>
        </div>

        <div className="px-4 py-4 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">

          {/* ================= ORDERS ================= */}
          <div>
            <h2 className="text-xs uppercase text-orange-200 mb-3 font-semibold">
              Orders
            </h2>

            <NavLink to="/dashboard" className={linkClass}>
              <LayoutDashboard size={16} /> Dashboard
            </NavLink>

            <NavLink to="/orders" className={linkClass}>
              <ClipboardList size={16} /> Orders
            </NavLink>

            <NavLink to="/stores" className={linkClass}>
              <Store size={16} /> Stores
            </NavLink>

            <NavLink to="/accounting" className={linkClass}>
              <Calculator size={16} /> Accounting
            </NavLink>

            <NavLink to="/customers" className={linkClass}>
              <Users size={16} /> Customers
            </NavLink>

            {/* Reports Dropdown */}
            <button
              onClick={() => toggle("reports")}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg hover:bg-orange-600/80"
            >
              <span className="flex items-center gap-3">
                <BarChart3 size={16} /> Reports
              </span>
              {dropdown === "reports" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {dropdown === "reports" && (
              <>
                <NavLink to="/product-reviews" className={subLinkClass}>
                  • Product Reviews
                </NavLink>
                <NavLink to="/product-performance" className={subLinkClass}>
                  • Product Performance Reports
                </NavLink>
              </>
            )}

            <NavLink to="/admin-service-area" className={linkClass}>
              <Map size={16} /> Admin Service Area
            </NavLink>

            {/* Chat Dropdown */}
            <button
              onClick={() => toggle("chat")}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg hover:bg-orange-600/80"
            >
              <span className="flex items-center gap-3">
                <MessageCircle size={16} /> Chat
              </span>
              {dropdown === "chat" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {dropdown === "chat" && (
              <>
                <NavLink to="/chat-user-vendor" className={subLinkClass}>
                  • User / Vendor
                </NavLink>
                <NavLink to="/chat-user-driver" className={subLinkClass}>
                  • User / Driver
                </NavLink>
              </>
            )}
          </div>

          {/* ================= SETTINGS ================= */}
          <div>
            <h2 className="text-xs uppercase text-orange-200 mb-3 font-semibold">
              Settings
            </h2>

            <NavLink to="/profile" className={linkClass}>
              <User size={16} /> Profile
            </NavLink>

            <NavLink to="/security" className={linkClass}>
              <Shield size={16} /> Security
            </NavLink>

            {/* Styling Dropdown */}
            <button
              onClick={() => toggle("styling")}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg hover:bg-orange-600/80"
            >
              <span className="flex items-center gap-3">
                <Layers size={16} /> Styling
              </span>
              {dropdown === "styling" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {dropdown === "styling" && (
              <>
                <NavLink to="/app-styling" className={subLinkClass}>
                  • App Styling
                </NavLink>
                <NavLink to="/web-styling" className={subLinkClass}>
                  • Web Styling
                </NavLink>
              </>
            )}

            {/* CMS Dropdown */}
            <button
              onClick={() => toggle("cms")}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg hover:bg-orange-600/80"
            >
              <span className="flex items-center gap-3">
                <FileText size={16} /> CMS
              </span>
              {dropdown === "cms" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {dropdown === "cms" && (
              <>
                <NavLink to="/pages" className={subLinkClass}>• Pages</NavLink>
                <NavLink to="/emails" className={subLinkClass}>• Emails</NavLink>
                <NavLink to="/notifications" className={subLinkClass}>• Notifications</NavLink>
                <NavLink to="/sms" className={subLinkClass}>• SMS</NavLink>
                <NavLink to="/reasons" className={subLinkClass}>• Reasons</NavLink>
              </>
            )}

            {/* Manage Delivery Dropdown */}
            <button
              onClick={() => toggle("delivery")}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg hover:bg-orange-600/80"
            >
              <span className="flex items-center gap-3">
                <Truck size={16} /> Manage Delivery
              </span>
              {dropdown === "delivery" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {dropdown === "delivery" && (
              <>
                <NavLink to="/delivery-options" className={subLinkClass}>
                  • Delivery Options
                </NavLink>
                <NavLink to="/delivery-slot" className={subLinkClass}>
                  • Delivery Slot
                </NavLink>
              </>
            )}
          </div>

          {/* ================= MARKETING ================= */}
          <div>
            <h2 className="text-xs uppercase text-orange-200 mb-3 font-semibold">
              Marketing
            </h2>

            {/* Banners Dropdown */}
            <button
              onClick={() => toggle("banners")}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg hover:bg-orange-600/80"
            >
              <span className="flex items-center gap-3">
                <Megaphone size={16} /> Banners
              </span>
              {dropdown === "banners" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {dropdown === "banners" && (
              <>
                <NavLink to="/web-banners" className={subLinkClass}>
                  • Web Banners
                </NavLink>
                <NavLink to="/mobile-banners" className={subLinkClass}>
                  • Mobile Banners
                </NavLink>
              </>
            )}

            <NavLink to="/promocode" className={linkClass}>
              <Ticket size={16} /> Promocode
            </NavLink>

            <NavLink to="/loyalty-cards" className={linkClass}>
              <Gift size={16} /> Loyalty Cards
            </NavLink>

            <NavLink to="/campaigns" className={linkClass}>
              <BarChart3 size={16} /> Campaigns
            </NavLink>
          </div>

          {/* ================= EXTRA ================= */}
          <div>
            <h2 className="text-xs uppercase text-orange-200 mb-3 font-semibold">
              Extra
            </h2>

            <NavLink to="/tools" className={linkClass}>
              <Wrench size={16} /> Tools
            </NavLink>

            <NavLink to="/db-audit-logs" className={linkClass}>
              <Database size={16} /> DB Audit Logs
            </NavLink>
          </div>

        </div>
      </div>
    </>
  );
}