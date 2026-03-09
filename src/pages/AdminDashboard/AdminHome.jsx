import React, { useEffect, useState } from "react";
import {
  Store,
  ShoppingBag,
  Clock,
  CheckCircle,
  TrendingUp,
  User,
  PlusCircle,
  AlertCircle,
  Utensils,
  Activity,
  Search,
  Filter,
  ArrowUpRight,
  MapPin,
  Bike,
  IndianRupee,
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminHome() {
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [ordersChart, setOrdersChart] = useState([]);
  const [growthChart, setGrowthChart] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);

  const [stats, setStats] = useState({
    totalRestaurants: 0,
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    todayOrders: 0,
    revenue: 0,
  });

  useEffect(() => {
    const restaurantData = [
      { _id: "1", name: "Burger Hub", status: "approved", isOpen: true },
      { _id: "2", name: "Pizza Palace", status: "approved", isOpen: false },
      { _id: "3", name: "Royal Biryani", status: "pending", isOpen: false },
      { _id: "4", name: "Street Momos", status: "pending", isOpen: false },
      { _id: "5", name: "Tandoori Nights", status: "approved", isOpen: true },
    ];

    setRestaurants(restaurantData);

    setStats({
      totalRestaurants: restaurantData.length,
      totalOrders: 3480,
      completedOrders: 3100,
      pendingOrders: 380,
      todayOrders: 92,
      revenue: 128450,
    });

    setOrdersChart([
      { day: "Mon", orders: 40 },
      { day: "Tue", orders: 55 },
      { day: "Wed", orders: 70 },
      { day: "Thu", orders: 50 },
      { day: "Fri", orders: 90 },
      { day: "Sat", orders: 120 },
      { day: "Sun", orders: 95 },
    ]);

    setGrowthChart([
      { month: "Jan", restaurants: 10 },
      { month: "Feb", restaurants: 18 },
      { month: "Mar", restaurants: 25 },
      { month: "Apr", restaurants: 31 },
      { month: "May", restaurants: 40 },
      { month: "Jun", restaurants: 55 },
    ]);

    setOrders([
      {
        id: "ORD1001",
        restaurant: "Burger Hub",
        customer: "Rahul Sharma",
        deliveryBoy: "Amit",
        location: "Raipur",
        amount: 420,
        status: "Preparing",
      },
      {
        id: "ORD1002",
        restaurant: "Pizza Palace",
        customer: "Sneha",
        deliveryBoy: "Rohit",
        location: "Bilaspur",
        amount: 650,
        status: "Out for Delivery",
      },
      {
        id: "ORD1003",
        restaurant: "Royal Biryani",
        customer: "Vikas",
        deliveryBoy: "Sanjay",
        location: "Durg",
        amount: 320,
        status: "Delivered",
      },
      {
        id: "ORD1004",
        restaurant: "Street Momos",
        customer: "Ankit",
        deliveryBoy: "Ravi",
        location: "Raipur",
        amount: 210,
        status: "Preparing",
      },
    ]);

    setTopRestaurants([
      { name: "Burger Hub", orders: 540, revenue: 82000 },
      { name: "Pizza Palace", orders: 430, revenue: 76000 },
      { name: "Royal Biryani", orders: 390, revenue: 69000 },
      { name: "Street Momos", orders: 300, revenue: 42000 },
    ]);
  }, []);

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    const matchSearch =
      order.restaurant.toLowerCase().includes(searchText) ||
      order.customer.toLowerCase().includes(searchText) ||
      order.deliveryBoy.toLowerCase().includes(searchText) ||
      order.id.toLowerCase().includes(searchText);

    const matchStatus = statusFilter === "all" || order.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const pendingRestaurants = restaurants.filter((r) => r.status === "pending");
  const activeRestaurants = restaurants.filter((r) => r.status === "approved");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-4 md:p-6 xl:p-8">
      <div className="mx-auto max-w-7xl space-y-6 md:space-y-8">
        {/* HERO HEADER */}
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-5 text-white shadow-2xl md:rounded-[32px] md:p-8">
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-20 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm text-slate-300">Admin Overview</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Platform Dashboard
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Monitor restaurants, orders, live delivery flow, platform
                performance, and revenue in one premium control center.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-auto">
              <HeroMiniCard
                label="Growth"
                value="+14%"
                icon={<TrendingUp size={18} />}
              />
              <HeroMiniCard
                label="Today Orders"
                value={stats.todayOrders}
                icon={<ShoppingBag size={18} />}
              />
              <HeroMiniCard
                label="Revenue"
                value={`₹${stats.revenue}`}
                icon={<IndianRupee size={18} />}
              />
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Restaurants"
            value={stats.totalRestaurants}
            sub="All registered stores"
            icon={<Store className="text-slate-700" />}
            iconBg="bg-slate-100"
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            sub="Overall platform orders"
            icon={<ShoppingBag className="text-indigo-600" />}
            iconBg="bg-indigo-100"
          />
          <StatCard
            title="Completed Orders"
            value={stats.completedOrders}
            sub="Successfully delivered"
            icon={<CheckCircle className="text-green-600" />}
            iconBg="bg-green-100"
          />
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders}
            sub="Need attention"
            icon={<Clock className="text-orange-600" />}
            iconBg="bg-orange-100"
          />
        </div>

        {/* HIGHLIGHT CARDS */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <HighlightCard
            title="Today's Orders"
            value={stats.todayOrders}
            subtitle="Live active orders updated across the platform"
            gradient="from-emerald-600 via-emerald-500 to-teal-500"
            icon={<ShoppingBag size={22} />}
          />
          <HighlightCard
            title="Monthly Revenue"
            value={`₹${stats.revenue}`}
            subtitle="Revenue generated from all platform activity"
            gradient="from-indigo-600 via-violet-600 to-purple-600"
            icon={<TrendingUp size={22} />}
          />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-lg md:rounded-[28px] md:p-5">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">Weekly Trend</p>
                <h3 className="text-lg font-bold text-slate-900">
                  Orders Analytics
                </h3>
              </div>
              <div className="w-fit rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-600">
                Live Data
              </div>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={ordersChart}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-lg md:rounded-[28px] md:p-5">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">Platform Expansion</p>
                <h3 className="text-lg font-bold text-slate-900">
                  Restaurant Growth
                </h3>
              </div>
              <div className="w-fit rounded-2xl bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600">
                6 Months
              </div>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={growthChart}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="restaurants"
                  fill="#6366f1"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP RESTAURANTS */}
        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-lg md:rounded-[28px] md:p-5">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Leaderboard</p>
              <h3 className="text-xl font-bold text-slate-900">
                Top Selling Restaurants
              </h3>
            </div>
            <button className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              View All
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {topRestaurants.map((r, i) => (
              <div
                key={i}
                className="rounded-[22px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 transition hover:-translate-y-1 hover:shadow-md md:rounded-[24px]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                    <Utensils size={20} />
                  </div>
                  <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
                    #{i + 1}
                  </span>
                </div>

                <h4 className="mt-4 text-base font-bold text-slate-900">
                  {r.name}
                </h4>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Orders</span>
                    <span className="font-semibold text-slate-800">
                      {r.orders}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Revenue</span>
                    <span className="font-semibold text-slate-800">
                      ₹{r.revenue}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <InfoPanel
            title="Pending Approvals"
            icon={<AlertCircle className="h-5 w-5 text-orange-500" />}
          >
            <div className="space-y-3">
              {pendingRestaurants.length > 0 ? (
                pendingRestaurants.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3"
                  >
                    <span className="font-medium text-slate-800">
                      {item.name}
                    </span>
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                      Pending
                    </span>
                  </div>
                ))
              ) : (
                <ActivityRow text="No pending approvals" />
              )}
            </div>
          </InfoPanel>

          <InfoPanel
            title="Active Restaurants"
            icon={<Utensils className="h-5 w-5 text-emerald-600" />}
          >
            <div className="space-y-3">
              {activeRestaurants.length > 0 ? (
                activeRestaurants.map((res) => (
                  <div
                    key={res._id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <span className="font-medium text-slate-800">
                      {res.name}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        res.isOpen ? "text-green-600" : "text-slate-500"
                      }`}
                    >
                      ● {res.isOpen ? "Open" : "Closed"}
                    </span>
                  </div>
                ))
              ) : (
                <ActivityRow text="No active restaurants" />
              )}
            </div>
          </InfoPanel>

          <InfoPanel
            title="Platform Activity"
            icon={<Activity className="h-5 w-5 text-indigo-600" />}
          >
            <div className="space-y-3">
              <ActivityRow text="New restaurant registered" />
              <ActivityRow text="42 orders delivered" />
              <ActivityRow text="Ratings updated by users" />
              <ActivityRow text="New user signup completed" />
            </div>
          </InfoPanel>
        </div>

        {/* LIVE ORDERS */}
        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-lg md:rounded-[28px] md:p-5">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-slate-500">Real-time operations</p>
              <h3 className="text-xl font-bold text-slate-900">
                Live Orders Monitoring
              </h3>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  placeholder="Search orders..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 sm:w-72"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="relative">
                <Filter
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 sm:w-52"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[900px] border-separate border-spacing-y-3 text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="px-3 py-2">Order</th>
                  <th className="px-3 py-2">Restaurant</th>
                  <th className="px-3 py-2">Customer</th>
                  <th className="px-3 py-2">Delivery</th>
                  <th className="px-3 py-2">Location</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => (
                  <tr
                    key={o.id}
                    className="rounded-2xl bg-slate-50 shadow-sm transition hover:bg-slate-100"
                  >
                    <td className="rounded-l-2xl px-3 py-4 font-semibold text-slate-900">
                      {o.id}
                    </td>
                    <td className="px-3 py-4 text-slate-700">{o.restaurant}</td>
                    <td className="px-3 py-4 text-slate-700">{o.customer}</td>
                    <td className="px-3 py-4 text-slate-700">
                      <div className="flex items-center gap-2">
                        <Bike size={15} className="text-slate-500" />
                        {o.deliveryBoy}
                      </div>
                    </td>
                    <td className="px-3 py-4 text-slate-700">
                      <div className="flex items-center gap-2">
                        <MapPin size={15} className="text-slate-500" />
                        {o.location}
                      </div>
                    </td>
                    <td className="px-3 py-4 font-semibold text-slate-900">
                      ₹{o.amount}
                    </td>
                    <td className="rounded-r-2xl px-3 py-4">
                      <OrderStatusBadge status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-4 lg:hidden">
            {filteredOrders.map((o) => (
              <div
                key={o.id}
                className="rounded-[22px] border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Order ID</p>
                    <h4 className="font-bold text-slate-900">{o.id}</h4>
                  </div>
                  <OrderStatusBadge status={o.status} />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <OrderInfo
                    icon={<Utensils size={15} className="text-slate-500" />}
                    label="Restaurant"
                    value={o.restaurant}
                  />
                  <OrderInfo
                    icon={<User size={15} className="text-slate-500" />}
                    label="Customer"
                    value={o.customer}
                  />
                  <OrderInfo
                    icon={<Bike size={15} className="text-slate-500" />}
                    label="Delivery Boy"
                    value={o.deliveryBoy}
                  />
                  <OrderInfo
                    icon={<MapPin size={15} className="text-slate-500" />}
                    label="Location"
                    value={o.location}
                  />
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Amount</span>
                    <span className="font-semibold text-slate-900">
                      ₹{o.amount}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {filteredOrders.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-slate-500">
                No orders found
              </div>
            )}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div>
          <div className="mb-4">
            <p className="text-sm text-slate-500">Shortcuts</p>
            <h3 className="text-xl font-bold text-slate-900">Quick Actions</h3>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            <ActionCard
              icon={<PlusCircle className="h-6 w-6 text-white" />}
              title="Add Restaurant"
              subtitle="Register a new store"
              color="from-emerald-600 to-teal-500"
            />
            <ActionCard
              icon={<User className="h-6 w-6 text-white" />}
              title="Manage Users"
              subtitle="Handle user accounts"
              color="from-indigo-600 to-violet-500"
            />
            <ActionCard
              icon={<ShoppingBag className="h-6 w-6 text-white" />}
              title="View Orders"
              subtitle="Track live orders"
              color="from-orange-500 to-rose-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroMiniCard({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between text-white/80">
        <span className="text-sm">{label}</span>
        {icon}
      </div>
      <p className="text-lg font-bold text-white sm:text-xl">{value}</p>
    </div>
  );
}

function StatCard({ title, value, sub, icon, iconBg }) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg md:rounded-[26px] md:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 break-words text-2xl font-bold text-slate-900 md:text-3xl">
            {value}
          </p>
          <p className="mt-2 text-xs text-slate-400">{sub}</p>
        </div>
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function HighlightCard({ title, value, subtitle, gradient, icon }) {
  return (
    <div
      className={`overflow-hidden rounded-[24px] bg-gradient-to-r ${gradient} p-5 text-white shadow-lg transition hover:shadow-2xl md:rounded-[28px] md:p-6`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-white/80">{title}</p>
          <h2 className="mt-2 break-words text-3xl font-bold md:text-4xl">
            {value}
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/85">{subtitle}</p>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
          {icon}
        </div>
      </div>
    </div>
  );
}

function InfoPanel({ title, icon, children }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-lg md:rounded-[28px] md:p-5">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}

function ActivityRow({ text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
      {text}
    </div>
  );
}

function ActionCard({ icon, title, subtitle, color }) {
  return (
    <div
      className={`cursor-pointer rounded-[24px] bg-gradient-to-r ${color} p-5 text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl md:rounded-[28px] md:p-6`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
          {icon}
        </div>
        <div className="min-w-0">
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="mt-1 text-sm text-white/85">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function OrderStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
      ${status === "Delivered" ? "bg-green-100 text-green-700" : ""}
      ${status === "Preparing" ? "bg-yellow-100 text-yellow-700" : ""}
      ${status === "Out for Delivery" ? "bg-blue-100 text-blue-700" : ""}`}
    >
      {status}
    </span>
  );
}

function OrderInfo({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
        {icon}
        {label}
      </div>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}