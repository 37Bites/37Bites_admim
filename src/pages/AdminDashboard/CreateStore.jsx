import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";

export default function CreateRestaurant() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const steps = [
    "Basic Details",
    "Business Info",
    "Location",
    "Media & SEO",
    "Owner Info",
  ];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    restaurantType: "",
    cuisines: "",
    serviceType: "delivery",
    averageCostForTwo: "",

    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",

    openTime: "",
    closeTime: "",

    autoAcceptOrders: false,
    preparationTimeInMinutes: "",
    deliveryTimeInMinutes: "",
    deliveryRadiusInKm: "",
    minimumOrderAmount: "",
    packagingCharge: "",

    paymentMethods: "",
    categories: "",
    offers: "",

    website: "",
    facebook: "",
    instagram: "",

    seoTitle: "",
    seoDescription: "",

    ownerMobile: "",
    ownerName: "",

    subscriptionPlan: "free",

    profileImage: null,
    coverImage: null,
    galleryImages: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleFile = (e) => {
    const { name, files } = e.target;

    if (name === "galleryImages") {
      setFormData((prev) => ({
        ...prev,
        galleryImages: Array.from(files),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.name?.trim()) {
        newErrors.name = "Restaurant name required";
      }

      if (!formData.restaurantType) {
        newErrors.restaurantType = "Restaurant type required";
      }

      if (!formData.cuisines) {
        newErrors.cuisines = "Cuisine required";
      }
    }

    if (step === 2) {
      if (!formData.averageCostForTwo) {
        newErrors.averageCostForTwo = "Average cost required";
      }

      if (!formData.minimumOrderAmount) {
        newErrors.minimumOrderAmount = "Minimum order required";
      }

      if (!formData.paymentMethods) {
        newErrors.paymentMethods = "Payment method required";
      }
    }

    if (step === 3) {
      if (!formData.street) {
        newErrors.street = "Street is required";
      }

      if (!formData.area) {
        newErrors.area = "Area is required";
      }

      if (!formData.city) {
        newErrors.city = "City is required";
      }

      if (!formData.state) {
        newErrors.state = "State is required";
      }

      if (!formData.pincode) {
        newErrors.pincode = "Pincode required";
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = "Invalid pincode";
      }
    }

    if (step === 5) {
      if (!formData.ownerName) {
        newErrors.ownerName = "Owner name required";
      }

      if (!formData.ownerMobile) {
        newErrors.ownerMobile = "Mobile required";
      } else if (!/^[6-9]\d{9}$/.test(formData.ownerMobile)) {
        newErrors.ownerMobile = "Invalid mobile number";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError || "Please fill all required fields");
      return false;
    }

    return true;
  };

  const next = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
      toast.success("Step completed");
    }
  };

  const prev = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      setSubmitting(true);

      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("restaurantType", formData.restaurantType);
      payload.append("cuisines", JSON.stringify([formData.cuisines]));
      payload.append("serviceType", formData.serviceType);
      payload.append("averageCostForTwo", formData.averageCostForTwo);

      payload.append(
        "address",
        JSON.stringify({
          street: formData.street,
          area: formData.area,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          location: {
            type: "Point",
            coordinates: [
              Number(formData.longitude) || 0,
              Number(formData.latitude) || 0,
            ],
          },
        })
      );

      payload.append(
        "timings",
        JSON.stringify([
          {
            day: "Monday",
            openTime: formData.openTime,
            closeTime: formData.closeTime,
            isClosed: false,
          },
        ])
      );

      payload.append("autoAcceptOrders", formData.autoAcceptOrders);

      payload.append(
        "preparationTimeInMinutes",
        formData.preparationTimeInMinutes
      );
      payload.append("deliveryTimeInMinutes", formData.deliveryTimeInMinutes);
      payload.append("deliveryRadiusInKm", formData.deliveryRadiusInKm);

      payload.append("minimumOrderAmount", formData.minimumOrderAmount);
      payload.append("packagingCharge", formData.packagingCharge);

      payload.append(
        "paymentMethods",
        JSON.stringify([formData.paymentMethods])
      );

      payload.append(
        "categories",
        JSON.stringify(
          formData.categories
            ? formData.categories
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : []
        )
      );

      payload.append(
        "offers",
        JSON.stringify(
          formData.offers
            ? formData.offers
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : []
        )
      );

      payload.append(
        "socialLinks",
        JSON.stringify({
          website: formData.website,
          facebook: formData.facebook,
          instagram: formData.instagram,
        })
      );

      payload.append("seoTitle", formData.seoTitle);
      payload.append("seoDescription", formData.seoDescription);

      payload.append("subscriptionPlan", formData.subscriptionPlan);

      payload.append("ownerMobile", formData.ownerMobile);
      payload.append("ownerName", formData.ownerName);

      if (formData.profileImage) {
        payload.append("profileImage", formData.profileImage);
      }

      if (formData.coverImage) {
        payload.append("coverImage", formData.coverImage);
      }

      formData.galleryImages.forEach((file) => {
        payload.append("galleryImages", file);
      });

      const res = await api.post("/restaurants/create", payload, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success(
        res?.data?.message || "Restaurant Created Successfully"
      );

      setFormData({
        name: "",
        description: "",
        restaurantType: "",
        cuisines: "",
        serviceType: "delivery",
        averageCostForTwo: "",

        street: "",
        area: "",
        city: "",
        state: "",
        pincode: "",
        latitude: "",
        longitude: "",

        openTime: "",
        closeTime: "",

        autoAcceptOrders: false,
        preparationTimeInMinutes: "",
        deliveryTimeInMinutes: "",
        deliveryRadiusInKm: "",
        minimumOrderAmount: "",
        packagingCharge: "",

        paymentMethods: "",
        categories: "",
        offers: "",

        website: "",
        facebook: "",
        instagram: "",

        seoTitle: "",
        seoDescription: "",

        ownerMobile: "",
        ownerName: "",

        subscriptionPlan: "free",

        profileImage: null,
        coverImage: null,
        galleryImages: [],
      });

      setErrors({});
      setStep(1);
    } catch (err) {
      console.log(err);

      toast.error(
        err?.response?.data?.message || "Failed to create restaurant"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className="relative border-r bg-white p-6 md:w-64">
        <h2 className="mb-8 text-xl font-semibold">Create Restaurant</h2>

        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-[2px] bg-gray-200"></div>

          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const active = step === stepNumber;
            const completed = step > stepNumber;

            return (
              <div
                key={index}
                onClick={() => stepNumber < step && setStep(stepNumber)}
                className="relative z-10 mb-8 flex cursor-pointer items-center gap-4"
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold
                  ${
                    active
                      ? "bg-orange-500 text-white"
                      : completed
                      ? "bg-green-500 text-white"
                      : "border border-gray-300 bg-white"
                  }`}
                >
                  {completed ? "✓" : stepNumber}
                </div>

                <p
                  className={`${
                    active ? "font-semibold text-orange-500" : "text-gray-600"
                  }`}
                >
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 p-6 md:p-10">
        <div className="max-w-5xl rounded-2xl border bg-white p-10 shadow-lg">
          {step === 1 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Restaurant Name"
                name="name"
                placeholder="Enter restaurant name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />

              <Select
                label="Restaurant Type"
                name="restaurantType"
                value={formData.restaurantType}
                onChange={handleChange}
                options={["veg", "non-veg", "both"]}
                error={errors.restaurantType}
              />

              <Select
                label="Cuisines"
                name="cuisines"
                value={formData.cuisines}
                onChange={handleChange}
                options={["Indian", "Chinese", "Italian", "Fast Food"]}
                error={errors.cuisines}
              />

              <Input
                label="Description"
                name="description"
                placeholder="Short description about restaurant"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Average Cost For Two"
                name="averageCostForTwo"
                placeholder="Eg: 500"
                value={formData.averageCostForTwo}
                onChange={handleChange}
                error={errors.averageCostForTwo}
              />

              <Input
                label="Minimum Order Amount"
                name="minimumOrderAmount"
                placeholder="Eg: 100"
                value={formData.minimumOrderAmount}
                onChange={handleChange}
                error={errors.minimumOrderAmount}
              />

              <Input
                label="Packaging Charge"
                name="packagingCharge"
                placeholder="Eg: 20"
                value={formData.packagingCharge}
                onChange={handleChange}
              />

              <Input
                label="Delivery Radius (KM)"
                name="deliveryRadiusInKm"
                placeholder="Eg: 5"
                value={formData.deliveryRadiusInKm}
                onChange={handleChange}
              />

              <Select
                label="Payment Methods"
                name="paymentMethods"
                value={formData.paymentMethods}
                onChange={handleChange}
                options={["Cash", "UPI", "Card", "Wallet"]}
                error={errors.paymentMethods}
              />
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Street"
                name="street"
                placeholder="Street address"
                value={formData.street}
                onChange={handleChange}
                error={errors.street}
              />

              <Input
                label="Area"
                name="area"
                placeholder="Area name"
                value={formData.area}
                onChange={handleChange}
                error={errors.area}
              />

              <Input
                label="City"
                name="city"
                placeholder="City name"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
              />

              <Input
                label="State"
                name="state"
                placeholder="State name"
                value={formData.state}
                onChange={handleChange}
                error={errors.state}
              />

              <Input
                label="Pincode"
                name="pincode"
                placeholder="6 digit pincode"
                value={formData.pincode}
                onChange={handleChange}
                error={errors.pincode}
              />

              <Input
                label="Latitude"
                name="latitude"
                placeholder="Eg: 26.8467"
                value={formData.latitude}
                onChange={handleChange}
              />

              <Input
                label="Longitude"
                name="longitude"
                placeholder="Eg: 80.9462"
                value={formData.longitude}
                onChange={handleChange}
              />

              <Input
                type="time"
                label="Open Time"
                name="openTime"
                value={formData.openTime}
                onChange={handleChange}
              />

              <Input
                type="time"
                label="Close Time"
                name="closeTime"
                value={formData.closeTime}
                onChange={handleChange}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <FileUpload
                  label="Restaurant Logo"
                  name="profileImage"
                  onChange={handleFile}
                />
                <FileUpload
                  label="Restaurant Banner"
                  name="coverImage"
                  onChange={handleFile}
                />
                <FileUpload
                  label="Gallery Images"
                  name="galleryImages"
                  multiple
                  onChange={handleFile}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Input
                  label="Website"
                  name="website"
                  placeholder="https://yourwebsite.com"
                  value={formData.website}
                  onChange={handleChange}
                />

                <Input
                  label="Facebook"
                  name="facebook"
                  placeholder="Facebook page link"
                  value={formData.facebook}
                  onChange={handleChange}
                />

                <Input
                  label="Instagram"
                  name="instagram"
                  placeholder="Instagram profile link"
                  value={formData.instagram}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  label="SEO Title"
                  name="seoTitle"
                  placeholder="SEO title for Google"
                  value={formData.seoTitle}
                  onChange={handleChange}
                />

                <Input
                  label="SEO Description"
                  name="seoDescription"
                  placeholder="SEO description for Google"
                  value={formData.seoDescription}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Owner Name"
                name="ownerName"
                placeholder="Owner full name"
                value={formData.ownerName}
                onChange={handleChange}
                error={errors.ownerName}
              />

              <Input
                label="Owner Mobile"
                name="ownerMobile"
                placeholder="10 digit mobile number"
                value={formData.ownerMobile}
                onChange={handleChange}
                error={errors.ownerMobile}
              />

              <Select
                label="Subscription Plan"
                name="subscriptionPlan"
                value={formData.subscriptionPlan}
                onChange={handleChange}
                options={["free", "silver", "gold", "platinum"]}
              />
            </div>
          )}

          <div className="mt-10 flex justify-between">
            {step > 1 && (
              <button
                onClick={prev}
                className="rounded-lg border border-gray-300 px-8 py-3 hover:bg-gray-100"
              >
                Previous
              </button>
            )}

            {step < 5 ? (
              <button
                onClick={next}
                className="rounded-lg bg-orange-500 px-8 py-3 text-white shadow hover:bg-orange-600"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="rounded-lg bg-green-600 px-8 py-3 text-white shadow hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Creating..." : "Create Restaurant"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className={`w-full rounded-lg border bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400
        ${error ? "border-red-500" : "border-gray-300"}
        `}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Select({ label, options, error, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        {...props}
        className={`w-full rounded-lg border bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400
        ${error ? "border-red-500" : "border-gray-300"}
        `}
      >
        <option value="">Select</option>

        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function FileUpload({ label, name, onChange, multiple }) {
  return (
    <div className="overflow-hidden rounded-xl border-2 border-dashed border-gray-300 p-6 text-center hover:bg-gray-50">
      <p className="mb-3 text-sm font-medium text-gray-600">{label}</p>

      <div className="w-full">
        <input
          type="file"
          accept="image/*"
          name={name}
          multiple={multiple}
          onChange={onChange}
          className="w-full cursor-pointer text-sm file:mr-3 file:rounded-md file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-white hover:file:bg-orange-600"
        />
      </div>
    </div>
  );
}