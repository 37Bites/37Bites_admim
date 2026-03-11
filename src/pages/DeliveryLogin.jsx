import React, { useEffect, useRef, useState } from "react";
import { Bike, X, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

export default function DeliveryLogin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(116);

  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [errors, setErrors] = useState({
    mobile: "",
    otp: "",
    server: "",
  });

  const inputRefs = useRef([]);

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(value);

    setErrors((prev) => ({
      ...prev,
      mobile: "",
      server: "",
    }));
  };

  const validateMobile = () => {
    const newErrors = {
      mobile: "",
      otp: "",
      server: "",
    };

    let isValid = true;

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (mobile.length !== 10) {
      newErrors.mobile = "Please enter a valid 10 digit mobile number";
      isValid = false;
    }

    setErrors((prev) => ({
      ...prev,
      ...newErrors,
    }));

    if (!isValid) {
      toast.error(newErrors.mobile || "Please enter a valid mobile number");
    }

    return isValid;
  };

  const validateOtp = () => {
    const enteredOtp = otp.join("");
    let otpError = "";

    if (!enteredOtp.trim()) {
      otpError = "OTP is required";
    } else if (enteredOtp.length !== 6) {
      otpError = "Please enter 6 digit OTP";
    }

    setErrors((prev) => ({
      ...prev,
      otp: otpError,
      server: "",
    }));

    if (otpError) {
      toast.error(otpError);
      return false;
    }

    return true;
  };

  const handleContinue = async () => {
    if (!validateMobile()) return;

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        mobile,
        role: "delivery",
      });

      if (res?.data?.success) {
        setShowOtpModal(true);
        setTimer(116);
        setOtp(["", "", "", "", "", ""]);

        setErrors({
          mobile: "",
          otp: "",
          server: "",
        });

        toast.success(res?.data?.message || "OTP sent successfully");
      } else {
        const message = res?.data?.message || "Failed to send OTP";

        setErrors((prev) => ({
          ...prev,
          server: message,
        }));

        toast.error(message);
      }
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to send OTP";

      setErrors((prev) => ({
        ...prev,
        server: message,
      }));

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!validateOtp()) return;

    const enteredOtp = otp.join("");

    try {
      setOtpLoading(true);

      const res = await api.post("/auth/verify-otp", {
        mobile,
        otp: enteredOtp,
        role: "delivery",
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message || "OTP verified successfully");

        setErrors({
          mobile: "",
          otp: "",
          server: "",
        });

        setTimeout(() => {
          if (res.data.isProfileComplete) {
            navigate("/DeliveryDashboars");
          } else {
            navigate("/DeliveryDashboars");
          }
        }, 1200);
      } else {
        const message = res?.data?.message || "OTP verification failed";

        setErrors((prev) => ({
          ...prev,
          server: message,
        }));

        toast.error(message);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || "OTP verification failed";

      setErrors((prev) => ({
        ...prev,
        server: message,
      }));

      toast.error(message);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(0, 1);

    const updated = [...otp];
    updated[index] = digit;
    setOtp(updated);

    setErrors((prev) => ({
      ...prev,
      otp: "",
      server: "",
    }));

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const updated = [...otp];
        updated[index] = "";
        setOtp(updated);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResendOtp = async () => {
    if (timer !== 0) return;

    try {
      setResendLoading(true);

      const res = await api.post("/auth/login", {
        mobile,
        role: "delivery",
      });

      if (res?.data?.success) {
        setTimer(116);
        setOtp(["", "", "", "", "", ""]);

        setErrors((prev) => ({
          ...prev,
          otp: "",
          server: "",
        }));

        toast.success(res?.data?.message || "OTP resent successfully");
      } else {
        const message = res?.data?.message || "Failed to resend OTP";

        setErrors((prev) => ({
          ...prev,
          server: message,
        }));

        toast.error(message);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to resend OTP";

      setErrors((prev) => ({
        ...prev,
        server: message,
      }));

      toast.error(message);
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    if (!showOtpModal || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [showOtpModal, timer]);

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-10 text-white shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-[#ff6b4a]">
              37 Bites
            </h1>
            <p className="text-sm text-white/70">Delivery Partner Portal</p>
          </div>

          <button
            onClick={() => navigate("/secure-admin-login")}
            className="flex items-center gap-2 rounded-lg bg-white/20 px-3 py-2 text-sm hover:bg-white/30"
          >
            <Shield size={16} />
            Admin Login
          </button>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="rounded-full bg-white/20 p-4">
            <Bike size={30} />
          </div>
        </div>

        <h2 className="mt-6 text-center text-xl font-semibold">
          Login to start delivering
        </h2>

        <div className="mt-8">
          <label className="text-sm text-white/70">Mobile Number</label>

          <div
            className={`mt-2 flex h-12 items-center rounded-xl px-4 ${
              errors.mobile
                ? "border border-red-400 bg-red-400/10"
                : "bg-white/20"
            }`}
          >
            <span className="mr-2">+91</span>

            <input
              type="text"
              value={mobile}
              onChange={handleMobileChange}
              placeholder="Enter mobile number"
              className="w-full bg-transparent outline-none placeholder-white/60"
            />
          </div>

          {errors.mobile && (
            <p className="mt-2 text-sm text-red-300">{errors.mobile}</p>
          )}

          {errors.server && !showOtpModal && (
            <p className="mt-2 text-sm text-red-300">{errors.server}</p>
          )}

          <button
            onClick={handleContinue}
            disabled={loading}
            className="mt-6 h-12 w-full rounded-xl bg-gradient-to-r from-[#ff6b4a] to-[#ff3d2f] font-semibold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Sending OTP..." : "Continue"}
          </button>
        </div>
      </div>

      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-[420px] rounded-2xl bg-white p-8 text-center shadow-xl">
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute right-4 top-4 text-gray-500"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold text-gray-800">Verify OTP</h2>

            <p className="mt-2 text-gray-600">OTP sent to +91{mobile}</p>

            <div className="mt-6 flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  inputMode="numeric"
                  className={`h-14 w-12 rounded-lg border text-center text-xl font-bold outline-none ${
                    errors.otp || errors.server
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>

            {errors.otp && (
              <p className="mt-3 text-sm text-red-500">{errors.otp}</p>
            )}

            {errors.server && showOtpModal && (
              <p className="mt-3 text-sm text-red-500">{errors.server}</p>
            )}

            <button
              onClick={handleVerify}
              disabled={otpLoading}
              className="mt-6 h-12 w-full rounded-lg bg-[#ff4b2b] font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {otpLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="mt-4 text-sm">
              <button
                onClick={handleResendOtp}
                disabled={timer !== 0 || resendLoading}
                className={`${
                  timer === 0 && !resendLoading
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {resendLoading ? "Resending..." : "Resend OTP"}
              </button>

              {timer !== 0 && (
                <span className="ml-2 text-gray-500">in {timer}s</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}