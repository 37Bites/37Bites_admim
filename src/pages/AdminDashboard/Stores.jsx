import { useEffect, useState } from "react";
import { Eye, Trash2, Plus } from "lucide-react";
import api from "../../api/axios";

export default function Stores() {
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    commissionPercentage: 10,
  });

  /* ================= FETCH ================= */

  const fetchRestaurants = async () => {
    try {
      const res = await api.get("/restaurants");
      setRestaurants(res.data.data || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  /* ================= FILTER ================= */

  useEffect(() => {
    let data = [...restaurants];

    if (activeTab !== "all") {
      data = data.filter((r) => r.status === activeTab);
    }

    if (search.trim()) {
      data = data.filter((r) =>
        r.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [restaurants, activeTab, search]);

  /* ================= ACTIONS ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this restaurant?")) return;
    try {
      await api.delete(`/restaurants/${id}`);
      fetchRestaurants();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleOpen = async (id) => {
    try {
      await api.patch(`/restaurants/${id}/toggle-open`);
      fetchRestaurants();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(`/restaurants/${id}/status`, { status });
      fetchRestaurants();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await api.post("/restaurants", formData);
      setShowModal(false);
      setFormData({
        name: "",
        description: "",
        address: "",
        commissionPercentage: 10,
      });
      fetchRestaurants();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  /* ================= STATS ================= */

  const totalStores = restaurants.length;
  const openStores = restaurants.filter((r) => r.isOpen).length;
  const totalProducts = restaurants.reduce(
    (acc, r) => acc + (r.totalProducts || 0),
    0
  );
  const activeOrders = restaurants.reduce(
    (acc, r) => acc + (r.activeOrders || 0),
    0
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">STORES</h2>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          <Plus size={16} /> Add Store
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        <StatCard value={totalStores} label="Total Stores" />
        <StatCard value={openStores} label="Open Stores" />
        <StatCard value={totalProducts} label="Total Products" />
        <StatCard value={activeOrders} label="Active Orders" />
      </div>

      {/* TABS */}
      <div className="flex items-center gap-6 border-b mt-8 pb-3">
        {[
          { id: "all", label: "All" },
          { id: "active", label: "Active" },
          { id: "awaiting_approval", label: "Awaiting Approval" },
          { id: "blocked", label: "Blocked" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-sm pb-2 capitalize ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}

        <input
          type="text"
          placeholder="Search store..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto border rounded-md px-3 py-1 text-sm"
        />
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
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Open</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Commission</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{r.name}</td>

                  <td className="p-3">
                    <select
                      value={r.status}
                      onChange={(e) =>
                        handleStatusChange(r.id, e.target.value)
                      }
                      className="border rounded px-2 py-1 text-xs"
                    >
                      <option value="active">Active</option>
                      <option value="awaiting_approval">Awaiting Approval</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => handleToggleOpen(r._id)}
                      className={`px-3 py-1 text-xs rounded-full ${
                        r.isOpen
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {r.isOpen ? "Open" : "Closed"}
                    </button>
                  </td>

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

      {/* ADD MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl w-96 p-6">
            <h3 className="text-lg font-semibold mb-4">Add Store</h3>

            <form onSubmit={handleAddStore} className="space-y-4">
              <input
                type="text"
                placeholder="Store Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                placeholder="Address"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
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
                className="w-full border px-3 py-2 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* STAT CARD */

function StatCard({ value, label }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
      <h3 className="text-xl font-semibold">{value}</h3>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
    </div>
  );
}