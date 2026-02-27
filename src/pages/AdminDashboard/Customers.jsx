import React, { useEffect, useState } from "react";
import { Trash2, Bell } from "lucide-react";
import api from "../../api/axios";

export default function AllUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE USER =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setActionLoading(id);
      await api.delete(`/users/${id}`);

      // remove from UI instantly
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setActionLoading(null);
    }
  };

  // ================= TOGGLE STATUS =================
  const handleToggleStatus = async (id) => {
    try {
      setActionLoading(id);

      const res = await api.patch(`/users/${id}/toggle-status`);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? { ...user, isActive: res.data.data.isActive }
            : user
        )
      );
    } catch (error) {
      console.error("Toggle failed:", error);
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <p className="p-6">Loading users...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold">All Users</h2>
        <Bell className="w-5 h-5 text-gray-600" />
      </div>

      {/* Table Header */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="grid grid-cols-6 font-semibold text-sm bg-gray-50 p-4 border-b">
          <div>User</div>
          <div>Role</div>
          <div>Verified</div>
          <div>Status</div>
          <div>Joined</div>
          <div className="text-right">Actions</div>
        </div>

        {/* Users List */}
        {users.map((user) => (
          <div
            key={user._id}
            className="grid grid-cols-6 items-center p-4 border-b hover:bg-gray-50 transition"
          >
            {/* User Mobile */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-orange-500 text-white flex items-center justify-center rounded-full font-semibold text-sm">
                {user.mobile?.slice(-2)}
              </div>
              <div>
                <p className="font-medium">{user.mobile}</p>
              </div>
            </div>

            {/* Role */}
            <div>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs capitalize">
                {user.role}
              </span>
            </div>

            {/* Verified */}
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  user.isVerified
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {user.isVerified ? "Verified" : "Not Verified"}
              </span>
            </div>

            {/* Active / Inactive */}
            <div>
              <button
                disabled={actionLoading === user._id}
                onClick={() => handleToggleStatus(user._id)}
                className={`px-4 py-1 rounded-full text-xs font-medium transition ${
                  user.isActive
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                {actionLoading === user._id
                  ? "Processing..."
                  : user.isActive
                  ? "Active"
                  : "Inactive"}
              </button>
            </div>

            {/* Created At */}
            <div className="text-sm text-gray-600">
              {new Date(user.createdAt).toLocaleDateString()}
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <Trash2
                onClick={() => handleDelete(user._id)}
                className="w-4 h-4 text-red-500 cursor-pointer hover:scale-110 transition"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}