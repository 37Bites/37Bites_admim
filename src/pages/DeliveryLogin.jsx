import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function DeliveryLogin() {
  const [mobile, setMobile] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(116);

  const inputRefs = useRef([]);

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(value);
  };

  const handleContinue = () => {
    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    setShowOtpModal(true);
    setTimer(116);
    setOtp(["", "", "", "", "", ""]);
  };

  const closeModal = () => {
    setShowOtpModal(false);
  };

  const handleOtpChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(0, 1);
    const updatedOtp = [...otp];
    updatedOtp[index] = digit;
    setOtp(updatedOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      alert("Please enter 6-digit OTP");
      return;
    }

    alert(`OTP Verified: ${enteredOtp}`);
    // navigate("/delivery-dashboard")
  };

  const handleResendOtp = () => {
    if (timer === 0) {
      setTimer(116);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  useEffect(() => {
    if (!showOtpModal || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [showOtpModal, timer]);

  useEffect(() => {
    if (showOtpModal) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [showOtpModal]);

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center px-4 py-8">
      {/* Main Login Card */}
      <div className="w-full max-w-[560px] bg-[#f7f7f7] rounded-[22px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100">
        {/* Top */}
        <div className="px-6 sm:px-10 pt-10 pb-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 flex items-center justify-center text-[#ff6f59] font-black text-6xl leading-none">
               <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain" />
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-[60%] -translate-y-[15%] w-9 h-7 border-[5px] border-[#ff6f59] border-b-0 rotate-0 rounded-t-sm" />
              <div className="absolute left-[23px] top-[38px] w-5 h-5 bg-[#ff6f59] rounded-sm flex items-center justify-center">
                <div className="w-2.5 h-2.5 border border-white rounded-[2px]" />
              </div>
            </div>
          </div>

          <h1 className="text-[28px] sm:text-[30px] font-extrabold text-[#102a4c]">
            Delivery / Agent Login
          </h1>
          <p className="text-[#5f7188] mt-2 text-base sm:text-lg">
            Secure access to your dashboard
          </p>
        </div>

        <div className="border-t border-gray-200 px-6 sm:px-10 py-8 sm:py-10">
          <label className="block text-[#1d3557] font-semibold text-[18px] mb-3">
            <span className="text-red-500">*</span> Mobile Number
          </label>

          <div className="w-full h-[52px] sm:h-[56px] border border-gray-300 rounded-xl bg-white flex items-center px-4 text-[18px] text-gray-700">
            <span className="text-gray-500 mr-2">+91</span>
            <input
              type="text"
              value={mobile}
              onChange={handleMobileChange}
              placeholder="Enter 10-digit mobile number"
              className="w-full bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>

          <button
            onClick={handleContinue}
            className="w-full mt-8 bg-[#ff5a47] hover:bg-[#f34f3b] text-white font-bold text-lg sm:text-[18px] h-[56px] rounded-xl transition"
          >
            Continue to Dashboard
          </button>

          <p className="text-center text-[#7b8798] mt-8 text-sm sm:text-base">
            Only authorized Delivery Partners can access the system
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-black/35 flex items-center justify-center px-4">
          <div className="w-full max-w-[760px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.22)] relative overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-7">
              <h2 className="text-2xl sm:text-[30px] font-bold text-[#2b2b2b]">
                Verify OTP
              </h2>

              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={30} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-5 sm:px-8 pb-7 sm:pb-10 pt-4 text-center">
              {/* Logo */}
              <div className="flex flex-col items-center justify-center mt-2">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 flex items-center justify-center text-[#315b4d] font-black text-6xl leading-none">
                    B
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-[60%] -translate-y-[15%] w-9 h-7 border-[5px] border-[#ef6b57] border-b-0 rounded-t-sm" />
                  <div className="absolute left-[27px] top-[43px] w-5 h-5 bg-[#ef6b57] rounded-sm flex items-center justify-center">
                    <div className="w-2.5 h-2.5 border border-white rounded-[2px]" />
                  </div>
                </div>

                <div className="-mt-1">
                  <p className="text-[20px] sm:text-[24px] font-extrabold text-[#315b4d] leading-none">
                    Basera
                  </p>
                  <p className="text-[12px] tracking-[0.25em] font-bold text-[#ef6b57] mt-1">
                    HUB
                  </p>
                </div>
              </div>

              <p className="mt-8 text-[20px] sm:text-[22px] text-[#333]">
                Enter the 6-digit OTP sent to
                <span className="font-bold"> +91{mobile}</span>
              </p>

              {/* OTP Inputs */}
              <div className="flex justify-center gap-2 sm:gap-3 mt-6 flex-wrap">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    className={`w-11 h-14 sm:w-14 sm:h-16 rounded-lg border text-center text-2xl font-semibold outline-none transition ${
                      index === 0 && !digit
                        ? "border-2 border-[#2f2f2f]"
                        : "border border-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleVerify}
                className="w-full mt-8 h-[52px] sm:h-[56px] rounded-xl bg-[#ef5b56] hover:bg-[#e44d47] text-white font-bold text-lg transition"
              >
                Verify
              </button>

              <div className="mt-5 text-left text-base sm:text-lg">
                <button
                  onClick={handleResendOtp}
                  disabled={timer !== 0}
                  className={`mr-2 ${
                    timer === 0
                      ? "text-[#ef5b56] font-medium"
                      : "text-[#f29b9b] cursor-not-allowed"
                  }`}
                >
                  Resend OTP
                </button>

                {timer !== 0 && (
                  <span className="text-[#ff5449]">
                    You can resend in {timer}s
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}