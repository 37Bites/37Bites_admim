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
  Activity
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
  CartesianGrid
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
    revenue: 0
  });

  useEffect(() => {
    const restaurantData = [
      { _id: "1", name: "Burger Hub", status: "approved", isOpen: true },
      { _id: "2", name: "Pizza Palace", status: "approved", isOpen: false },
      { _id: "3", name: "Royal Biryani", status: "pending", isOpen: false },
      { _id: "4", name: "Street Momos", status: "pending", isOpen: false },
      { _id: "5", name: "Tandoori Nights", status: "approved", isOpen: true }
    ];

    setRestaurants(restaurantData);

    setStats({
      totalRestaurants: restaurantData.length,
      totalOrders: 3480,
      completedOrders: 3100,
      pendingOrders: 380,
      todayOrders: 92,
      revenue: 128450
    });

    setOrdersChart([
      { day: "Mon", orders: 40 },
      { day: "Tue", orders: 55 },
      { day: "Wed", orders: 70 },
      { day: "Thu", orders: 50 },
      { day: "Fri", orders: 90 },
      { day: "Sat", orders: 120 },
      { day: "Sun", orders: 95 }
    ]);

    setGrowthChart([
      { month: "Jan", restaurants: 10 },
      { month: "Feb", restaurants: 18 },
      { month: "Mar", restaurants: 25 },
      { month: "Apr", restaurants: 31 },
      { month: "May", restaurants: 40 },
      { month: "Jun", restaurants: 55 }
    ]);

    setOrders([
      {
        id: "ORD1001",
        restaurant: "Burger Hub",
        customer: "Rahul Sharma",
        deliveryBoy: "Amit",
        location: "Raipur",
        amount: 420,
        status: "Preparing"
      },
      {
        id: "ORD1002",
        restaurant: "Pizza Palace",
        customer: "Sneha",
        deliveryBoy: "Rohit",
        location: "Bilaspur",
        amount: 650,
        status: "Out for Delivery"
      },
      {
        id: "ORD1003",
        restaurant: "Royal Biryani",
        customer: "Vikas",
        deliveryBoy: "Sanjay",
        location: "Durg",
        amount: 320,
        status: "Delivered"
      },
      {
        id: "ORD1004",
        restaurant: "Street Momos",
        customer: "Ankit",
        deliveryBoy: "Ravi",
        location: "Raipur",
        amount: 210,
        status: "Preparing"
      }
    ]);

    setTopRestaurants([
      { name: "Burger Hub", orders: 540, revenue: 82000 },
      { name: "Pizza Palace", orders: 430, revenue: 76000 },
      { name: "Royal Biryani", orders: 390, revenue: 69000 },
      { name: "Street Momos", orders: 300, revenue: 42000 }
    ]);
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.restaurant.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.deliveryBoy.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "all" || order.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const pendingRestaurants = restaurants.filter(r => r.status === "pending");
  const activeRestaurants = restaurants.filter(r => r.status === "approved");

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold">Platform Dashboard</h1>
          <p className="text-gray-500 text-sm">Monitor restaurants and orders</p>
        </div>
        <div className="flex items-center text-green-600 gap-2">
          <TrendingUp className="w-4 h-4"/>
          Growth +14%
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Restaurants" value={stats.totalRestaurants} icon={<Store className="text-emerald-600"/>}/>
        <StatCard title="Total Orders" value={stats.totalOrders} icon={<ShoppingBag className="text-indigo-600"/>}/>
        <StatCard title="Completed Orders" value={stats.completedOrders} icon={<CheckCircle className="text-green-600"/>}/>
        <StatCard title="Pending Orders" value={stats.pendingOrders} icon={<Clock className="text-orange-600"/>}/>
      </div>

      {/* TODAY + REVENUE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <p>Today's Orders</p>
          <h2 className="text-4xl font-bold mt-2">{stats.todayOrders}</h2>
        </div>
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <p>Monthly Revenue</p>
          <h2 className="text-4xl font-bold mt-2">₹{stats.revenue}</h2>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
          <h3 className="font-semibold mb-4">Orders Analytics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ordersChart}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2}/>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
          <h3 className="font-semibold mb-4">Restaurant Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={growthChart}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2}/>
              <XAxis dataKey="month"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="restaurants" fill="#6366f1"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TOP SELLING RESTAURANTS */}
      <div className="bg-white p-6 rounded-xl shadow-sm mt-8 hover:shadow-lg transition-all duration-300">
        <h3 className="font-semibold mb-4">Top Selling Restaurants</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-gray-500">
              <th className="text-left pb-2">Restaurant</th>
              <th>Orders</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topRestaurants.map((r,i)=>(
              <tr key={i} className="hover:bg-gray-50 transition-all duration-200">
                <td className="py-3 font-medium">{r.name}</td>
                <td>{r.orders}</td>
                <td>₹{r.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

        {/* PENDING */}
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
          <h3 className="flex items-center gap-2 font-semibold mb-4">
            <AlertCircle className="w-5 h-5 text-orange-500"/>
            Pending Approvals
          </h3>
          <div className="space-y-3">
            {pendingRestaurants.map((item)=>(
              <div
                key={item._id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:shadow hover:bg-gray-100 transition-all duration-300"
              >
                <span>{item.name}</span>
                <span className="text-orange-500 text-xs font-medium">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVE */}
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
          <h3 className="flex items-center gap-2 font-semibold mb-4">
            <Utensils className="w-5 h-5 text-emerald-600"/>
            Active Restaurants
          </h3>
          <div className="space-y-3">
            {activeRestaurants.map((res)=>(
              <div
                key={res._id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:shadow hover:bg-gray-100 transition-all duration-300"
              >
                <span>{res.name}</span>
                <span className={`text-sm font-medium ${
                  res.isOpen ? "text-green-600" : "text-gray-500"
                }`}>
                  ● {res.isOpen ? "Open" : "Closed"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
          <h3 className="flex items-center gap-2 font-semibold mb-4">
            <Activity className="w-5 h-5 text-indigo-600"/>
            Platform Activity
          </h3>
          <div className="space-y-4 text-sm text-gray-600">
            <p>🍔 New restaurant registered</p>
            <p>📦 42 orders delivered</p>
            <p>⭐ Rating updated</p>
            <p>👤 New user signup</p>
          </div>
        </div>

      </div>

      {/* LIVE ORDERS */}
      <div className="bg-white p-6 rounded-xl shadow-sm mt-8 hover:shadow-lg transition-all duration-300">
        <h3 className="font-semibold mb-6">Live Orders Monitoring</h3>
        <div className="flex gap-4 mb-6">
          <input
            placeholder="Search orders..."
            className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-300"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
          <select
            className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-300"
            value={statusFilter}
            onChange={(e)=>setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Preparing">Preparing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-gray-500 text-left">
                <th>Order</th>
                <th>Restaurant</th>
                <th>Customer</th>
                <th>Delivery</th>
                <th>Location</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o)=>(
                <tr key={o.id} className="hover:bg-gray-50 transition-all duration-200">
                  <td className="py-3 font-medium">{o.id}</td>
                  <td>{o.restaurant}</td>
                  <td>{o.customer}</td>
                  <td>{o.deliveryBoy}</td>
                  <td>{o.location}</td>
                  <td>₹{o.amount}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs
                      ${o.status==="Delivered" && "bg-green-100 text-green-700"}
                      ${o.status==="Preparing" && "bg-yellow-100 text-yellow-700"}
                      ${o.status==="Out for Delivery" && "bg-blue-100 text-blue-700"}
                    `}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard icon={<PlusCircle className="w-6 h-6 text-white"/>} title="Add Restaurant" color="bg-emerald-600"/>
          <ActionCard icon={<User className="w-6 h-6 text-white"/>} title="Manage Users" color="bg-indigo-600"/>
          <ActionCard icon={<ShoppingBag className="w-6 h-6 text-white"/>} title="View Orders" color="bg-orange-600"/>
        </div>
      </div>
    </div>
  )
}

function StatCard({title,value,icon}){
  return(
    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-start gap-2 hover:shadow-lg transition-all duration-300">
      <div className="w-12 h-12 flex items-center justify-center bg-gray-100">{icon}</div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}

function ActionCard({icon,title,color}){
  return(
    <div className={`${color} text-white p-6 rounded-xl cursor-pointer hover:scale-105 shadow-md hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-center gap-3">{icon}<h4 className="font-semibold">{title}</h4></div>
    </div>
  )
}