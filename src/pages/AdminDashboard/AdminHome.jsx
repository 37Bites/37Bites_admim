import React from "react";
import { Users, FileText, CheckCircle, Clock, UserPlus, UserCheck } from "lucide-react";

export default function AdminHome() {
  return (
    <div className="w-full">

      {/* TOP STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

     {/* Total Users */}
      <div className="relative bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition">
        <div className="absolute left-0 top-8 h-12 w-1.5 bg-emerald-500 rounded-r-lg"></div>

        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-4">
          <Users className="w-6 h-6 text-emerald-600" />
        </div>

        <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">1,540</p>

        
      </div>

      {/* Total Form Requests */}
      <div className="relative bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition">
        <div className="absolute left-0 top-8 h-12 w-1.5 bg-emerald-500 rounded-r-lg"></div>

        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-4">
          <FileText className="w-6 h-6 text-emerald-600" />
        </div>

        <h3 className="text-lg font-semibold text-gray-800">Total Form Requests</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">3,280</p>

       
      </div>

      {/* Completed Requests */}
      <div className="relative bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition">
        <div className="absolute left-0 top-8 h-12 w-1.5 bg-emerald-500 rounded-r-lg"></div>

        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-4">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
        </div>

        <h3 className="text-lg font-semibold text-gray-800">Completed Requests</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">2,940</p>

        
      </div>

      {/* Pending Requests */}
      <div className="relative bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition">
        <div className="absolute left-0 top-8 h-12 w-1.5 bg-emerald-500 rounded-r-lg"></div>

        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-4">
          <Clock className="w-6 h-6 text-emerald-600" />
        </div>

        <h3 className="text-lg font-semibold text-gray-800">Pending Requests</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">340</p>

        
      </div>

</div>
      {/* TODAY REQUEST */}
      <div className="mt-6 p-6 bg-gradient-to-r/ from-emerald-600 to-emerald-800 text-white rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold">Today’s Requests</h3>
        <p className="text-4xl font-bold mt-2">67</p>
      </div>

      {/* BOTTOM SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

        {/* Recently Created Users */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-emerald-600" />
            Recent User Accounts
          </h3>

          <div className="space-y-3">
            {["Riya Sharma", "Aman Patel", "Kunal Mehta", "Pooja Verma"].map((user, index) => (
              <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg border">
                <span>{user}</span>
                <span className="text-sm text-gray-500">Today</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Joined Employees */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-emerald-600" />
            New Employees Joined
          </h3>

          <div className="space-y-3">
            {["Sahil Singh", "Priya Chauhan", "Aditya Kumar"].map((emp, index) => (
              <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg border">
                <span>{emp}</span>
                <span className="text-sm text-gray-500">This Week</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Employees Today */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" />
            Active Employees Today
          </h3>

          <ul className="space-y-3">
            {[
              { name: "Neha Sharma", status: "Active" },
              { name: "Vivek Kumar", status: "Active" },
              { name: "Tanya Jain", status: "Active" },
            ].map((emp, index) => (
              <li
                key={index}
                className="flex justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <span>{emp.name}</span>
                <span className="text-emerald-600 text-sm font-medium">
                  ● {emp.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}