import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/admin/login", form);

      if (res.data.success) {
        navigate("/Admindashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-gray-100">

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/logo.jpeg"
            alt="Admin Logo"
            className="w-20 h-20 mb-3"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Admin Login
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back! Please login to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium text-sm">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-medium text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}