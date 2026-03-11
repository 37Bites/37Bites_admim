import React, { useEffect, useMemo, useState } from "react";
import {
  Bike,
  Search,
  Plus,
  X,
  Loader2,
  User,
  Phone,
  Mail,
  ShieldCheck,
  UserCheck,
  UserX,
  RefreshCw,
  Save,
  MapPin,
  Truck,
  Pencil,
  Trash2,
} from "lucide-react";
import api from "../../api/axios";

export default function DeliveryPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [search, setSearch] = useState("");

  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const initialForm = {
    name: "",
    email: "",
    mobile: "",
    gender: "",
    isActive: true,
    isVerified: false,
    vehicleType: "bike",
    city: "",
    address: "",
    licenseNumber: "",
  };

  const [createForm, setCreateForm] = useState(initialForm);
  const [editForm, setEditForm] = useState(initialForm);

  const isValidIndianMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);
  const isValidEmail = (email) =>
    !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const res = await api.post("/admin/delivery/all");
      const allUsers = res.data?.data || res.data?.users || [];
      const deliveryUsers = allUsers.filter(
        (user) => user?.role === "delivery"
      );
      setPartners(deliveryUsers);
    } catch (error) {
      console.error("Error fetching delivery partners:", error);
      alert(
        error?.response?.data?.message || "Failed to fetch delivery partners"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const openCreateModal = () => {
    setCreateForm(initialForm);
    setCreateOpen(true);
  };

  const closeCreateModal = () => {
    setCreateOpen(false);
    setCreateForm(initialForm);
  };

  const openEditModal = (partner) => {
    setSelectedPartner(partner);
    setEditForm({
      name: partner.name || "",
      email: partner.email || "",
      mobile: partner.mobile || "",
      gender: partner.gender || "",
      isActive: !!partner.isActive,
      isVerified: !!partner.isVerified,
      vehicleType: partner.vehicleType || "bike",
      city: partner.city || "",
      address: partner.address || "",
      licenseNumber: partner.licenseNumber || "",
    });
    setEditOpen(true);
  };

  const closeEditModal = () => {
    setEditOpen(false);
    setSelectedPartner(null);
    setEditForm(initialForm);
  };

  const handleCreateChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "mobile") {
      const sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
      setCreateForm((prev) => ({
        ...prev,
        mobile: sanitizedValue,
      }));
      return;
    }

    setCreateForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "mobile") {
      const sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
      setEditForm((prev) => ({
        ...prev,
        mobile: sanitizedValue,
      }));
      return;
    }

    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreatePartner = async (e) => {
    if (e) e.preventDefault();

    if (!createForm.name.trim() || !createForm.mobile.trim()) {
      alert("Name and mobile are required");
      return;
    }

    if (!isValidIndianMobile(createForm.mobile.trim())) {
      alert("Please enter a valid 10 digit mobile number");
      return;
    }

    if (createForm.email && !isValidEmail(createForm.email.trim())) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setCreating(true);

      const payload = {
        name: createForm.name.trim(),
        email: createForm.email.trim() || undefined,
        mobile: createForm.mobile.trim(),
        role: "delivery",
        gender: createForm.gender || undefined,
        isActive: createForm.isActive,
        isVerified: createForm.isVerified,
        vehicleType: createForm.vehicleType,
        city: createForm.city.trim() || undefined,
        address: createForm.address.trim() || undefined,
        licenseNumber: createForm.licenseNumber.trim() || undefined,
      };

      const res = await api.post("/users/create", payload);

      const createdPartner = res.data?.data;
      if (createdPartner) {
        setPartners((prev) => [createdPartner, ...prev]);
      } else {
        fetchPartners();
      }

      closeCreateModal();
      alert("Delivery partner account created successfully");
    } catch (error) {
      console.error("Create delivery partner failed:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to create delivery partner account"
      );
    } finally {
      setCreating(false);
    }
  };

  const handleSaveEdit = async (e) => {
    if (e) e.preventDefault();
    if (!selectedPartner?._id) return;

    if (!editForm.name.trim() || !editForm.mobile.trim()) {
      alert("Name and mobile are required");
      return;
    }

    if (!isValidIndianMobile(editForm.mobile.trim())) {
      alert("Please enter a valid 10 digit mobile number");
      return;
    }

    if (editForm.email && !isValidEmail(editForm.email.trim())) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: editForm.name.trim(),
        email: editForm.email.trim() || undefined,
        mobile: editForm.mobile.trim(),
        gender: editForm.gender || undefined,
        isActive: editForm.isActive,
        isVerified: editForm.isVerified,
        vehicleType: editForm.vehicleType,
        city: editForm.city.trim() || undefined,
        address: editForm.address.trim() || undefined,
        licenseNumber: editForm.licenseNumber.trim() || undefined,
      };

      const res = await api.patch(`/users/${selectedPartner._id}`, payload);

      const updatedPartner = res.data?.data || {
        ...selectedPartner,
        ...payload,
      };

      setPartners((prev) =>
        prev.map((partner) =>
          partner._id === selectedPartner._id ? updatedPartner : partner
        )
      );

      closeEditModal();
      alert("Delivery partner updated successfully");
    } catch (error) {
      console.error("Update delivery partner failed:", error);
      alert(
        error?.response?.data?.message || "Failed to update delivery partner"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePartner = async (partnerId) => {
    if (!window.confirm("Are you sure you want to delete this delivery partner?")) {
      return;
    }

    try {
      setActionLoading(partnerId);
      await api.delete(`/users/${partnerId}`);
      setPartners((prev) => prev.filter((partner) => partner._id !== partnerId));
      alert("Delivery partner deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      alert(
        error?.response?.data?.message || "Failed to delete delivery partner"
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      setActionLoading(userId);
      const res = await api.patch(`/users/${userId}/status`);

      setPartners((prev) =>
        prev.map((partner) =>
          partner._id === userId
            ? {
                ...partner,
                isActive:
                  typeof res.data?.data?.isActive === "boolean"
                    ? res.data.data.isActive
                    : !partner.isActive,
              }
            : partner
        )
      );
    } catch (error) {
      console.error("Toggle status failed:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to update delivery partner status"
      );
    } finally {
      setActionLoading(null);
    }
  };

  const filteredPartners = useMemo(() => {
    const text = search.toLowerCase().trim();

    return partners.filter((partner) => {
      if (!text) return true;

      return (
        partner.name?.toLowerCase().includes(text) ||
        partner.mobile?.toLowerCase().includes(text) ||
        partner.email?.toLowerCase().includes(text) ||
        partner.vehicleType?.toLowerCase().includes(text) ||
        partner.city?.toLowerCase().includes(text) ||
        partner.licenseNumber?.toLowerCase().includes(text)
      );
    });
  }, [partners, search]);

  const stats = useMemo(() => {
    return {
      total: partners.length,
      active: partners.filter((p) => p.isActive).length,
      inactive: partners.filter((p) => !p.isActive).length,
      verified: partners.filter((p) => p.isVerified).length,
    };
  }, [partners]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
            <Bike className="h-7 w-7 text-orange-500" />
            Delivery Partners
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View all delivery partner accounts and manage them from here.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={fetchPartners}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            <Plus className="h-4 w-4" />
            Create Delivery Partner
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Delivery Partners"
          value={stats.total}
          icon={<Bike className="h-6 w-6 text-orange-600" />}
          bg="bg-orange-100"
        />
        <StatCard
          title="Active Partners"
          value={stats.active}
          icon={<UserCheck className="h-6 w-6 text-emerald-600" />}
          bg="bg-emerald-100"
        />
        <StatCard
          title="Inactive Partners"
          value={stats.inactive}
          icon={<UserX className="h-6 w-6 text-red-600" />}
          bg="bg-red-100"
        />
        <StatCard
          title="Verified Partners"
          value={stats.verified}
          icon={<ShieldCheck className="h-6 w-6 text-blue-600" />}
          bg="bg-blue-100"
        />
      </div>

      <div className="mb-5 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, mobile, city, vehicle, license..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        ) : filteredPartners.length === 0 ? (
          <EmptyPartners />
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr className="text-left text-slate-600">
                    <th className="px-5 py-4 font-semibold">Partner</th>
                    <th className="px-5 py-4 font-semibold">Contact</th>
                    <th className="px-5 py-4 font-semibold">Location</th>
                    <th className="px-5 py-4 font-semibold">Vehicle</th>
                    <th className="px-5 py-4 font-semibold">License</th>
                    <th className="px-5 py-4 font-semibold">Verified</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Joined</th>
                    <th className="px-5 py-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPartners.map((partner) => (
                    <tr
                      key={partner._id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="grid h-11 w-11 place-items-center rounded-full bg-orange-100 text-orange-600 font-bold">
                            {partner?.name?.charAt(0)?.toUpperCase() || "D"}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {partner?.name || "N/A"}
                            </p>
                            <p className="text-xs text-slate-500">
                              Role: {partner?.role || "delivery"}
                            </p>
                            <p className="text-xs text-slate-500">
                              ID: {partner?._id?.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <p className="flex items-center gap-2 text-slate-700">
                            <Phone className="h-4 w-4 text-slate-400" />
                            {partner?.mobile || "N/A"}
                          </p>
                          <p className="flex items-center gap-2 text-slate-700 break-all">
                            <Mail className="h-4 w-4 text-slate-400" />
                            {partner?.email || "N/A"}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <p className="flex items-center gap-2 text-slate-700">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            {partner?.city || "N/A"}
                          </p>
                          <p className="max-w-[220px] truncate text-xs text-slate-500">
                            {partner?.address || "No address"}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold capitalize text-orange-700">
                          <Truck className="h-3.5 w-3.5" />
                          {partner?.vehicleType || "bike"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-700">
                        {partner?.licenseNumber || "Not Added"}
                      </td>

                      <td className="px-5 py-4">
                        {partner?.isVerified ? (
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            Verified
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            Unverified
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleToggleStatus(partner._id)}
                          disabled={actionLoading === partner._id}
                          className={`inline-flex min-w-[110px] items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                            partner?.isActive
                              ? "bg-red-50 text-red-600 hover:bg-red-100"
                              : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          } disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                          {actionLoading === partner._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : partner?.isActive ? (
                            <>
                              <UserX className="h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <UserCheck className="h-4 w-4" />
                              Activate
                            </>
                          )}
                        </button>
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {formatDate(partner?.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(partner)}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                          >
                            <Pencil className="h-4 w-4" />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeletePartner(partner._id)}
                            disabled={actionLoading === partner._id}
                            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {actionLoading === partner._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 lg:hidden">
              {filteredPartners.map((partner) => (
                <div
                  key={partner._id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-orange-100 text-orange-600 font-bold">
                        {partner?.name?.charAt(0)?.toUpperCase() || "D"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {partner?.name || "N/A"}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Role: {partner?.role || "delivery"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        partner?.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {partner?.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-slate-700">
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      {partner?.mobile || "N/A"}
                    </p>
                    <p className="flex items-center gap-2 break-all">
                      <Mail className="h-4 w-4 text-slate-400" />
                      {partner?.email || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {partner?.city || "N/A"}
                    </p>
                    <p className="flex items-center gap-2 capitalize">
                      <Truck className="h-4 w-4 text-slate-400" />
                      {partner?.vehicleType || "bike"}
                    </p>
                    <p className="text-xs text-slate-500">
                      License: {partner?.licenseNumber || "Not Added"}
                    </p>
                    <p className="text-xs text-slate-500">
                      Joined: {formatDate(partner?.createdAt)}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        partner?.isVerified
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {partner?.isVerified ? "Verified" : "Unverified"}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openEditModal(partner)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeletePartner(partner._id)}
                      disabled={actionLoading === partner._id}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {actionLoading === partner._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                      Delete
                    </button>
                  </div>

                  <div className="mt-3">
                    <button
                      onClick={() => handleToggleStatus(partner._id)}
                      disabled={actionLoading === partner._id}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        partner?.isActive
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      } disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                      {actionLoading === partner._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : partner?.isActive ? (
                        <>
                          <UserX className="h-4 w-4" />
                          Deactivate Partner
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-4 w-4" />
                          Activate Partner
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {createOpen && (
        <ModalWrapper
          title="Create Delivery Partner"
          subtitle="Add a new delivery partner account from this page."
          onClose={closeCreateModal}
        >
          <form onSubmit={handleCreatePartner} className="p-5">
            <FormGrid
              form={createForm}
              handleChange={handleCreateChange}
            />

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeCreateModal}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={creating}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {creating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Create Delivery Partner
                  </>
                )}
              </button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {editOpen && (
        <ModalWrapper
          title="Edit Delivery Partner"
          subtitle="Update delivery partner details."
          onClose={closeEditModal}
        >
          <form onSubmit={handleSaveEdit} className="p-5">
            <FormGrid
              form={editForm}
              handleChange={handleEditChange}
            />

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </ModalWrapper>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, bg }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">{value}</h3>
        </div>
        <div className={`rounded-xl p-3 ${bg}`}>{icon}</div>
      </div>
    </div>
  );
}

function ModalWrapper({ title, subtitle, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{title}</h2>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FormGrid({ form, handleChange }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter full name"
          className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-orange-400"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Mobile Number
        </label>
        <input
          type="text"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          maxLength={10}
          placeholder="Enter 10-digit mobile"
          className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-orange-400"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-orange-400"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Gender
        </label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-orange-400"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Vehicle Type
        </label>
        <select
          name="vehicleType"
          value={form.vehicleType}
          onChange={handleChange}
          className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-orange-400"
        >
          <option value="bike">Bike</option>
          <option value="scooter">Scooter</option>
          <option value="cycle">Cycle</option>
          <option value="car">Car</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          City
        </label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Enter city"
          className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-orange-400"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          License Number
        </label>
        <input
          type="text"
          name="licenseNumber"
          value={form.licenseNumber}
          onChange={handleChange}
          placeholder="Enter license number"
          className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-orange-400"
        />
      </div>

      <div className="flex flex-col justify-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
        <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="h-4 w-4 rounded"
          />
          Active Account
        </label>

        <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="isVerified"
            checked={form.isVerified}
            onChange={handleChange}
            className="h-4 w-4 rounded"
          />
          Verified Partner
        </label>
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Address
        </label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Enter address"
          className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-orange-400"
        />
      </div>
    </div>
  );
}

function EmptyPartners() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center p-6 text-center">
      <Bike className="mb-3 h-12 w-12 text-slate-300" />
      <h3 className="text-lg font-semibold text-slate-700">
        No delivery partners found
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Create a new delivery partner or try another search.
      </p>
    </div>
  );
}