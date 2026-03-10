import React, { useEffect, useMemo, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Loader2,
  Clock3,
  MapPinned,
  Building2,
  Globe2,
  Landmark,
  Hash,
  CheckCircle2,
  ShieldCheck,
  BadgeCheck,
  Image as ImageIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/axios";
import { updateUser } from "../../features/auth/authSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user, lastLogin } = useSelector((state) => state.auth);

  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    landmark: "",
    latitude: "",
    longitude: "",
    profileImage: "",
    isVerified: false,
    isEmailVerified: false,
    isActive: false,
  });

  useEffect(() => {
    if (!user) return;

    const image =
      user?.profileImage?.url || user?.profilePhoto?.url || user?.avatar || "";

    setForm({
      fullName: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      address:
        user?.address?.fullAddress ||
        user?.address?.addressLine ||
        user?.address?.street ||
        "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
      postalCode: user?.address?.postalCode || user?.address?.pincode || "",
      landmark: user?.address?.landmark || "",
      latitude:
        user?.address?.location?.coordinates?.[1]?.toString?.() ||
        user?.address?.latitude?.toString?.() ||
        "",
      longitude:
        user?.address?.location?.coordinates?.[0]?.toString?.() ||
        user?.address?.longitude?.toString?.() ||
        "",
      profileImage: image,
      isVerified: !!user?.isVerified,
      isEmailVerified: !!user?.isEmailVerified,
      isActive: user?.isActive !== false,
    });

    setPreviewImage(image);
  }, [user]);

  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const completion = useMemo(() => {
    const fields = [
      form.fullName,
      form.email,
      form.mobile,
      form.address,
      form.city,
      form.state,
      form.country,
      form.postalCode,
      form.landmark,
      form.latitude,
      form.longitude,
      previewImage || form.profileImage,
    ];

    const filled = fields.filter(
      (item) => String(item || "").trim() !== ""
    ).length;

    return Math.round((filled / fields.length) * 100);
  }, [form, previewImage]);

  const completionConfig = useMemo(() => {
    if (completion < 40) {
      return {
        bar: "bg-red-500",
        text: "text-red-500",
        label: "Needs improvement",
      };
    }
    if (completion < 70) {
      return {
        bar: "bg-yellow-500",
        text: "text-yellow-600",
        label: "Good progress",
      };
    }
    if (completion < 100) {
      return {
        bar: "bg-orange-500",
        text: "text-orange-500",
        label: "Almost complete",
      };
    }
    return {
      bar: "bg-green-500",
      text: "text-green-600",
      label: "Profile complete",
    };
  }, [completion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage({ type: "", text: "" });

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewImage && previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
    setMessage({ type: "", text: "" });
  };

  const uploadProfileImage = async () => {
    if (!selectedFile) return form.profileImage;

    try {
      setImageUploading(true);

      const imageFormData = new FormData();
      imageFormData.append("profileImage", selectedFile);

      const res = await api.post("/users/upload-profile-image", imageFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedUrl =
        res?.data?.data?.url ||
        res?.data?.url ||
        res?.data?.data?.profileImage?.url ||
        "";

      return uploadedUrl;
    } catch (error) {
      console.error("Image upload error:", error);
      return form.profileImage;
    } finally {
      setImageUploading(false);
    }
  };

  const validateForm = () => {
    if (!form.fullName.trim()) {
      setMessage({ type: "error", text: "Full name is required." });
      return false;
    }

    if (!form.mobile.trim()) {
      setMessage({ type: "error", text: "Mobile number is required." });
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      setMessage({
        type: "error",
        text: "Please enter a valid 10-digit mobile number.",
      });
      return false;
    }

    if (form.latitude && isNaN(Number(form.latitude))) {
      setMessage({ type: "error", text: "Latitude must be a valid number." });
      return false;
    }

    if (form.longitude && isNaN(Number(form.longitude))) {
      setMessage({ type: "error", text: "Longitude must be a valid number." });
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    try {
      setSaving(true);

      let profileImageUrl = form.profileImage;

      if (selectedFile) {
        profileImageUrl = await uploadProfileImage();
      }

      const payload = {
        name: form.fullName,
        mobile: form.mobile,
        address: {
          fullAddress: form.address,
          city: form.city,
          state: form.state,
          country: form.country,
          postalCode: form.postalCode,
          landmark: form.landmark,
          location: {
            type: "Point",
            coordinates: [
              Number(form.longitude) || 0,
              Number(form.latitude) || 0,
            ],
          },
        },
        profileImage: profileImageUrl
          ? {
              url: profileImageUrl,
            }
          : undefined,
      };

      const res = await api.put("/users/update-profile", payload);

      const updatedUser = res?.data?.data || res?.data?.user || null;

      if (updatedUser) {
        dispatch(updateUser(updatedUser));
      } else {
        dispatch(
          updateUser({
            name: form.fullName,
            mobile: form.mobile,
            address: {
              fullAddress: form.address,
              city: form.city,
              state: form.state,
              country: form.country,
              postalCode: form.postalCode,
              landmark: form.landmark,
              location: {
                type: "Point",
                coordinates: [
                  Number(form.longitude) || 0,
                  Number(form.latitude) || 0,
                ],
              },
            },
            profileImage: profileImageUrl
              ? { url: profileImageUrl }
              : undefined,
          })
        );
      }

      setForm((prev) => ({
        ...prev,
        profileImage: profileImageUrl,
      }));

      setSelectedFile(null);
      setMessage({
        type: "success",
        text: "Profile updated successfully.",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage({
        type: "error",
        text: error?.response?.data?.message || "Failed to update profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  const formatLastLogin = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-800 shadow-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-red-400 focus:ring-4 focus:ring-red-100";
  const disabledInputClass =
    "w-full cursor-not-allowed rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-400 shadow-sm outline-none";
  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/40 p-3 sm:p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
       

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[340px_1fr]">
          {/* Left Panel */}
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
            <div className="h-24 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500" />

            <div className="-mt-14 px-5 pb-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <img
                    src={
                      previewImage ||
                      "https://ui-avatars.com/api/?name=User&background=f3f4f6&color=111827&size=300"
                    }
                    alt="Profile"
                    className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg sm:h-32 sm:w-32"
                  />

                  <label className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition hover:scale-105 hover:bg-black">
                    <Camera size={18} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                  {form.fullName || "Your Name"}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={16} className="shrink-0" />
                  <span className="break-all">
                    {form.email || "No email added"}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} className="shrink-0" />
                  <span>{form.mobile || "No mobile added"}</span>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    {form.isVerified ? "Verified" : "Not Verified"}
                  </span>

                  <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {form.isEmailVerified ? "Email Verified" : "Email Pending"}
                  </span>

                  <span className="rounded-full border border-lime-200 bg-lime-50 px-3 py-1 text-xs font-semibold text-lime-700">
                    {form.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">
                    Profile Completion
                  </span>
                  <span className={`text-sm font-bold ${completionConfig.text}`}>
                    {completion}%
                  </span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${completionConfig.bar}`}
                    style={{ width: `${completion}%` }}
                  />
                </div>

                <p className={`mt-2 text-xs font-medium ${completionConfig.text}`}>
                  {completionConfig.label}
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-gray-800">
                  <Clock3 size={18} className="text-red-500" />
                  <span className="text-sm font-semibold">Last Login</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {formatLastLogin(lastLogin)}
                </p>
              </div>

              {/* <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-gray-800">
                  <ImageIcon size={18} className="text-red-500" />
                  <span className="text-sm font-semibold">Profile Photo</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Clean profile photo use karoge to account aur premium lagega.
                </p>
              </div> */}
            </div>
          </div>

          {/* Right Panel */}
          <div className="rounded-3xl border border-gray-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
            <div className="border-b border-gray-100 px-5 py-5 sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                  <User size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Personal Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Basic details aur address yaha manage karo.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              {message.text ? (
                <div
                  className={`mb-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-medium ${
                    message.type === "success"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  <span>{message.text}</span>
                </div>
              ) : null}

              {/* Basic Info */}
              <section>
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Basic Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Email Address</label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        disabled
                        className={`${disabledInputClass} pl-11`}
                        placeholder="Email address"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Email address cannot be changed.
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>Mobile Number *</label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        placeholder="Enter 10-digit mobile number"
                        className={`${inputClass} pl-11`}
                        maxLength={10}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Mobile number can be changed.
                    </p>
                  </div>
                </div>
              </section>

              <div className="my-8 border-t border-dashed border-gray-200" />

              {/* Location Info */}
              <section>
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Location Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className={labelClass}>Address</label>
                    <div className="relative">
                      <MapPinned
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Enter full address"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className={labelClass}>City</label>
                      <div className="relative">
                        <Building2
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          className={`${inputClass} pl-11`}
                          placeholder="City"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>State</label>
                      <div className="relative">
                        <Landmark
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="text"
                          name="state"
                          value={form.state}
                          onChange={handleChange}
                          className={`${inputClass} pl-11`}
                          placeholder="State"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Country</label>
                      <div className="relative">
                        <Globe2
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="text"
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          className={`${inputClass} pl-11`}
                          placeholder="Country"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Postal Code</label>
                      <div className="relative">
                        <Hash
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="text"
                          name="postalCode"
                          value={form.postalCode}
                          onChange={handleChange}
                          className={`${inputClass} pl-11`}
                          placeholder="Postal code"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Landmark</label>
                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        name="landmark"
                        value={form.landmark}
                        onChange={handleChange}
                        className={`${inputClass} pl-11`}
                        placeholder="Nearby landmark"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className={labelClass}>Latitude</label>
                      <input
                        type="number"
                        step="any"
                        name="latitude"
                        value={form.latitude}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Latitude"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Longitude</label>
                      <input
                        type="number"
                        step="any"
                        name="longitude"
                        value={form.longitude}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Longitude"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500">
                  {/* Save karne ke baad header aur redux state dono update ho jayenge. */}
                </p>

                <button
                  onClick={handleSave}
                  disabled={saving || imageUploading}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:scale-[1.01] hover:from-red-600 hover:to-orange-600 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                >
                  {saving || imageUploading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}