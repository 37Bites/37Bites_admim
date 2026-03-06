import React, { useEffect, useMemo, useState } from "react";
import {
  Trash2,
  Bell,
  Pencil,
  Search,
  Users,
  UserCheck,
  UserX,
  Shield,
  X,
  Loader2,
  Save,
} from "lucide-react";
import api from "../../api/axios";

export default function AllUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editForm, setEditForm] = useState({
    mobile: "",
    role: "",
    isVerified: false,
    isActive: false,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users/all");
      setUsers(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setActionLoading(userId);
      await api.delete(`/users/${userId}`);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Delete failed:", error);
      alert(error?.response?.data?.message || "Failed to delete user");
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      setActionLoading(userId);
      const res = await api.patch(`/users/${userId}/status`);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId
            ? { ...user, isActive: res.data?.data?.isActive }
            : user
        )
      );
    } catch (error) {
      console.error("Toggle failed:", error);
      alert(error?.response?.data?.message || "Failed to update user status");
    } finally {
      setActionLoading(null);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm({
      mobile: user.mobile || "",
      role: user.role || "user",
      isVerified: !!user.isVerified,
      isActive: !!user.isActive,
    });
    setEditOpen(true);
  };

  const closeEditModal = () => {
    setEditOpen(false);
    setSelectedUser(null);
    setEditForm({
      mobile: "",
      role: "",
      isVerified: false,
      isActive: false,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveEdit = async () => {
    if (!selectedUser?._id) return;

    try {
      setSaving(true);

      const payload = {
        mobile: editForm.mobile,
        role: editForm.role,
        isVerified: editForm.isVerified,
        isActive: editForm.isActive,
      };

      // FIXED: backend PATCH route use karo
      const res = await api.patch(`/users/${selectedUser._id}`, payload);

      const updatedUser = res.data?.data || {
        ...selectedUser,
        ...payload,
      };

      setUsers((prev) =>
        prev.map((user) =>
          user._id === selectedUser._id ? updatedUser : user
        )
      );

      closeEditModal();
    } catch (error) {
      console.error("Update failed:", error);
      alert(error?.response?.data?.message || "Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const text = search.toLowerCase();
      return (
        !search ||
        user.mobile?.toLowerCase().includes(text) ||
        user.role?.toLowerCase().includes(text)
      );
    });
  }, [users, search]);

  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((u) => u.isActive).length,
      inactive: users.filter((u) => !u.isActive).length,
      verified: users.filter((u) => u.isVerified).length,
    };
  }, [users]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-12 text-center shadow-sm">
          <Loader2 className="mx-auto mb-3 animate-spin text-slate-500" size={30} />
          <p className="text-lg font-semibold text-slate-700">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-4 md:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-[30px] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-xl md:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm text-slate-300">User Management</p>
                <h2 className="mt-1 text-2xl font-bold md:text-3xl">
                  All Users
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  Manage customer records, status, verification and profile updates.
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <Bell className="text-white" size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search by mobile or role..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Users"
              value={stats.total}
              icon={<Users size={20} />}
              iconBg="bg-slate-100"
              iconColor="text-slate-700"
            />
            <StatCard
              title="Active Users"
              value={stats.active}
              icon={<UserCheck size={20} />}
              iconBg="bg-green-100"
              iconColor="text-green-600"
            />
            <StatCard
              title="Inactive Users"
              value={stats.inactive}
              icon={<UserX size={20} />}
              iconBg="bg-red-100"
              iconColor="text-red-600"
            />
            <StatCard
              title="Verified Users"
              value={stats.verified}
              icon={<Shield size={20} />}
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
            />
          </div>

          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h3 className="text-lg font-bold text-slate-900">Users List</h3>
              <p className="text-sm text-slate-500">
                Update user information and manage user status.
              </p>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                  <Users className="text-slate-500" size={28} />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-slate-800">
                  No users found
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Try changing the search input.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px]">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-sm font-semibold text-slate-600">
                      <th className="px-5 py-4">User</th>
                      <th className="px-5 py-4">Role</th>
                      <th className="px-5 py-4">Verified</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Joined</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="border-t border-slate-100 transition hover:bg-slate-50/70"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-bold text-white shadow-sm">
                              {user.mobile?.slice(-2) || "US"}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">
                                {user.mobile || "No Mobile"}
                              </p>
                              <p className="text-xs text-slate-500">
                                ID: {user._id?.slice(-8)}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold capitalize text-blue-600">
                            {user.role || "user"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              user.isVerified
                                ? "bg-green-100 text-green-600"
                                : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {user.isVerified ? "Verified" : "Not Verified"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <button
                            disabled={actionLoading === user._id}
                            onClick={() => handleToggleStatus(user._id)}
                            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                              user.isActive
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                            } ${
                              actionLoading === user._id
                                ? "cursor-not-allowed opacity-60"
                                : ""
                            }`}
                          >
                            {actionLoading === user._id
                              ? "Processing..."
                              : user.isActive
                              ? "Active"
                              : "Inactive"}
                          </button>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => openEditModal(user)}
                              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                              <Pencil size={15} />
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(user._id)}
                              disabled={actionLoading === user._id}
                              className={`inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 ${
                                actionLoading === user._id
                                  ? "cursor-not-allowed opacity-60"
                                  : ""
                              }`}
                            >
                              <Trash2 size={15} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-sm text-slate-500">User Management</p>
                <h3 className="text-xl font-bold text-slate-900">Edit User</h3>
              </div>

              <button
                onClick={closeEditModal}
                className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 px-6 py-6 md:grid-cols-2">
              <FormField label="Mobile Number">
                <input
                  type="text"
                  name="mobile"
                  value={editForm.mobile}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  placeholder="Enter mobile number"
                />
              </FormField>

              <FormField label="Role">
                <select
                  name="role"
                  value={editForm.role}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="delivery">Delivery</option>
                </select>
              </FormField>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Verified User
                    </p>
                    <p className="text-xs text-slate-500">
                      Mark this user as verified
                    </p>
                  </div>

                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      name="isVerified"
                      checked={editForm.isVerified}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-green-500" />
                    <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
                  </label>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Active Status
                    </p>
                    <p className="text-xs text-slate-500">
                      Enable or disable user access
                    </p>
                  </div>

                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={editForm.isActive}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-orange-500" />
                    <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 px-6 py-5">
              <button
                onClick={closeEditModal}
                className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveEdit}
                disabled={saving}
                className={`inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 ${
                  saving ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                {saving ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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

function FormField({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}