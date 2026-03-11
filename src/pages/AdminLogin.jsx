import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import api from "../api/axios";
import { loginSuccess } from "../features/auth/authSlice";

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    server: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      server: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      server: "",
    };

    let isValid = true;

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        newErrors.email = "Please enter a valid email address";
        isValid = false;
      }
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      toast.error("Please fill the required fields");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        email: form.email.trim(),
        password: form.password,
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

        toast.success(res?.data?.message || "Admin login successful");
        navigate("/Admindashboard");
      } else {
        const message = res?.data?.message || "Login failed";
        setErrors((prev) => ({
          ...prev,
          server: message,
        }));
        toast.error(message);
      }
    } catch (err) {
      console.error("Admin login error:", err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Invalid email or password";

      setErrors((prev) => ({
        ...prev,
        server: message,
      }));

      toast.error(message);
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

        {errors.server && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {errors.server}
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
              className={`mt-1 w-full rounded-xl border px-4 py-3 transition focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-400 bg-red-50 focus:ring-red-300"
                  : "border-gray-300 focus:ring-orange-400"
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
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
              className={`mt-1 w-full rounded-xl border px-4 py-3 transition focus:outline-none focus:ring-2 ${
                errors.password || errors.server
                  ? "border-red-400 bg-red-50 focus:ring-red-300"
                  : "border-gray-300 focus:ring-orange-400"
              }`}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
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