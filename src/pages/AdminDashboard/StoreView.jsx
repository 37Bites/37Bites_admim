import React, { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Store,
  ArrowLeft,
  BadgeIndianRupee,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Flame,
  Globe,
  User,
} from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import api from "../../api/axios";

export default function StoreView() {
  const { id } = useParams();

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStore = async () => {
    try {
      setLoading(true);

      // pehle single store endpoint try karo
      const res = await api.get(`/restaurants/${id}`);

      if (res.data?.success) {
        setStore(res.data.data);
      }
    } catch (err) {
      console.error("Single store fetch error:", err?.response?.data || err);

      // fallback: agar single API na ho toh all me se nikal lo
      try {
        const allRes = await api.get("/restaurants/all");
        if (allRes.data?.success) {
          const foundStore = (allRes.data.data || []).find((item) => item._id === id);
          setStore(foundStore || null);
        }
      } catch (fallbackErr) {
        console.error("Fallback fetch error:", fallbackErr?.response?.data || fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-700">Loading store details...</p>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-xl font-bold text-slate-800">Store not found</p>
          <NavLink
            to="/Admindashboard/stores"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft size={16} />
            Back to Stores
          </NavLink>
        </div>
      </div>
    );
  }

  const bannerImage =
    store.bannerImage ||
    store.banner ||
    store.coverImage ||
    store.galleryImages?.[0] ||
    "https://via.placeholder.com/1400x500?text=Restaurant+Banner";

  const logoImage =
    store.logo ||
    store.logoImage ||
    store.image ||
    "https://via.placeholder.com/200x200?text=Logo";

  const statusStyle = {
    active: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    suspended: "bg-red-100 text-red-700 border-red-200",
    rejected: "bg-rose-100 text-rose-700 border-rose-200",
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        {/* Top bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">Restaurant Details</p>
            <h1 className="text-2xl font-bold text-slate-900">View Store</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <NavLink
              to="/Admindashboard/stores"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <ArrowLeft size={16} />
              Back
            </NavLink>

            <NavLink
              to={`/Admindashboard/stores/edit/${store._id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Edit Store
            </NavLink>
          </div>
        </div>

        {/* Banner */}
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="h-[240px] w-full md:h-[320px] lg:h-[380px]">
            <img
              src={bannerImage}
              alt={store.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute left-6 top-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800">
              {store.restaurantType || "Restaurant"}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                statusStyle[store.status] || "bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              {store.status || "N/A"}
            </span>

            {store.isOpen ? (
              <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                Open
              </span>
            ) : (
              <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                Closed
              </span>
            )}

            {store.isBusy && (
              <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                Busy
              </span>
            )}
          </div>

          {/* Logo + basic info */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="h-24 w-24 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl md:h-28 md:w-28">
                <img
                  src={logoImage}
                  alt={store.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="text-white">
                <h2 className="text-2xl font-bold md:text-3xl">{store.name}</h2>
                <p className="mt-1 text-sm text-white/90">
                  {store.cuisines?.length ? store.cuisines.join(", ") : "Cuisine not added"}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/90">
                  <span>⭐ {store.ratings?.averageRating || 0}</span>
                  <span>Orders {store.totalOrders || 0}</span>
                  <span>₹{store.averageCostForTwo || 0} for two</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          {/* Left side */}
          <div className="space-y-6">
            <SectionCard title="Basic Information">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <DetailItem label="Restaurant Name" value={store.name} icon={<Store size={16} />} />
                <DetailItem label="Slug" value={store.slug} />
                <DetailItem label="Restaurant Type" value={store.restaurantType} />
                <DetailItem label="Service Type" value={store.serviceType} />
                <DetailItem label="Status" value={store.status} />
                <DetailItem label="User ID" value={store.user || "N/A"} icon={<User size={16} />} />
              </div>
            </SectionCard>

            <SectionCard title="Address Details">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <DetailItem
                  label="Full Address"
                  value={
                    store.address?.fullAddress ||
                    store.address?.addressLine1 ||
                    store.address?.street ||
                    "N/A"
                  }
                  full
                  icon={<MapPin size={16} />}
                />
                <DetailItem label="City" value={store.address?.city || "N/A"} />
                <DetailItem label="State" value={store.address?.state || "N/A"} />
                <DetailItem label="Country" value={store.address?.country || "N/A"} />
                <DetailItem label="Pincode" value={store.address?.pincode || "N/A"} />
                <DetailItem
                  label="Coordinates"
                  value={
                    store.address?.coordinates?.length === 2
                      ? `${store.address.coordinates[1]}, ${store.address.coordinates[0]}`
                      : "N/A"
                  }
                />
              </div>
            </SectionCard>

            <SectionCard title="Pricing & Delivery">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <DetailItem
                  label="Average Cost For Two"
                  value={`₹${store.averageCostForTwo || 0}`}
                  icon={<BadgeIndianRupee size={16} />}
                />
                <DetailItem label="Minimum Order Amount" value={`₹${store.minimumOrderAmount || 0}`} />
                <DetailItem label="Preparation Time" value={`${store.preparationTimeInMinutes || 0} mins`} />
                <DetailItem label="Delivery Time" value={`${store.deliveryTimeInMinutes || 0} mins`} />
                <DetailItem label="Delivery Radius" value={`${store.deliveryRadiusInKm || 0} km`} />
                <DetailItem label="Packaging Charge" value={`₹${store.packagingCharge || 0}`} />
              </div>
            </SectionCard>

            <SectionCard title="Description">
              <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                {store.description || "No description added"}
              </p>
            </SectionCard>

            <SectionCard title="Gallery Images">
              {store.galleryImages?.length ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {store.galleryImages.map((img, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                    >
                      <img
                        src={img}
                        alt={`gallery-${index}`}
                        className="h-52 w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No gallery images available</p>
              )}
            </SectionCard>
          </div>

          {/* Right side */}
          <div className="space-y-6">
            <SectionCard title="Store Status">
              <div className="grid grid-cols-1 gap-3">
                <StatusBox
                  icon={<CheckCircle2 size={18} />}
                  label="Open Status"
                  value={store.isOpen ? "Open" : "Closed"}
                  valueClass={store.isOpen ? "text-green-600" : "text-red-500"}
                />
                <StatusBox
                  icon={<Flame size={18} />}
                  label="Busy Mode"
                  value={store.isBusy ? "Busy" : "Normal"}
                  valueClass={store.isBusy ? "text-orange-600" : "text-slate-700"}
                />
                <StatusBox
                  icon={<ShoppingBag size={18} />}
                  label="Total Orders"
                  value={store.totalOrders || 0}
                />
                <StatusBox
                  icon={<AlertCircle size={18} />}
                  label="Featured"
                  value={store.isFeatured ? "Yes" : "No"}
                />
              </div>
            </SectionCard>

            <SectionCard title="Contact & Online">
              <div className="grid grid-cols-1 gap-4">
                <DetailItem label="Phone" value={store.phone || "N/A"} icon={<Phone size={16} />} />
                <DetailItem label="Email" value={store.email || "N/A"} />
                <DetailItem label="Website" value={store.website || "N/A"} icon={<Globe size={16} />} />
              </div>
            </SectionCard>

            <SectionCard title="Payment Methods">
              <div className="flex flex-wrap gap-2">
                {store.paymentMethods ? (
                  Object.entries(store.paymentMethods)
                    .filter(([, enabled]) => enabled)
                    .map(([key]) => (
                      <span
                        key={key}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                      >
                        {key}
                      </span>
                    ))
                ) : (
                  <p className="text-sm text-slate-500">No payment methods added</p>
                )}
              </div>
            </SectionCard>

            <SectionCard title="Timings">
              {store.timings?.length ? (
                <div className="space-y-3">
                  {store.timings.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Clock size={15} />
                        {item.day}
                      </div>
                      <div className="text-sm text-slate-600">
                        {item.isClosed
                          ? "Closed"
                          : `${item.openTime || "--:--"} - ${item.closeTime || "--:--"}`}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No timings available</p>
              )}
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-slate-900">{title}</h3>
      {children}
    </div>
  );
}

function DetailItem({ label, value, full = false, icon }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <div className="flex min-h-[52px] items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
        {icon && <span className="text-slate-500">{icon}</span>}
        <span className="break-words">{value || "N/A"}</span>
      </div>
    </div>
  );
}

function StatusBox({ icon, label, value, valueClass = "text-slate-800" }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
          {icon}
        </div>
        <p className="text-sm font-medium text-slate-600">{label}</p>
      </div>
      <p className={`text-sm font-bold ${valueClass}`}>{value}</p>
    </div>
  );
}