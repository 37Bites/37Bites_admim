import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Trash2, Clock, Store, Package, ShoppingCart, Plus } from "lucide-react";
import api from "../../api/axios";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await api.get("/restaurants/all");
      setStores(Array.isArray(res.data?.data) ? res.data.data : []);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/restaurants/${id}`);
      fetchStores();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(`/restaurants/${id}/status`, { status });
      fetchStores();
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  const handleToggleOpen = async (id) => {
    try {
      await api.patch(`/restaurants/${id}/toggle-open`);
      fetchStores();
    } catch (error) {
      console.error("Toggle error:", error.response?.data || error.message);
    }
  };

  // ===== STATS =====
  const totalStores = stores.length;
  const openStores = stores.filter((s) => s.isOpen).length;
  const totalProducts = stores.reduce((acc, curr) => acc + Number(curr.totalOrders || 0), 0);
  const totalActiveOrders = stores.reduce((acc, curr) => acc + Number(curr.activeOrders || 0), 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER & STATS */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">STORES</h1>
          <button
            onClick={() => navigate("/Admindashboard/create")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            <Plus size={16} /> Create Restaurant
          </button>
        </div>

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
            <p className="text-xs text-gray-500">Total Orders</p>
          </div>
          <div>
            <ShoppingCart className="mx-auto text-orange-500 mb-1" size={22} />
            <p className="text-lg font-semibold">{totalActiveOrders}</p>
            <p className="text-xs text-gray-500">Active Orders</p>
          </div>
        </div>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {/* STORES LIST */}
      <div className="space-y-5">
        {stores.map((store, index) => {
          const storeId = store._id || index;
          const isOpen = store.isOpen || false;
          const status = store.status || "pending";

          return (
            <div key={storeId} className="bg-white rounded-2xl shadow-sm border border-gray-200 flex overflow-hidden">
              {/* IMAGE */}
              <div className="w-64 h-48 relative">
                <img
                  src={store.profileImage?.url || "https://via.placeholder.com/400"}
                  alt={store.name || "Store"}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-3 left-3 px-3 py-1 text-xs rounded-full font-medium shadow ${
                    isOpen ? "bg-green-500 text-white" : "bg-gray-700 text-white"
                  }`}
                >
                  {isOpen ? "Open" : "Closed"}
                </span>
              </div>

              {/* CONTENT */}
              <div className="flex-1 p-5 flex justify-between">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-800">{store.name}</h2>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <MapPin size={14} />
                    {store.address?.street || ""}, {store.address?.area || ""}, {store.address?.city || ""}
                  </div>

                  <div className="flex gap-2 flex-wrap pt-2">
                    <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
                      Commission: {store.commissionPercentage || 0}%
                    </span>

                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        status === "active"
                          ? "bg-green-100 text-green-600"
                          : status === "suspended"
                          ? "bg-red-100 text-red-600"
                          : status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col justify-between items-end">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleToggleOpen(storeId)}
                      disabled={status !== "active"}
                      className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
                    >
                      <Clock size={16} /> Toggle
                    </button>
                  </div>

                  <div className="flex gap-3 mt-3">
                    <select
                      value={String(status)}
                      onChange={(e) => handleStatusChange(storeId, e.target.value)}
                      className="text-sm border rounded-lg px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="rejected">Rejected</option>
                      <option value="suspended">Suspended</option>
                    </select>

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