import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../api/axios";
import { loginSuccess } from "../features/auth/authSlice";

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const validateForm = () => {
    if (!form.email.trim() || !form.password.trim()) {
      setError("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setError("Please enter a valid email address");
      return false;
    }

    if (form.password.trim().length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        email: form.email.trim(),
        password: form.password.trim(),
      };

      const res = await api.post("/admin/login", payload);

      if (res?.data?.success) {
        dispatch(
          loginSuccess({
            user: res.data?.user || null,
            accessToken: res.data?.accessToken || null,
            refreshToken: res.data?.refreshToken || null,
          })
        );

        navigate("/Admindashboard");
      } else {
        setError(res?.data?.message || "Login failed");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-orange-100 bg-white p-8 shadow-xl">
        <div className="mb-6 flex flex-col items-center">
          <img
            src="/logo.jpeg"
            alt="Admin Logo"
            className="mb-3 h-20 w-20 rounded-2xl object-cover shadow-md"
          />
          <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
          <p className="mt-1 text-center text-sm text-gray-500">
            Welcome back! Please login to continue
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              autoComplete="email"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 rounded-xl bg-orange-500 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-orange-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}