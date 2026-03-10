import React, { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Eye,
  Trash2,
  Phone,
  Clock,
  Store,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Plus,
  RefreshCw,
  Loader2,
  Pencil,
  Search,
  Filter,
  ChevronRight,
} from "lucide-react";
import api from "../../api/axios";
import { NavLink } from "react-router-dom";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await api.get("/restaurants/all");
      if (res.data?.success) {
        setStores(res.data.data || []);
      }
    } catch (err) {
      console.error("Fetch stores error:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const getStoreCoverImage = (store) => {
    return (
      store?.coverImage?.url ||
      store?.galleryImages?.[0]?.url ||
      store?.profileImage?.url ||
      "https://via.placeholder.com/600x400?text=Restaurant"
    );
  };

  const getStoreProfileImage = (store) => {
    return (
      store?.profileImage?.url ||
      store?.coverImage?.url ||
      store?.galleryImages?.[0]?.url ||
      "https://via.placeholder.com/100x100?text=Store"
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this restaurant?")) return;

    try {
      setActionLoadingId(id);
      const res = await api.delete(`/restaurants/${id}`);

      if (res.data?.success) {
        setStores((prev) => prev.filter((store) => store._id !== id));
      } else {
        alert(res.data?.message || "Failed to delete restaurant");
      }
    } catch (err) {
      console.error("Delete error:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Failed to delete restaurant");
    } finally {
      setActionLoadingId("");
    }
  };

  const toggleOpen = async (id) => {
    const currentStore = stores.find((store) => store._id === id);
    if (!currentStore) return;

    if (currentStore.isDeleted) {
      alert("Deleted store cannot be opened or closed");
      return;
    }

    if (currentStore.isBlocked) {
      alert("Blocked store cannot be opened or closed");
      return;
    }

    try {
      setActionLoadingId(id);
      const res = await api.patch(`/restaurants/${id}/toggle-open`);

      if (res.data?.success) {
        const updatedStore = res.data?.data;

        if (updatedStore?._id) {
          setStores((prev) =>
            prev.map((store) => (store._id === id ? updatedStore : store))
          );
        } else {
          setStores((prev) =>
            prev.map((store) =>
              store._id === id ? { ...store, isOpen: !store.isOpen } : store
            )
          );
        }
      } else {
        alert(res.data?.message || "Failed to update open status");
      }
    } catch (err) {
      console.error("Toggle open error:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Failed to update open status");
    } finally {
      setActionLoadingId("");
    }
  };

  const toggleBusy = async (id) => {
    const currentStore = stores.find((store) => store._id === id);
    if (!currentStore) return;

    if (currentStore.isDeleted) {
      alert("Deleted store cannot be updated");
      return;
    }

    try {
      setActionLoadingId(id);
      const res = await api.patch(`/restaurants/${id}/toggle-busy`);

      if (res.data?.success) {
        const updatedStore = res.data?.data;

        if (updatedStore?._id) {
          setStores((prev) =>
            prev.map((store) => (store._id === id ? updatedStore : store))
          );
        } else {
          setStores((prev) =>
            prev.map((store) =>
              store._id === id ? { ...store, isBusy: !store.isBusy } : store
            )
          );
        }
      } else {
        alert(res.data?.message || "Failed to update busy status");
      }
    } catch (err) {
      console.error("Toggle busy error:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Failed to update busy status");
    } finally {
      setActionLoadingId("");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setActionLoadingId(id);

      const payload = {
        status,
        rejectionReason: status === "rejected" ? "Rejected by admin" : "",
      };

      const res = await api.patch(`/restaurants/${id}/status`, payload);

      if (res.data?.success) {
        const updatedStore = res.data?.data;

        if (updatedStore?._id) {
          setStores((prev) =>
            prev.map((store) => (store._id === id ? updatedStore : store))
          );
        } else {
          setStores((prev) =>
            prev.map((store) =>
              store._id === id ? { ...store, status } : store
            )
          );
        }
      } else {
        alert(res.data?.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Update status error:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Failed to update status");
    } finally {
      setActionLoadingId("");
    }
  };

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        store.name?.toLowerCase().includes(searchText) ||
        store.slug?.toLowerCase().includes(searchText) ||
        store.restaurantType?.toLowerCase().includes(searchText) ||
        store.address?.state?.toLowerCase().includes(searchText) ||
        store.address?.country?.toLowerCase().includes(searchText) ||
        store.address?.pincode?.toLowerCase().includes(searchText) ||
        store.address?.landmark?.toLowerCase().includes(searchText) ||
        store.ownerMobile?.toLowerCase().includes(searchText) ||
        store.cuisines?.join(", ")?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "all" ? true : store.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [stores, search, statusFilter]);

  const stats = useMemo(() => {
    return {
      totalStores: stores.length,
      openStores: stores.filter((s) => s.isOpen).length,
      activeStores: stores.filter((s) => s.status === "active").length,
      suspendedStores: stores.filter((s) => s.status === "suspended").length,
    };
  }, [stores]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "suspended":
        return "bg-red-100 text-red-700 border-red-200";
      case "rejected":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 px-5 py-6 text-white shadow-xl md:px-8 md:py-7">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-orange-500/10 to-transparent" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-slate-300">Restaurant Management</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Stores Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Manage all restaurants, update status, control visibility, and
                handle operations from one premium dashboard.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={fetchStores}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <RefreshCw size={18} />
                Refresh
              </button>

              <NavLink to="/Admindashboard/create">
                <button className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-md transition hover:scale-[1.02] hover:bg-slate-100">
                  <Plus size={18} />
                  Add Store
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search by name, slug, cuisine, state, pincode..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div className="relative">
              <Filter
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
              Showing {filteredStores.length} of {stores.length} stores
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Stores"
            value={stats.totalStores}
            icon={<Store size={20} />}
            iconBg="bg-slate-100"
            iconColor="text-slate-700"
          />
          <StatCard
            title="Open Stores"
            value={stats.openStores}
            icon={<CheckCircle2 size={20} />}
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            title="Active Stores"
            value={stats.activeStores}
            icon={<ShoppingBag size={20} />}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Suspended Stores"
            value={stats.suspendedStores}
            icon={<AlertCircle size={20} />}
            iconBg="bg-red-100"
            iconColor="text-red-600"
          />
        </div>

        <div className="space-y-5">
          {loading ? (
            <div className="rounded-[28px] border border-slate-200 bg-white py-20 text-center shadow-sm">
              <Loader2
                className="mx-auto mb-3 animate-spin text-slate-500"
                size={30}
              />
              <p className="text-slate-500">Loading stores...</p>
            </div>
          ) : filteredStores.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-20 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <Store className="text-slate-500" size={28} />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-800">
                No stores found
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Try changing the search or filter.
              </p>
            </div>
          ) : (
            filteredStores.map((store) => {
              const isProcessing = actionLoadingId === store._id;
              const isToggleDisabled =
                isProcessing || store.isDeleted || store.isBlocked;

              return (
                <div
                  key={store._id}
                  className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <div className="grid grid-cols-1 gap-4 p-3 sm:p-4 xl:grid-cols-[240px_minmax(0,1fr)_300px] 2xl:grid-cols-[260px_minmax(0,1fr)_320px]">
                    <div className="relative h-40 w-full overflow-hidden rounded-[20px] bg-slate-100 sm:h-44">
                      <img
                        src={getStoreCoverImage(store)}
                        alt={store.name}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/600x400?text=Restaurant";
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                      <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
                          {store.restaurantType || "Restaurant"}
                        </span>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize shadow ${getStatusStyle(
                            store.status
                          )}`}
                        >
                          {store.status || "inactive"}
                        </span>

                        {store.isBlocked && (
                          <span className="rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">
                            Blocked
                          </span>
                        )}
                      </div>

                      {/* <div className="absolute bottom-3 left-3 h-14 w-14 overflow-hidden rounded-2xl border-2 border-white bg-white shadow-lg">
                        <img
                          src={getStoreProfileImage(store)}
                          alt={store.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/100x100?text=Store";
                          }}
                        />
                      </div> */}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className="truncate text-xl font-bold text-slate-900 sm:text-2xl">
                            {store.name}
                          </h2>
                          <p className="mt-1 truncate text-sm text-slate-500">
                            {store.slug || "No slug available"}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 px-3 py-2 text-right">
                          <p className="text-xs text-slate-500">Rating</p>
                          <p className="text-sm font-bold text-slate-800">
                            ⭐ {store.ratings?.averageRating || 0}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                        <MapPin size={15} />
                        <span className="break-words">
                          {store.address?.landmark ||
                            store.address?.state ||
                            "Unknown Location"}
                          {store.address?.country
                            ? `, ${store.address.country}`
                            : ""}
                        </span>
                      </div>

                      <div className="mt-3 text-sm text-slate-600 break-words">
                        {store.cuisines?.length
                          ? store.cuisines.join(", ")
                          : "Cuisine not added"}
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                        <MiniInfo
                          label="Delivery"
                          value={`${store.deliveryTimeInMinutes || 0} mins`}
                        />
                        <MiniInfo
                          label="Min Order"
                          value={`₹${store.minimumOrderAmount || 0}`}
                        />
                        <MiniInfo
                          label="Orders"
                          value={store.totalOrders || 0}
                        />
                        <MiniInfo
                          label="Status"
                          value={store.status || "N/A"}
                          capitalize
                        />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {store.ownerMobile && (
                          <div className="inline-flex max-w-full items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            <Phone size={14} />
                            <span className="truncate">
                              Owner: {store.ownerMobile}
                            </span>
                          </div>
                        )}

                        {store.user && (
                          <div className="inline-flex max-w-full items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            <span className="truncate">User ID: {store.user}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <NavLink to={`/Admindashboard/stores/view/${store._id}`}>
                          <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
                            <Eye size={16} />
                            View
                          </button>
                        </NavLink>

                        <NavLink to={`/Admindashboard/stores/edit/${store._id}`}>
                          <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                            <Pencil size={16} />
                            Edit
                          </button>
                        </NavLink>

                        <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                          <Clock size={16} />
                          History
                        </button>

                        <button
                          onClick={() => handleDelete(store._id)}
                          disabled={isProcessing}
                          className={`inline-flex items-center gap-2 rounded-2xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 ${
                            isProcessing ? "cursor-not-allowed opacity-60" : ""
                          }`}
                        >
                          {isProcessing ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="rounded-[20px] border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-3">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500">Controls</p>
                          <h3 className="text-sm font-semibold text-slate-800">
                            Store Actions
                          </h3>
                        </div>
                        {isProcessing && (
                          <Loader2
                            size={16}
                            className="animate-spin text-slate-500"
                          />
                        )}
                      </div>

                      <div className="mb-4">
                        <p className="mb-2 text-xs font-medium text-slate-600">
                          Change Status
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => updateStatus(store._id, "active")}
                            disabled={isProcessing}
                            className={`rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                              store.status === "active"
                                ? "bg-green-600 text-white"
                                : "border border-green-200 bg-white text-green-700 hover:bg-green-50"
                            } ${
                              isProcessing ? "cursor-not-allowed opacity-60" : ""
                            }`}
                          >
                            Active
                          </button>

                          <button
                            onClick={() => updateStatus(store._id, "pending")}
                            disabled={isProcessing}
                            className={`rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                              store.status === "pending"
                                ? "bg-yellow-500 text-white"
                                : "border border-yellow-200 bg-white text-yellow-700 hover:bg-yellow-50"
                            } ${
                              isProcessing ? "cursor-not-allowed opacity-60" : ""
                            }`}
                          >
                            Pending
                          </button>

                          <button
                            onClick={() => updateStatus(store._id, "suspended")}
                            disabled={isProcessing}
                            className={`rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                              store.status === "suspended"
                                ? "bg-red-600 text-white"
                                : "border border-red-200 bg-white text-red-700 hover:bg-red-50"
                            } ${
                              isProcessing ? "cursor-not-allowed opacity-60" : ""
                            }`}
                          >
                            Suspended
                          </button>

                          <button
                            onClick={() => updateStatus(store._id, "rejected")}
                            disabled={isProcessing}
                            className={`rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                              store.status === "rejected"
                                ? "bg-rose-600 text-white"
                                : "border border-rose-200 bg-white text-rose-700 hover:bg-rose-50"
                            } ${
                              isProcessing ? "cursor-not-allowed opacity-60" : ""
                            }`}
                          >
                            Rejected
                          </button>
                        </div>
                      </div>

                      <div className="mb-3 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <div>
                          <p className="text-xs text-slate-500">Open / Close</p>
                          <p
                            className={`text-sm font-semibold ${
                              store.isOpen ? "text-green-600" : "text-red-500"
                            }`}
                          >
                            {store.isOpen ? "Open" : "Closed"}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleOpen(store._id)}
                          disabled={isToggleDisabled}
                          className={`relative h-7 w-14 rounded-full transition ${
                            store.isOpen ? "bg-green-500" : "bg-slate-300"
                          } ${
                            isToggleDisabled
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                              store.isOpen ? "left-8" : "left-1"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <div>
                          <p className="text-xs text-slate-500">Busy Mode</p>
                          <p
                            className={`text-sm font-semibold ${
                              store.isBusy
                                ? "text-orange-600"
                                : "text-slate-600"
                            }`}
                          >
                            {store.isBusy ? "Busy" : "Normal"}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleBusy(store._id)}
                          disabled={isProcessing || store.isDeleted}
                          className={`relative h-7 w-14 rounded-full transition ${
                            store.isBusy ? "bg-orange-500" : "bg-slate-300"
                          } ${
                            isProcessing || store.isDeleted
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                              store.isBusy ? "left-8" : "left-1"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-3">
                          <p className="text-xs text-slate-500">Visibility</p>
                          <p className="mt-1 text-sm font-semibold text-slate-800">
                            {store.isOpen ? "Running" : "Stopped"}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-3">
                          <p className="text-xs text-slate-500">Status</p>
                          <p className="mt-1 text-sm font-semibold capitalize text-slate-800">
                            {store.status || "N/A"}
                          </p>
                        </div>
                      </div>

                      <NavLink
                        to={`/Admindashboard/stores/view/${store._id}`}
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Full Details
                        <ChevronRight size={16} />
                      </NavLink>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, iconBg, iconColor }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function MiniInfo({ label, value, capitalize = false }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <p className="text-xs text-slate-500">{label}</p>
      <p
        className={`mt-1 text-sm font-semibold text-slate-800 ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}