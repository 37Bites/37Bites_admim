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
  Wrench,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  const toggle = (name) => {
    setDropdown(dropdown === name ? null : name);
  };

  const closeSidebar = () => setOpen(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition ${
      isActive
        ? "bg-white text-orange-600 font-semibold"
        : "text-white hover:bg-orange-600/80"
    }`;

  const subLinkClass = ({ isActive }) =>
    `block pl-10 py-1.5 text-sm transition ${
      isActive
        ? "text-white font-medium"
        : "text-orange-100 hover:text-white"
    }`;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-orange-500 text-white p-2 rounded-md shadow-lg"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-gradient-to-b
        from-orange-500 via-orange-600 to-orange-700 text-white shadow-xl z-40
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center justify-center py-6 border-b border-white/10">
          <img
            src="/logo.jpeg"
            alt="37BITES Logo"
            className="w-12 h-12 object-contain rounded-xl bg-white p-1"
          />
          {/* <p className="mt-2 text-sm font-semibold text-white">Restaurant Admin</p> */}
        </div>

        <div className="px-4 py-4 space-y-6 overflow-y-auto no-scrollbar h-[calc(100vh-88px)]">
          {/* ================= ORDERS ================= */}
          <div>
            <h2 className="text-xs uppercase text-orange-200 mb-3 font-semibold">
              Orders
            </h2>

            <NavLink to="/Admindashboard" className={linkClass} onClick={closeSidebar}>
              <LayoutDashboard size={16} /> Dashboard
            </NavLink>

            <NavLink
              to="/Admindashboard/orders"
              className={linkClass}
              onClick={closeSidebar}
            >
              <ClipboardList size={16} /> Orders
            </NavLink>

            <NavLink
              to="/Admindashboard/stores"
              className={linkClass}
              onClick={closeSidebar}
            >
              <Store size={16} /> Stores
            </NavLink>

            <NavLink
              to="/Admindashboard/accounting"
              className={linkClass}
              onClick={closeSidebar}
            >
              <Calculator size={16} /> Accounting
            </NavLink>

            <NavLink
              to="/Admindashboard/customers"
              className={linkClass}
              onClick={closeSidebar}
            >
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
                <NavLink
                  to="/Admindashboard/product-reviews"
                  className={subLinkClass}
                  onClick={closeSidebar}
                >
                  • Product Reviews
                </NavLink>
                <NavLink
                  to="/Admindashboard/product-performance"
                  className={subLinkClass}
                  onClick={closeSidebar}
                >
                  • Product Performance Reports
                </NavLink>
              </>
            )}

            <NavLink
              to="/Admindashboard/admin-service-area"
              className={linkClass}
              onClick={closeSidebar}
            >
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
                <NavLink
                  to="/Admindashboard/chat-user-vendor"
                  className={subLinkClass}
                  onClick={closeSidebar}
                >
                  • User / Vendor
                </NavLink>
                <NavLink
                  to="/Admindashboard/chat-user-driver"
                  className={subLinkClass}
                  onClick={closeSidebar}
                >
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

            <NavLink
              to="/Admindashboard/profile"
              className={linkClass}
              onClick={closeSidebar}
            >
              <User size={16} /> Profile
            </NavLink>

            <NavLink
              to="/Admindashboard/accounting-security"
              className={linkClass}
              onClick={closeSidebar}
            >
              <Shield size={16} /> Accounting Security
            </NavLink>

            <NavLink
              to="/Admindashboard/customize"
              className={linkClass}
              onClick={closeSidebar}
            >
              <Sliders size={16} /> Customize
            </NavLink>

            <NavLink
              to="/Admindashboard/catalog"
              className={linkClass}
              onClick={closeSidebar}
            >
              <Package size={16} /> Catalog
            </NavLink>

            <NavLink
              to="/Admindashboard/configurations"
              className={linkClass}
              onClick={closeSidebar}
            >
              <Layers size={16} /> Configurations
            </NavLink>

            <NavLink
              to="/Admindashboard/tax"
              className={linkClass}
              onClick={closeSidebar}
            >
              <Percent size={16} /> Tax
            </NavLink>

            <NavLink
              to="/Admindashboard/payment-options"
              className={linkClass}
              onClick={closeSidebar}
            >
              <CreditCard size={16} /> Payment Options
            </NavLink>

            <NavLink
              to="/Admindashboard/manage-roles"
              className={linkClass}
              onClick={closeSidebar}
            >
              <UserCog size={16} /> Manage Roles
            </NavLink>

            <NavLink
              to="/Admindashboard/cache-control"
              className={linkClass}
              onClick={closeSidebar}
            >
              <Database size={16} /> Cache Control
            </NavLink>

            {/* Styling Dropdown */}
            <button
              onClick={() => toggle("styling")}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg hover:bg-orange-600/80"
            >
              <span className="flex items-center gap-3">
                <Layers size={16} /> Styling
              </span>
              {dropdown === "styling" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {dropdown === "styling" && (
              <>
                <NavLink
                  to="/Admindashboard/app-styling"
                  className={subLinkClass}
                  onClick={closeSidebar}
                >
                  • App Styling
                </NavLink>
                <NavLink
                  to="/Admindashboard/web-styling"
                  className={subLinkClass}
                  onClick={closeSidebar}
                >
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
              {dropdown === "cms" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {dropdown === "cms" && (
              <>
                <NavLink
                  to="/Admindashboard/pages"
                  className={subLinkClass}
                  onClick={closeSidebar}
                >
                  • Pages
                </NavLink>
                <NavLink
                  to="/Admindashboard/emails"
                  className={subLinkClass}
                  onClick={closeSidebar}
                >
                  • Emails
                </NavLink>
                <NavLink
                  to="/Admindashboard/notifications"
                  className={subLinkClass}
                  onClick={closeSidebar}
                >
                  • Notifications
                </NavLink>
                <NavLink
                  to="/Admindashboard/sms"
                  className={subLinkClass}
                  onClick={closeSidebar}
                >
                  • SMS
                </NavLink>
                <NavLink
                  to="/Admindashboard/reasons"
                  className={subLinkClass}
                  onClick={closeSidebar}
                >
                  • Reasons
                </NavLink>
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
              {dropdown === "delivery" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {dropdown === "delivery" && (
              <>
                <NavLink
                  to="/Admindashboard/delivery-options"
                  className={subLinkClass}
                  onClick={closeSidebar}
                >
                  • Delivery Options
                </NavLink>
                <NavLink
                  to="/Admindashboard/delivery-slot"
                  className={subLinkClass}
                  onClick={closeSidebar}
                >
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
              {dropdown === "banners" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {dropdown === "banners" && (
              <>
                <NavLink
                  to="/Admindashboard/web-banners"
                  className={subLinkClass}
                  onClick={closeSidebar}
                >
                  • Web Banners
                </NavLink>
                <NavLink
                  to="/Admindashboard/mobile-banners"
                  className={subLinkClass}
                  onClick={closeSidebar}
                >
                  • Mobile Banners
                </NavLink>
              </>
            )}

            <NavLink
              to="/Admindashboard/promocode"
              className={linkClass}
              onClick={closeSidebar}
            >
              <Ticket size={16} /> Promocode
            </NavLink>

            <NavLink
              to="/Admindashboard/loyalty-cards"
              className={linkClass}
              onClick={closeSidebar}
            >
              <Gift size={16} /> Loyalty Cards
            </NavLink>

            <NavLink
              to="/Admindashboard/campaigns"
              className={linkClass}
              onClick={closeSidebar}
            >
              <BarChart3 size={16} /> Campaigns
            </NavLink>
          </div>

          {/* ================= EXTRA ================= */}
          <div>
            <h2 className="text-xs uppercase text-orange-200 mb-3 font-semibold">
              Extra
            </h2>

            <NavLink
              to="/Admindashboard/tools"
              className={linkClass}
              onClick={closeSidebar}
            >
              <Wrench size={16} /> Tools
            </NavLink>

            <NavLink
              to="/Admindashboard/db-audit-logs"
              className={linkClass}
              onClick={closeSidebar}
            >
              <Database size={16} /> DB Audit Logs
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}