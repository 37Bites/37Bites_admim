import React from "react";
import {
  Bike,
  Wallet,
  Clock3,
  MapPin,
  CheckCircle2,
  Package,
  PhoneCall,
  Navigation,
  TrendingUp,
  ArrowUpRight,
  CircleDot,
  TimerReset,
  ShieldCheck,
  MapPinned,
} from "lucide-react";

const stats = [
  {
    title: "Today's Orders",
    value: "18",
    sub: "+4 from yesterday",
    icon: Package,
    bg: "from-blue-500 to-cyan-500",
  },
  {
    title: "Completed",
    value: "12",
    sub: "75% completion",
    icon: CheckCircle2,
    bg: "from-emerald-500 to-green-500",
  },
  {
    title: "Pending",
    value: "6",
    sub: "Need attention",
    icon: Clock3,
    bg: "from-amber-500 to-yellow-500",
  },
  {
    title: "Today's Earnings",
    value: "₹1,240",
    sub: "+₹220 extra tips",
    icon: Wallet,
    bg: "from-orange-500 to-red-500",
  },
];

const activeOrders = [
  {
    id: "#ORD1025",
    customer: "Aman Sharma",
    restaurant: "Pizza Hub",
    pickup: "Vijay Nagar, Indore",
    drop: "Palasia Square, Indore",
    amount: "₹280",
    status: "On the way",
    distance: "3.2 km",
    eta: "14 min",
  },
  {
    id: "#ORD1026",
    customer: "Priya Verma",
    restaurant: "Burger Point",
    pickup: "Bhawarkua, Indore",
    drop: "Geeta Bhawan, Indore",
    amount: "₹340",
    status: "Picked Up",
    distance: "2.4 km",
    eta: "11 min",
  },
  {
    id: "#ORD1027",
    customer: "Rohit Jain",
    restaurant: "Tandoori Treat",
    pickup: "MR 10 Road, Indore",
    drop: "Rajendra Nagar, Indore",
    amount: "₹220",
    status: "Assigned",
    distance: "4.1 km",
    eta: "18 min",
  },
];

function getStatusClasses(status) {
  switch (status) {
    case "On the way":
      return "bg-blue-100 text-blue-700 border border-blue-200";
    case "Picked Up":
      return "bg-green-100 text-green-700 border border-green-200";
    case "Assigned":
      return "bg-amber-100 text-amber-700 border border-amber-200";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-200";
  }
}

export default function DeliveryHome() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-yellow-300/10 rounded-full blur-3xl" />

        <div className="relative p-6 md:p-8 lg:p-10">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium border border-white/20">
                <ShieldCheck size={14} />
                Verified Delivery Partner
              </div>

              <h2 className="mt-4 text-2xl md:text-3xl xl:text-4xl font-bold leading-tight">
                Welcome back, Rahul 👋
              </h2>

              <p className="mt-3 text-sm md:text-base text-orange-50 max-w-xl">
                Aaj ke orders, active deliveries, route updates aur earnings ek
                hi jagah se manage karo. Fast delivery, better ratings, higher
                earnings.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-2xl bg-white text-orange-600 px-5 py-3 font-semibold hover:bg-orange-50 transition shadow-md">
                  Go Online
                </button>

                <button className="rounded-2xl border border-white/25 bg-white/10 backdrop-blur-sm px-5 py-3 font-semibold hover:bg-white/15 transition">
                  View Route
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full xl:max-w-[520px]">
              <div className="rounded-3xl bg-white/12 backdrop-blur-md border border-white/15 p-4">
                <div className="flex items-center gap-2 text-orange-100 text-sm">
                  <CircleDot size={16} />
                  Shift Status
                </div>
                <p className="mt-2 text-2xl font-bold">Online</p>
                <p className="text-xs text-orange-100 mt-1">
                  Ready to receive more orders
                </p>
              </div>

              <div className="rounded-3xl bg-white/12 backdrop-blur-md border border-white/15 p-4">
                <div className="flex items-center gap-2 text-orange-100 text-sm">
                  <TrendingUp size={16} />
                  Rating
                </div>
                <p className="mt-2 text-2xl font-bold">4.8 ★</p>
                <p className="text-xs text-orange-100 mt-1">
                  Excellent partner score
                </p>
              </div>

              <div className="rounded-3xl bg-white/12 backdrop-blur-md border border-white/15 p-4">
                <div className="flex items-center gap-2 text-orange-100 text-sm">
                  <MapPinned size={16} />
                  Live Zone
                </div>
                <p className="mt-2 text-lg font-bold">Indore Central</p>
                <p className="text-xs text-orange-100 mt-1">High demand area</p>
              </div>

              <div className="rounded-3xl bg-white/12 backdrop-blur-md border border-white/15 p-4">
                <div className="flex items-center gap-2 text-orange-100 text-sm">
                  <TimerReset size={16} />
                  Avg Time
                </div>
                <p className="mt-2 text-2xl font-bold">28 min</p>
                <p className="text-xs text-orange-100 mt-1">
                  Better than last week
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">{item.title}</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                      {item.value}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">{item.sub}</p>
                  </div>

                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.bg} flex items-center justify-center text-white shadow-lg`}
                  >
                    <Icon size={22} />
                  </div>
                </div>
              </div>

              <div className={`h-1 w-full bg-gradient-to-r ${item.bg}`} />
            </div>
          );
        })}
      </section>

      {/* Main Grid */}
      <section className="grid grid-cols-1 2xl:grid-cols-12 gap-6">
        {/* Left */}
        <div className="2xl:col-span-8 space-y-6">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 md:p-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Active Orders
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Manage pickup, navigation and delivery actions
                </p>
              </div>

              <button className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition">
                View All
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="p-5 md:p-6 space-y-4">
              {activeOrders.map((order, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4 md:p-5 hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-base font-bold text-slate-900">
                          {order.id}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="rounded-2xl bg-white border border-slate-200 p-3">
                          <p className="text-slate-500 text-xs">Customer</p>
                          <p className="font-semibold text-slate-800 mt-1">
                            {order.customer}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-white border border-slate-200 p-3">
                          <p className="text-slate-500 text-xs">Restaurant</p>
                          <p className="font-semibold text-slate-800 mt-1">
                            {order.restaurant}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="flex items-start gap-3 rounded-2xl bg-green-50 border border-green-100 p-3">
                          <div className="w-9 h-9 rounded-xl bg-green-500 text-white flex items-center justify-center shrink-0">
                            <MapPin size={16} />
                          </div>
                          <div>
                            <p className="text-xs text-green-700 font-semibold">
                              Pickup Location
                            </p>
                            <p className="text-sm text-slate-700 mt-1">
                              {order.pickup}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-2xl bg-red-50 border border-red-100 p-3">
                          <div className="w-9 h-9 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0">
                            <Navigation size={16} />
                          </div>
                          <div>
                            <p className="text-xs text-red-700 font-semibold">
                              Drop Location
                            </p>
                            <p className="text-sm text-slate-700 mt-1">
                              {order.drop}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="xl:w-[260px] space-y-4">
                      <div className="grid grid-cols-3 xl:grid-cols-1 gap-3">
                        <div className="rounded-2xl bg-white border border-slate-200 p-3">
                          <p className="text-xs text-slate-500">Amount</p>
                          <p className="mt-1 text-lg font-bold text-slate-900">
                            {order.amount}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-white border border-slate-200 p-3">
                          <p className="text-xs text-slate-500">Distance</p>
                          <p className="mt-1 text-sm font-semibold text-slate-800">
                            {order.distance}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-white border border-slate-200 p-3">
                          <p className="text-xs text-slate-500">ETA</p>
                          <p className="mt-1 text-sm font-semibold text-slate-800">
                            {order.eta}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button className="flex-1 rounded-2xl bg-green-500 hover:bg-green-600 text-white px-4 py-3 text-sm font-semibold transition">
                          Accept
                        </button>

                        <button className="flex-1 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 text-sm font-semibold transition">
                          Navigate
                        </button>

                        <button className="w-full rounded-2xl bg-slate-900 hover:bg-black text-white px-4 py-3 text-sm font-semibold transition">
                          Mark as Delivered
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 md:p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Delivery Highlights
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Aaj ki shift ka quick performance snapshot
              </p>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <div>
                    <p className="text-sm text-slate-500">Fastest Delivery</p>
                    <p className="font-semibold text-slate-900 mt-1">19 mins</p>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-blue-500 text-white flex items-center justify-center">
                    <Bike size={20} />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <div>
                    <p className="text-sm text-slate-500">Best Zone</p>
                    <p className="font-semibold text-slate-900 mt-1">
                      Vijay Nagar
                    </p>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-green-500 text-white flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <div>
                    <p className="text-sm text-slate-500">Extra Incentive</p>
                    <p className="font-semibold text-slate-900 mt-1">
                      ₹180 unlocked
                    </p>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center">
                    <Wallet size={20} />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 md:p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Tips to Earn More
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Delivery score aur incentives improve karne ke liye
              </p>

              <div className="mt-5 space-y-3">
                {[
                  "Peak hours me online raho for more orders",
                  "Fast pickup se cancellation chance kam hota hai",
                  "Customer calls quickly attend karo",
                  "High rating maintain karne se better batches milte hain",
                ].map((tip, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-2xl bg-orange-50 border border-orange-100 p-4"
                  >
                    <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="2xl:col-span-4 space-y-6">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 md:p-6">
            <h3 className="text-xl font-bold text-slate-900">Quick Actions</h3>
            <p className="text-sm text-slate-500 mt-1">
              Frequently used delivery actions
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button className="rounded-3xl border border-orange-100 bg-orange-50 hover:bg-orange-100 transition p-4 text-left">
                <Bike className="text-orange-500 mb-3" size={22} />
                <p className="font-semibold text-slate-900">Go Online</p>
                <p className="text-xs text-slate-500 mt-1">
                  Start receiving orders
                </p>
              </button>

              <button className="rounded-3xl border border-blue-100 bg-blue-50 hover:bg-blue-100 transition p-4 text-left">
                <MapPin className="text-blue-500 mb-3" size={22} />
                <p className="font-semibold text-slate-900">Open Map</p>
                <p className="text-xs text-slate-500 mt-1">
                  Check live route
                </p>
              </button>

              <button className="rounded-3xl border border-green-100 bg-green-50 hover:bg-green-100 transition p-4 text-left">
                <Wallet className="text-green-500 mb-3" size={22} />
                <p className="font-semibold text-slate-900">Earnings</p>
                <p className="text-xs text-slate-500 mt-1">
                  View today income
                </p>
              </button>

              <button className="rounded-3xl border border-purple-100 bg-purple-50 hover:bg-purple-100 transition p-4 text-left">
                <PhoneCall className="text-purple-500 mb-3" size={22} />
                <p className="font-semibold text-slate-900">Support</p>
                <p className="text-xs text-slate-500 mt-1">Need help?</p>
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 md:p-6">
            <h3 className="text-xl font-bold text-slate-900">
              Today Performance
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Your daily delivery progress
            </p>

            <div className="mt-5 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Completed</span>
                  <span className="text-sm font-semibold text-slate-900">
                    12 Orders
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[75%] bg-green-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Pending</span>
                  <span className="text-sm font-semibold text-slate-900">
                    6 Orders
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[35%] bg-amber-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Online Time</span>
                  <span className="text-sm font-semibold text-slate-900">
                    7h 20m
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[68%] bg-blue-500 rounded-full" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">Avg Delivery Time</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    28 mins
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">Acceptance Rate</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">92%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm p-5 md:p-6">
            <h3 className="text-xl font-bold">Daily Summary</h3>
            <p className="text-sm text-slate-300 mt-1">
              Aaj ki shift ka earning overview
            </p>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Base Earnings</span>
                <span className="font-semibold">₹960</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">Tips</span>
                <span className="font-semibold">₹220</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">Incentives</span>
                <span className="font-semibold">₹60</span>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <span className="text-white font-medium">Total</span>
                <span className="text-2xl font-bold text-orange-400">
                  ₹1,240
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}