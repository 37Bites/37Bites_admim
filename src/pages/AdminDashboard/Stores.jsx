<<<<<<< Updated upstream
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
=======
import { useEffect, useState } from "react";
import { Eye, Trash2, Plus, X, Store, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
>>>>>>> Stashed changes
import api from "../../api/axios";
import {
  MapPin,
  Trash2,
  Clock,
  Store,
  Package,
  ShoppingCart,
  Plus,
} from "lucide-react";

export default function Stores() {
<<<<<<< Updated upstream
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
=======
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
>>>>>>> Stashed changes

  // ================= FETCH RESTAURANTS =================
  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await api.get("/restaurants");
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
<<<<<<< Updated upstream
      fetchStores();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ================= STATUS CHANGE =================
  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(`/restaurants/${id}/status`, { status });
      fetchStores();
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  // ================= TOGGLE OPEN =================
  const handleToggleOpen = async (id) => {
    try {
      await api.patch(`/restaurants/${id}/toggle-open`);
      fetchStores();
    } catch (error) {
      console.error("Toggle error:", error.response?.data || error.message);
=======
      fetchRestaurants();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await api.post("/restaurants", formData);
      setShowDrawer(false);
      setFormData({
        name: "",
        description: "",
        address: "",
        commissionPercentage: 10,
      });
      fetchRestaurants();
    } catch (err) {
      console.error(err.response?.data || err.message);
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
          {/* ✅ Create Restaurant Button (Added Back) */}
          <button
            onClick={() => navigate("/admin/restaurants/create")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            <Plus size={16} /> Create Restaurant
          </button>
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

                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        store.status === "active"
                          ? "bg-green-100 text-green-600"
                          : store.status === "blocked"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {store.status === "active"
                        ? "Active"
                        : store.status === "blocked"
                        ? "Blocked"
                        : "Awaiting Approval"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-between items-end">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleToggleOpen(storeId)}
                      disabled={store.status === "blocked"}
                      className={`flex items-center gap-1 text-sm ${
                        store.status === "blocked"
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      <Clock size={16} /> Toggle
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <select
                      value={store.status}
                      onChange={(e) =>
                        handleStatusChange(storeId, e.target.value)
                      }
                      className="text-sm border rounded-lg px-2 py-1"
                    >
                      <option value="awaiting_approval">Awaiting</option>
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
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
=======
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">37Bites Stores</h2>

        <button
          onClick={() => setShowDrawer(true)}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl shadow"
        >
          <Plus size={16} /> Add Store
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard value={totalStores} label="Total Stores" />
        <StatCard value={openStores} label="Open Stores" />
        <StatCard value={totalProducts} label="Total Products" />
        <StatCard value={activeOrders} label="Active Orders" />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm mt-6 overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Commission</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{r.name}</td>
                  <td className="p-3 text-gray-500">{r.address}</td>
                  <td className="p-3">{r.commissionPercentage}%</td>
                  <td className="p-3 flex gap-3 text-gray-500">
                    <Eye size={16} />
                    <Trash2
                      size={16}
                      onClick={() => handleDelete(r._id)}
                      className="cursor-pointer hover:text-red-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= DRAWER ================= */}
      <AnimatePresence>
        {showDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex justify-end z-50"
          >
            <motion.div
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ x: 500 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="w-full md:w-[700px] bg-white h-full overflow-y-auto p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Add New Store</h2>
                <X
                  className="cursor-pointer"
                  onClick={() => setShowDrawer(false)}
                />
              </div>

              {/* Upload Section */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="border-2 border-dashed rounded-2xl p-6 text-center">
                  <Upload className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Upload Logo</p>
                </div>
                <div className="border-2 border-dashed rounded-2xl p-6 text-center">
                  <Upload className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Upload Banner</p>
                </div>
              </div>

              <form onSubmit={handleAddStore} className="space-y-4">

                <input
                  type="text"
                  placeholder="Restaurant Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  type="text"
                  placeholder="Address"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full border p-3 rounded-xl"
                />

                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  type="number"
                  placeholder="Commission %"
                  value={formData.commissionPercentage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      commissionPercentage: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-xl"
                />

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-2xl py-3"
                  >
                    Submit Store
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDrawer(false)}
                    className="flex-1 border rounded-2xl py-3 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ value, label }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
      <h3 className="text-2xl font-semibold">{value}</h3>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
>>>>>>> Stashed changes
    </div>
  );
}