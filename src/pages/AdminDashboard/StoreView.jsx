import React, { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Store,
  ArrowLeft,
  BadgeIndianRupee,
  ShoppingBag,
  CheckCircle2,
  Flame,
  Globe,
  User,
  Mail,
  Star,
  Image as ImageIcon,
  ShieldCheck,
  Truck,
  MapPinned,
  Tag,
  Pencil,
  Loader2,
} from "lucide-react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function StoreView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStore = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/restaurants/${id}`);
      if (res.data?.success) {
        setStore(res.data.data);
      }
    } catch (err) {
      console.error("Single store fetch error:", err?.response?.data || err);

      try {
        const allRes = await api.get("/restaurants/all");
        if (allRes.data?.success) {
          const foundStore = (allRes.data.data || []).find(
            (item) => item._id === id
          );
          setStore(foundStore || null);
        }
      } catch (fallbackErr) {
        console.error(
          "Fallback fetch error:",
          fallbackErr?.response?.data || fallbackErr
        );
        setStore(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();
  }, [id]);

  const bannerImage =
    store?.bannerImage ||
    store?.banner ||
    store?.coverImage ||
    store?.galleryImages?.[0] ||
    "https://via.placeholder.com/1400x500?text=Restaurant+Banner";

  const logoImage =
    store?.logo ||
    store?.logoImage ||
    store?.image ||
    "https://via.placeholder.com/200x200?text=Logo";

  const statusStyle = {
    active: "bg-green-100 text-green-700 border-green-200",
    approved: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    suspended: "bg-red-100 text-red-700 border-red-200",
    rejected: "bg-rose-100 text-rose-700 border-rose-200",
  };

  const formattedPaymentMethods = useMemo(() => {
    if (!store?.paymentMethods) return [];

    return Object.entries(store.paymentMethods)
      .filter(([, enabled]) => enabled)
      .map(([key]) =>
        key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())
      );
  }, [store]);

  const coordinates = store?.address?.location?.coordinates || [];
  const latitude =
    Array.isArray(coordinates) && coordinates.length === 2 ? coordinates[1] : null;
  const longitude =
    Array.isArray(coordinates) && coordinates.length === 2 ? coordinates[0] : null;

  const restaurantLocationText = [
    store?.address?.city,
    store?.address?.state,
    store?.address?.country,
  ]
    .filter(Boolean)
    .join(", ");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-6">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm md:p-10">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100">
              <Loader2 className="animate-spin text-slate-600" size={28} />
            </div>
            <p className="text-lg font-semibold text-slate-800">
              Loading store details...
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Please wait while we fetch restaurant information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-6">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm md:p-10">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100">
            <Store className="text-slate-500" size={34} />
          </div>
          <p className="text-2xl font-bold text-slate-800">Store not found</p>
          <p className="mt-2 text-sm text-slate-500">
            The requested restaurant details could not be loaded.
          </p>

          <button
            onClick={() => navigate("/Admindashboard/stores")}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <ArrowLeft size={16} />
            Back to Stores
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 pb-10">
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-5 sm:right-5 md:bottom-auto md:right-6 md:top-20">
        <button
          onClick={() => navigate("/Admindashboard/stores")}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-slate-800"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back to Stores</span>
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-6">
        {/* TOP HEADER */}
        <div className="mb-5 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <ArrowLeft size={18} />
              </button>

              <div>
                <p className="text-sm text-slate-500">Restaurant Details</p>
                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                  View Store
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <NavLink
                to={`/Admindashboard/stores/edit/${store._id}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                <Pencil size={16} />
                Edit Store
              </NavLink>
            </div>
          </div>
        </div>

        {/* HERO */}
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm md:rounded-[32px]">
          <div className="h-[220px] w-full sm:h-[260px] md:h-[320px] lg:h-[380px]">
            <img
              src={bannerImage}
              alt={store.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2 md:left-6 md:top-6">
            <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow">
              {store.restaurantType || "Restaurant"}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize shadow ${
                statusStyle[store.status] ||
                "border-slate-200 bg-slate-100 text-slate-700"
              }`}
            >
              {store.status || "N/A"}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold text-white shadow ${
                store.isOpen ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {store.isOpen ? "Open" : "Closed"}
            </span>

            {store.isBusy && (
              <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow">
                Busy
              </span>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="h-20 w-20 overflow-hidden rounded-[24px] border-4 border-white bg-white shadow-2xl sm:h-24 sm:w-24 md:h-28 md:w-28 md:rounded-[28px]">
                <img
                  src={logoImage}
                  alt={store.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 text-white">
                <h2 className="truncate text-xl font-bold sm:text-2xl md:text-4xl">
                  {store.name}
                </h2>

                <p className="mt-1 text-sm text-white/90">
                  {restaurantLocationText || "Unknown Location"}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/90">
                  <span className="inline-flex items-center gap-1.5">
                    <Star size={14} />
                    {store.ratings?.averageRating || 0}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShoppingBag size={14} />
                    Orders {store.totalOrders || 0}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {store.cuisines?.length ? (
                    store.cuisines.map((item, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      Cuisine not added
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TOP METRICS */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <TopMetricCard
            title="Open Status"
            value={store.isOpen ? "Open" : "Closed"}
            icon={<CheckCircle2 size={20} />}
            iconBg={store.isOpen ? "bg-green-100" : "bg-red-100"}
            iconColor={store.isOpen ? "text-green-600" : "text-red-500"}
          />
          <TopMetricCard
            title="Busy Mode"
            value={store.isBusy ? "Busy" : "Normal"}
            icon={<Flame size={20} />}
            iconBg={store.isBusy ? "bg-orange-100" : "bg-slate-100"}
            iconColor={store.isBusy ? "text-orange-600" : "text-slate-700"}
          />
          <TopMetricCard
            title="Total Orders"
            value={store.totalOrders || 0}
            icon={<ShoppingBag size={20} />}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <TopMetricCard
            title="Featured"
            value={store.isFeatured ? "Yes" : "No"}
            icon={<ShieldCheck size={20} />}
            iconBg="bg-indigo-100"
            iconColor="text-indigo-600"
          />
        </div>

        {/* MAIN GRID */}
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT SIDE */}
          <div className="space-y-5">
            <SectionCard title="Basic Information">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <DetailItem
                  label="Restaurant Name"
                  value={store.name}
                  icon={<Store size={16} />}
                />
                <DetailItem
                  label="Slug"
                  value={store.slug}
                  icon={<Tag size={16} />}
                />
                <DetailItem
                  label="Restaurant Type"
                  value={store.restaurantType}
                  icon={<Store size={16} />}
                />
                <DetailItem
                  label="Service Type"
                  value={store.serviceType}
                  icon={<Truck size={16} />}
                />
                <DetailItem
                  label="Status"
                  value={store.status}
                  icon={<CheckCircle2 size={16} />}
                />
                <DetailItem
                  label="User ID"
                  value={store.user || "N/A"}
                  icon={<User size={16} />}
                />
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
                <DetailItem
                  label="City"
                  value={store.address?.city || "N/A"}
                  icon={<MapPin size={16} />}
                />
                <DetailItem
                  label="State"
                  value={store.address?.state || "N/A"}
                  icon={<MapPinned size={16} />}
                />
                <DetailItem
                  label="Country"
                  value={store.address?.country || "N/A"}
                  icon={<Globe size={16} />}
                />
                <DetailItem
                  label="Pincode"
                  value={store.address?.pincode || "N/A"}
                  icon={<MapPin size={16} />}
                />
                <DetailItem
                  label="Coordinates"
                  value={
                    latitude !== null && longitude !== null
                      ? `${latitude}, ${longitude}`
                      : "N/A"
                  }
                  icon={<MapPinned size={16} />}
                />
              </div>
            </SectionCard>

            <SectionCard title="Pricing & Delivery">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <DetailItem
                  label="Average Cost For Two"
                  value={`₹${store.averageCostForTwo ?? 0}`}
                  icon={<BadgeIndianRupee size={16} />}
                />
                <DetailItem
                  label="Minimum Order Amount"
                  value={`₹${store.minimumOrderAmount ?? 0}`}
                  icon={<BadgeIndianRupee size={16} />}
                />
                <DetailItem
                  label="Preparation Time"
                  value={`${store.preparationTimeInMinutes ?? store.averagePreparationTime ?? 0} mins`}
                  icon={<Clock size={16} />}
                />
                <DetailItem
                  label="Delivery Time"
                  value={`${store.deliveryTimeInMinutes ?? 0} mins`}
                  icon={<Truck size={16} />}
                />
                <DetailItem
                  label="Delivery Radius"
                  value={`${store.deliveryRadiusInKm ?? 0} km`}
                  icon={<MapPinned size={16} />}
                />
                <DetailItem
                  label="Packaging Charge"
                  value={`₹${store.packagingCharge ?? 0}`}
                  icon={<BadgeIndianRupee size={16} />}
                />
              </div>
            </SectionCard>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-5">
            <SectionCard title="Contact & Online">
              <div className="grid grid-cols-1 gap-4">
                <DetailItem
                  label="Phone"
                  value={store.ownerMobile || store.phone || "N/A"}
                  icon={<Phone size={16} />}
                />
                <DetailItem
                  label="Email"
                  value={store.email || "N/A"}
                  icon={<Mail size={16} />}
                />
                <DetailItem
                  label="Website"
                  value={store.socialLinks?.website || store.website || "N/A"}
                  icon={<Globe size={16} />}
                />
              </div>
            </SectionCard>

            <SectionCard title="Payment Methods">
              {formattedPaymentMethods.length ? (
                <div className="flex flex-wrap gap-2">
                  {formattedPaymentMethods.map((method) => (
                    <span
                      key={method}
                      className="rounded-full border border-slate-200 bg-gradient-to-r from-white to-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<BadgeIndianRupee size={20} />}
                  text="No payment methods added"
                />
              )}
            </SectionCard>

            <SectionCard title="Timings">
              {store.timings?.length ? (
                <div className="space-y-3">
                  {store.timings.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Clock size={15} />
                        {item.day}
                      </div>
                      <div className="text-sm text-slate-600">
                        {item.isClosed
                          ? "Closed"
                          : `${item.openTime || "--:--"} - ${
                              item.closeTime || "--:--"
                            }`}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<Clock size={20} />}
                  text="No timings available"
                />
              )}
            </SectionCard>

            <SectionCard title="Description">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                {store.description || "No description added"}
              </div>
            </SectionCard>

            <SectionCard title="Gallery Images">
              {store.galleryImages?.length ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {store.galleryImages.map((img, index) => (
                    <div
                      key={index}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm"
                    >
                      <div className="relative h-44 overflow-hidden sm:h-48">
                        <img
                          src={img}
                          alt={`gallery-${index}`}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                        <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 opacity-0 transition group-hover:opacity-100">
                          Image {index + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<ImageIcon size={20} />}
                  text="No gallery images available"
                />
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
    <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:rounded-[24px] md:rounded-[28px] md:p-5">
      <h3 className="mb-4 text-base font-bold text-slate-900 md:text-lg">
        {title}
      </h3>
      {children}
    </div>
  );
}

function DetailItem({ label, value, full = false, icon }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
        {label}
      </p>
      <div className="flex min-h-[50px] items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
        {icon && <span className="shrink-0 text-slate-500">{icon}</span>}
        <span className="break-words">{value || "N/A"}</span>
      </div>
    </div>
  );
}

function TopMetricCard({ title, value, icon, iconBg, iconColor }) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:rounded-[22px] md:rounded-[24px]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 break-words text-xl font-bold text-slate-900 md:text-2xl">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-500">
      <span className="shrink-0 text-slate-400">{icon}</span>
      <span>{text}</span>
    </div>
  );
}