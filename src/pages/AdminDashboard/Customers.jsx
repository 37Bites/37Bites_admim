import React, { useEffect, useState } from "react";
import { Trash2, Bell } from "lucide-react";
import api from "../../api/axios";

export default function AllUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH ALL USERS =================
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.data); // 👈 agar backend me data inside data ho
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE USER =================
  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      fetchUsers(); // refresh list
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="p-6">Loading users...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold">All Users</h2>
        <Bell className="w-5 h-5 text-gray-600" />
      </div>

      {/* User List */}
      <div className="bg-white rounded-xl shadow divide-y">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-4 w-1/3">
              <div className="w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-full font-semibold uppercase">
                {user.name?.[0]}
              </div>

              <div>
                <h4 className="font-medium capitalize">{user.name}</h4>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="w-1/6">{user.phone}</div>

            <div className="w-1/6">
              <span className="px-3 py-1 rounded-lg bg-green-100 text-green-600">
                {user.status}
              </span>
            </div>

            <div className="w-1/6">
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                {user.role}
              </span>
            </div>

            <div className="w-1/6 text-sm">
              <p>Saved: {user.saved || 0}</p>
              <p>Viewed: {user.viewed || 0}</p>
            </div>

            <div className="flex items-center gap-4 w-1/6 justify-end">
              <button className="text-blue-600 text-sm">
                View
              </button>

              <Trash2
                onClick={() => handleDelete(user._id)}
                className="w-4 h-4 text-red-500 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}