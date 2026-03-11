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
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export default function Sidebar({ collapsed = false, setCollapsed = () => {} }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  const isCollapsed = collapsed;

  const toggleDropdown = (name) => {
    if (isCollapsed) return;
    setDropdown(dropdown === name ? null : name);
  };

  const closeMobileSidebar = () => setMobileOpen(false);

  const linkClass = ({ isActive }) =>
    `group relative flex items-center ${
      isCollapsed ? "justify-center px-2" : "gap-3 px-4"
    } py-3 rounded-2xl text-sm transition-all duration-200 ${
      isActive
        ? "bg-white text-orange-600 font-semibold shadow-md"
        : "text-white/90 hover:bg-white/10 hover:text-white"
    }`;

  const subLinkClass = ({ isActive }) =>
    `block rounded-xl ${isCollapsed ? "px-2 text-center" : "pl-11 pr-3"} py-2 text-sm transition ${
      isActive
        ? "bg-white/10 text-white font-medium"
        : "text-orange-100 hover:bg-white/5 hover:text-white"
    }`;

  const sectionTitleClass = `mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-200/80 ${
    isCollapsed ? "text-center" : ""
  }`;

  const menuSections = [
    {
      title: "Orders",
      items: [
        {
          type: "link",
          to: "/Admindashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
          end: true,
        },
        {
          type: "link",
          to: "/Admindashboard/orders",
          label: "Orders",
          icon: ClipboardList,
        },
        {
          type: "link",
          to: "/Admindashboard/stores",
          label: "Stores",
          icon: Store,
        },
        {
          type: "link",
          to: "/Admindashboard/accounting",
          label: "Accounting",
          icon: Calculator,
        },
        {
          type: "link",
          to: "/Admindashboard/customers",
          label: "Customers",
          icon: Users,
        },
        {
          type: "link",
          to: "/Admindashboard/delivery-partners",
          label: "Delivery Partners",
          icon: Truck,
        },
        {
          type: "link",
          to: "/Admindashboard/restaurant-users",
          label: "All Restaurants",
          icon: Store,
        },
        {
          type: "dropdown",
          key: "reports",
          label: "Reports",
          icon: BarChart3,
          children: [
            {
              to: "/Admindashboard/product-reviews",
              label: "Product Reviews",
            },
            {
              to: "/Admindashboard/product-performance",
              label: "Product Performance Reports",
            },
          ],
        },
        {
          type: "link",
          to: "/Admindashboard/admin-service-area",
          label: "Admin Service Area",
          icon: Map,
        },
        {
          type: "dropdown",
          key: "chat",
          label: "Chat",
          icon: MessageCircle,
          children: [
            {
              to: "/Admindashboard/chat-user-vendor",
              label: "User / Vendor",
            },
            {
              to: "/Admindashboard/chat-user-driver",
              label: "User / Driver",
            },
          ],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          type: "link",
          to: "/Admindashboard/profile",
          label: "Profile",
          icon: User,
        },
        {
          type: "link",
          to: "/Admindashboard/accounting-security",
          label: "Accounting Security",
          icon: Shield,
        },
        {
          type: "link",
          to: "/Admindashboard/customize",
          label: "Customize",
          icon: Sliders,
        },
        {
          type: "link",
          to: "/Admindashboard/catalog",
          label: "Catalog",
          icon: Package,
        },
        {
          type: "link",
          to: "/Admindashboard/configurations",
          label: "Configurations",
          icon: Layers,
        },
        {
          type: "link",
          to: "/Admindashboard/tax",
          label: "Tax",
          icon: Percent,
        },
        {
          type: "link",
          to: "/Admindashboard/payment-options",
          label: "Payment Options",
          icon: CreditCard,
        },
        {
          type: "link",
          to: "/Admindashboard/manage-roles",
          label: "Manage Roles",
          icon: UserCog,
        },
        {
          type: "link",
          to: "/Admindashboard/cache-control",
          label: "Cache Control",
          icon: Database,
        },
        {
          type: "dropdown",
          key: "styling",
          label: "Styling",
          icon: Layers,
          children: [
            {
              to: "/Admindashboard/app-styling",
              label: "App Styling",
            },
            {
              to: "/Admindashboard/web-styling",
              label: "Web Styling",
            },
          ],
        },
        {
          type: "dropdown",
          key: "cms",
          label: "CMS",
          icon: FileText,
          children: [
            { to: "/Admindashboard/pages", label: "Pages" },
            { to: "/Admindashboard/emails", label: "Emails" },
            { to: "/Admindashboard/notifications", label: "Notifications" },
            { to: "/Admindashboard/sms", label: "SMS" },
            { to: "/Admindashboard/reasons", label: "Reasons" },
          ],
        },
        {
          type: "dropdown",
          key: "delivery",
          label: "Manage Delivery",
          icon: Truck,
          children: [
            {
              to: "/Admindashboard/delivery-options",
              label: "Delivery Options",
            },
            {
              to: "/Admindashboard/delivery-slot",
              label: "Delivery Slot",
            },
          ],
        },
      ],
    },
    {
      title: "Marketing",
      items: [
        {
          type: "dropdown",
          key: "banners",
          label: "Banners",
          icon: Megaphone,
          children: [
            { to: "/Admindashboard/web-banners", label: "Web Banners" },
            { to: "/Admindashboard/mobile-banners", label: "Mobile Banners" },
          ],
        },
        {
          type: "link",
          to: "/Admindashboard/promocode",
          label: "Promocode",
          icon: Ticket,
        },
        {
          type: "link",
          to: "/Admindashboard/loyalty-cards",
          label: "Loyalty Cards",
          icon: Gift,
        },
        {
          type: "link",
          to: "/Admindashboard/campaigns",
          label: "Campaigns",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Extra",
      items: [
        {
          type: "link",
          to: "/Admindashboard/tools",
          label: "Tools",
          icon: Wrench,
        },
        {
          type: "link",
          to: "/Admindashboard/db-audit-logs",
          label: "DB Audit Logs",
          icon: Database,
        },
      ],
    },
  ];

  const renderTooltip = (label) => {
    if (!isCollapsed) return null;

    return (
      <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-50 hidden -translate-y-1/2 whitespace-nowrap rounded-xl bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-xl group-hover:block">
        {label}
      </span>
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-xl bg-orange-500 p-2.5 text-white shadow-lg lg:hidden"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px] lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-screen ${
          isCollapsed ? "w-24" : "w-72"
        } transform overflow-hidden border-r border-white/10 bg-gradient-to-b from-orange-500 via-orange-600 to-orange-700 text-white shadow-2xl transition-all duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Top */}
        <div
          className={`flex items-center border-b border-white/10 ${
            isCollapsed ? "justify-center px-3 py-5" : "justify-between px-4 py-5"
          }`}
        >
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-1 shadow-md">
              <img
                src="/logo.jpeg"
                alt="37BITES Logo"
                className="h-10 w-10 rounded-xl object-contain"
              />
            </div>

            {!isCollapsed && (
              <div>
                <h2 className="text-base font-bold tracking-wide text-white">
                  37BITES
                </h2>
                <p className="text-xs text-orange-100">Admin Panel</p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="hidden rounded-xl border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20 lg:flex"
            >
              <PanelLeftClose size={18} />
            </button>
          )}
        </div>

        {/* Expand button in collapsed mode */}
        {isCollapsed && (
          <div className="hidden border-b border-white/10 px-3 py-3 lg:block">
            <button
              onClick={() => setCollapsed(false)}
              className="flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20"
            >
              <PanelLeftOpen size={18} />
            </button>
          </div>
        )}

        {/* Content */}
        <div
          className={`no-scrollbar h-[calc(100vh-89px)] overflow-y-auto ${
            isCollapsed ? "px-3 py-4" : "px-4 py-4"
          }`}
        >
          <div className="space-y-6">
            {menuSections.map((section) => (
              <div key={section.title}>
                <h2 className={sectionTitleClass}>
                  {isCollapsed ? section.title.slice(0, 1) : section.title}
                </h2>

                <div className="space-y-2">
                  {section.items.map((item) => {
                    if (item.type === "link") {
                      const Icon = item.icon;

                      return (
                        <NavLink
                          key={item.to}
                          end={item.end}
                          to={item.to}
                          className={linkClass}
                          onClick={closeMobileSidebar}
                        >
                          <Icon size={18} className="shrink-0" />
                          {!isCollapsed && <span>{item.label}</span>}
                          {renderTooltip(item.label)}
                        </NavLink>
                      );
                    }

                    const Icon = item.icon;
                    const isOpen = dropdown === item.key;

                    return (
                      <div key={item.key} className="group relative">
                        <button
                          onClick={() => toggleDropdown(item.key)}
                          className={`flex w-full items-center ${
                            isCollapsed ? "justify-center px-2" : "justify-between px-4"
                          } rounded-2xl py-3 text-sm text-white/90 transition hover:bg-white/10 hover:text-white`}
                        >
                          <span
                            className={`flex items-center ${
                              isCollapsed ? "justify-center" : "gap-3"
                            }`}
                          >
                            <Icon size={18} className="shrink-0" />
                            {!isCollapsed && <span>{item.label}</span>}
                          </span>

                          {!isCollapsed &&
                            (isOpen ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            ))}
                        </button>

                        {renderTooltip(item.label)}

                        {!isCollapsed && isOpen && (
                          <div className="mt-2 space-y-1">
                            {item.children.map((child) => (
                              <NavLink
                                key={child.to}
                                to={child.to}
                                className={subLinkClass}
                                onClick={closeMobileSidebar}
                              >
                                • {child.label}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}