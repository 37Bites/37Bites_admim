import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  MapPin,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  Store,
  Package,
  ShoppingCart,
} from "lucide-react";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH RESTAURANTS =================
  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await api.get("/restaurants");

      // API returns { success, count, data: [] }
      setStores(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setStores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/restaurants/${id}`);
      fetchStores();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ================= APPROVE =================
  const handleApprove = async (id) => {
    try {
      await api.patch(`/restaurants/${id}/status`, {
        status: "active", // your enum is active/awaiting_approval/blocked
      });
      fetchStores();
    } catch (error) {
      console.error("Approval error:", error);
    }
  };

  // ================= TOGGLE OPEN =================
  const handleToggleOpen = async (id) => {
    try {
      await api.patch(`/restaurants/${id}/toggle-open`);
      fetchStores();
    } catch (error) {
      console.error("Toggle error:", error.response?.data || error.message);
    }
  };

  // ================= STATS =================
  const totalStores = stores.length;
  const openStores = stores.filter((s) => s.isOpen).length;
  const totalProducts = stores.reduce(
    (acc, curr) => acc + (curr.totalProducts || 0),
    0
  );
  const totalActiveOrders = stores.reduce(
    (acc, curr) => acc + (curr.activeOrders || 0),
    0
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* TOP SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">STORES</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 text-center">
          <div>
            <Store className="mx-auto text-blue-600 mb-1" size={22} />
            <p className="text-lg font-semibold">{totalStores}</p>
            <p className="text-xs text-gray-500">Total Stores</p>
          </div>

          <div>
            <Store className="mx-auto text-green-600 mb-1" size={22} />
            <p className="text-lg font-semibold">{openStores}</p>
            <p className="text-xs text-gray-500">Open Stores</p>
          </div>

          <div>
            <Package className="mx-auto text-purple-600 mb-1" size={22} />
            <p className="text-lg font-semibold">{totalProducts}</p>
            <p className="text-xs text-gray-500">Total Products</p>
          </div>

          <div>
            <ShoppingCart className="mx-auto text-orange-500 mb-1" size={22} />
            <p className="text-lg font-semibold">{totalActiveOrders}</p>
            <p className="text-xs text-gray-500">Total Active Orders</p>
          </div>
        </div>
      </div>

      {/* LOADING */}
      {loading && <p className="text-center">Loading...</p>}

      {/* STORE LIST */}
      <div className="space-y-5">
        {stores.map((store, index) => {
          const storeId = store.id || store._id;

          return (
            <div
              key={storeId || index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 flex overflow-hidden"
            >
              {/* Image */}
              <div className="w-64 h-48 relative">
                <img
                  src={store.image || "https://via.placeholder.com/400"}
                  alt=""
                  className="w-full h-full object-cover"
                />

                <span
                  className={`absolute top-3 left-3 px-3 py-1 text-xs rounded-full font-medium shadow ${
                    store.isOpen
                      ? "bg-green-500 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {store.isOpen ? "Open" : "Closed"}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 p-5 flex justify-between">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {store.name}
                  </h2>

                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <MapPin size={14} />
                    {store.address}
                  </div>

                  <div className="flex gap-2 flex-wrap pt-2">
                    <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
                      Commission: {store.commissionPercentage || 0}%
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-between items-end">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleToggleOpen(storeId)}
                      className="flex items-center gap-1 text-gray-600 hover:text-blue-600 text-sm"
                    >
                      <Clock size={16} /> Toggle
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(storeId)}
                      className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 text-sm"
                    >
                      <CheckCircle size={16} /> Approve
                    </button>

                    <button
                      onClick={() => handleDelete(storeId)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}