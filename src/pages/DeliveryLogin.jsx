import React, { useEffect, useRef, useState } from "react";
import { Bike, X, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function DeliveryLogin() {

  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(116);

  const inputRefs = useRef([]);

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(value);
  };

  /* SEND OTP */
  const handleContinue = async () => {

    if (mobile.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    try {

      const res = await api.post("/auth/login", {
        mobile,
        role: "delivery",
      });

      if (res.data.success) {
        setShowOtpModal(true);
        setTimer(116);
        setOtp(["", "", "", "", "", ""]);
      }

    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }

  };

  /* VERIFY OTP */
  const handleVerify = async () => {

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Enter 6 digit OTP");
      return;
    }

    try {

      const res = await api.post("/auth/verify-otp", {
        mobile,
        otp: enteredOtp,
        role: "delivery",
      });

      if (res.data.success) {

        if (res.data.isProfileComplete) {
          window.location.href = "/DeliveryDashboars";
        } else {
          window.location.href = "/DeliveryDashboars";
        }

      }

    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }

  };

  const handleOtpChange = (value, index) => {

    const digit = value.replace(/\D/g, "").slice(0, 1);

    const updated = [...otp];
    updated[index] = digit;

    setOtp(updated);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {

    if (timer !== 0) return;

    await api.post("/auth/login", {
      mobile,
      role: "delivery",
    });

    setTimer(116);
    setOtp(["", "", "", "", "", ""]);

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
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="absolute inset-0 bg-black/70"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 text-white">

        {/* HEADER */}
        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-extrabold text-[#ff6b4a]">
              37 Bites
            </h1>

            <p className="text-white/70 text-sm">
              Delivery Partner Portal
            </p>

          </div>

          {/* ADMIN LOGIN BUTTON */}
          <button
            onClick={() => navigate("/secure-admin-login")}
            className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg hover:bg-white/30 text-sm"
          >
            <Shield size={16} />
            Admin Login
          </button>

        </div>

        {/* ICON */}
        <div className="flex justify-center mt-6">
          <div className="bg-white/20 p-4 rounded-full">
            <Bike size={30}/>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center mt-6">
          Login to start delivering
        </h2>

        {/* MOBILE INPUT */}
        <div className="mt-8">

          <label className="text-sm text-white/70">
            Mobile Number
          </label>

          <div className="flex items-center bg-white/20 rounded-xl px-4 h-12 mt-2">

            <span className="mr-2">+91</span>

            <input
              type="text"
              value={mobile}
              onChange={handleMobileChange}
              placeholder="Enter mobile number"
              className="bg-transparent outline-none w-full placeholder-white/60"
            />

          </div>

          <button
            onClick={handleContinue}
            className="w-full mt-6 bg-gradient-to-r from-[#ff6b4a] to-[#ff3d2f] h-12 rounded-xl font-semibold hover:opacity-90"
          >
            Continue
          </button>

        </div>

      </div>

      {/* OTP MODAL */}
      {showOtpModal && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-white rounded-2xl shadow-xl p-8 w-[420px] text-center relative">

            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute right-4 top-4 text-gray-500"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold">
              Verify OTP
            </h2>

            <p className="mt-2 text-gray-600">
              OTP sent to +91{mobile}
            </p>

            <div className="flex justify-center gap-3 mt-6">

              {otp.map((digit, index) => (

                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) =>
                    handleOtpChange(e.target.value, index)
                  }
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  className="w-12 h-14 border rounded-lg text-center text-xl font-bold"
                />

              ))}

            </div>

            <button
              onClick={handleVerify}
              className="w-full mt-6 bg-[#ff4b2b] text-white h-12 rounded-lg font-bold"
            >
              Verify OTP
            </button>

            <div className="mt-4 text-sm">

              <button
                onClick={handleResendOtp}
                disabled={timer !== 0}
                className={`${timer === 0 ? "text-red-500" : "text-gray-400"}`}
              >
                Resend OTP
              </button>

              {timer !== 0 && (
                <span className="ml-2 text-gray-500">
                  in {timer}s
                </span>
              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}