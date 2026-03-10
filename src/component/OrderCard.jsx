import React from "react";
import { MapPin, Package, Bike, IndianRupee } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function OrderCard({ order }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{order.id}</h3>
          <p className="text-sm text-slate-500">{order.restaurant} • {order.customer}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
        <div className="flex gap-3">
          <MapPin className="w-4 h-4 mt-1 text-orange-500" />
          <div>
            <p className="font-medium text-slate-700">Pickup</p>
            <p>{order.pickup}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Bike className="w-4 h-4 mt-1 text-orange-500" />
          <div>
            <p className="font-medium text-slate-700">Drop</p>
            <p>{order.drop}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Package className="w-4 h-4 mt-1 text-orange-500" />
          <div>
            <p className="font-medium text-slate-700">Items</p>
            <p>{order.items} items • {order.distance}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <IndianRupee className="w-4 h-4 mt-1 text-orange-500" />
          <div>
            <p className="font-medium text-slate-700">Amount</p>
            <p>₹{order.amount} • {order.payment}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition">
          View Details
        </button>
        <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition">
          Call Customer
        </button>
        <button className="px-4 py-2 rounded-xl bg-green-100 text-green-700 text-sm font-medium hover:bg-green-200 transition">
          Update Status
        </button>
      </div>
    </div>
  );
}