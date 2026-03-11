import React, { useEffect, useMemo, useState } from "react";
import {
  Store,
  Search,
  Plus,
  X,
  Loader2,
  User,
  Phone,
  Mail,
  ShieldCheck,
  UserCheck,
  UserX,
  RefreshCw,
  Save,
} from "lucide-react";
import api from "../../api/axios";

export default function RestaurantUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const [search, setSearch] = useState("");

  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    gender: "",
    isActive: true,
    isVerified: false,
  });

  // =========================
  // Helpers
  // =========================
  const isValidIndianMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);
  const isValidEmail = (email) =>
    !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const resetCreateForm = () => {
    setCreateForm({
      name: "",
      email: "",
      mobile: "",
      password: "",
      gender: "",
      isActive: true,
      isVerified: false,
    });
  };

  // =========================
  // Fetch Users
  // =========================
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/restowners/all");

      // Support both:
      // 1. res.data.data
      // 2. res.data.users
      const allUsers = res.data?.data || res.data?.users || [];

      // Sirf restaurant role wale users filter kar diye
      const restaurantUsers = allUsers.filter(
        (user) =>
          user?.role === "restaurant" ||
          user?.role === "restaurantOwner" ||
          user?.role === "restaurant_admin"
      );

      setUsers(restaurantUsers);
    } catch (error) {
      console.error("Fetch restaurant users error:", error);
      alert(error?.response?.data?.message || "Failed to fetch restaurant users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // Search Filter
  // =========================
  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (!q) return users;

    return users.filter((user) => {
      const name = user?.name?.toLowerCase() || "";
      const email = user?.email?.toLowerCase() || "";
      const mobile = user?.mobile?.toLowerCase() || "";
      const role = user?.role?.toLowerCase() || "";

      return (
        name.includes(q) ||
        email.includes(q) ||
        mobile.includes(q) ||
        role.includes(q)
      );
    });
  }, [users, search]);

  // =========================
  // Create Restaurant User
  // =========================
  const handleCreateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreateForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!createForm.name.trim()) {
      return alert("Name is required");
    }

    if (!createForm.mobile.trim()) {
      return alert("Mobile number is required");
    }

    if (!isValidIndianMobile(createForm.mobile)) {
      return alert("Enter a valid 10-digit Indian mobile number");
    }

    if (createForm.email && !isValidEmail(createForm.email)) {
      return alert("Enter a valid email address");
    }

    if (!createForm.password.trim()) {
      return alert("Password is required");
    }

    if (createForm.password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    try {
      setCreating(true);

      const payload = {
        name: createForm.name.trim(),
        email: createForm.email.trim(),
        mobile: createForm.mobile.trim(),
        password: createForm.password,
        gender: createForm.gender,
        isActive: createForm.isActive,
        isVerified: createForm.isVerified,
        role: "restaurant", // Important
      };

      const res = await api.post("/users/create", payload);

      alert(res.data?.message || "Restaurant user created successfully");
      setCreateOpen(false);
      resetCreateForm();
      fetchUsers();
    } catch (error) {
      console.error("Create restaurant user error:", error);
      alert(error?.response?.data?.message || "Failed to create restaurant user");
    } finally {
      setCreating(false);
    }
  };

  // =========================
  // Toggle Active Status
  // =========================
  const handleToggleStatus = async (userId) => {
    try {
      setActionLoading(userId);
      const res = await api.patch(`/users/${userId}/status`);
      alert(res.data?.message || "User status updated");
      fetchUsers();
    } catch (error) {
      console.error("Toggle status error:", error);
      alert(error?.response?.data?.message || "Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
            <Store className="h-7 w-7 text-orange-500" />
            Restaurant Users
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View all restaurant accounts and create new restaurant users from here.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={fetchUsers}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>

          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            <Plus className="h-4 w-4" />
            Create Restaurant User
          </button>
        </div>
      </div>

      {/* Top Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Restaurant Users</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-800">
                {users.length}
              </h3>
            </div>
            <div className="rounded-xl bg-orange-100 p-3">
              <Store className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active Users</p>
              <h3 className="mt-2 text-2xl font-bold text-emerald-600">
                {users.filter((u) => u?.isActive).length}
              </h3>
            </div>
            <div className="rounded-xl bg-emerald-100 p-3">
              <UserCheck className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Inactive Users</p>
              <h3 className="mt-2 text-2xl font-bold text-red-600">
                {users.filter((u) => !u?.isActive).length}
              </h3>
            </div>
            <div className="rounded-xl bg-red-100 p-3">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Verified Users</p>
              <h3 className="mt-2 text-2xl font-bold text-blue-600">
                {users.filter((u) => u?.isVerified).length}
              </h3>
            </div>
            <div className="rounded-xl bg-blue-100 p-3">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
          />
        </div>
      </div>

      {/* Table / Cards */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center p-6 text-center">
            <Store className="mb-3 h-12 w-12 text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-700">
              No restaurant users found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Create a new restaurant account or try another search.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr className="text-left text-slate-600">
                    <th className="px-5 py-4 font-semibold">User</th>
                    <th className="px-5 py-4 font-semibold">Contact</th>
                    <th className="px-5 py-4 font-semibold">Role</th>
                    <th className="px-5 py-4 font-semibold">Verified</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Created</th>
                    <th className="px-5 py-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="grid h-11 w-11 place-items-center rounded-full bg-orange-100 text-orange-600">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {user?.name || "N/A"}
                            </p>
                            <p className="text-xs text-slate-500">
                              ID: {user?._id?.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <p className="flex items-center gap-2 text-slate-700">
                            <Phone className="h-4 w-4 text-slate-400" />
                            {user?.mobile || "N/A"}
                          </p>
                          <p className="flex items-center gap-2 text-slate-700">
                            <Mail className="h-4 w-4 text-slate-400" />
                            {user?.email || "N/A"}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold capitalize text-orange-700">
                          {user?.role || "restaurant"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {user?.isVerified ? (
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            Verified
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            Not Verified
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        {user?.isActive ? (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Active
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {user?.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handleToggleStatus(user._id)}
                            disabled={actionLoading === user._id}
                            className={`inline-flex min-w-[120px] items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                              user?.isActive
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                            } disabled:cursor-not-allowed disabled:opacity-60`}
                          >
                            {actionLoading === user._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : user?.isActive ? (
                              <>
                                <UserX className="h-4 w-4" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-4 w-4" />
                                Activate
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Cards */}
            <div className="grid gap-4 p-4 lg:hidden">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-orange-100 text-orange-600">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {user?.name || "N/A"}
                        </h3>
                        <p className="text-xs text-slate-500">
                          ID: {user?._id?.slice(-8)}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user?.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user?.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-slate-700">
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      {user?.mobile || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" />
                      {user?.email || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-slate-400" />
                      Role: {user?.role || "restaurant"}
                    </p>
                    <p className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-slate-400" />
                      {user?.isVerified ? "Verified" : "Not Verified"}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => handleToggleStatus(user._id)}
                      disabled={actionLoading === user._id}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        user?.isActive
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      } disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                      {actionLoading === user._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : user?.isActive ? (
                        <>
                          <UserX className="h-4 w-4" />
                          Deactivate Account
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-4 w-4" />
                          Activate Account
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Create Modal */}
      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Create Restaurant User
                </h2>
                <p className="text-sm text-slate-500">
                  Add a new restaurant account from this page.
                </p>
              </div>

              <button
                onClick={() => {
                  setCreateOpen(false);
                  resetCreateForm();
                }}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={createForm.name}
                    onChange={handleCreateChange}
                    placeholder="Enter full name"
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={createForm.mobile}
                    onChange={handleCreateChange}
                    placeholder="Enter 10-digit mobile"
                    maxLength={10}
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={createForm.email}
                    onChange={handleCreateChange}
                    placeholder="Enter email"
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={createForm.password}
                    onChange={handleCreateChange}
                    placeholder="Enter password"
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={createForm.gender}
                    onChange={handleCreateChange}
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-orange-400"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col justify-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={createForm.isActive}
                      onChange={handleCreateChange}
                      className="h-4 w-4 rounded"
                    />
                    Active Account
                  </label>

                  <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      name="isVerified"
                      checked={createForm.isVerified}
                      onChange={handleCreateChange}
                      className="h-4 w-4 rounded"
                    />
                    Verified Account
                  </label>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setCreateOpen(false);
                    resetCreateForm();
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {creating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Create Restaurant User
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}