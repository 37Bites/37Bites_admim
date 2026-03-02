import { useState } from "react";
import { Upload } from "lucide-react";
import api from "../../api/axios";

export default function CreateStore() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    restaurantName: "",
    email: "",
    website: "",
    restaurantType: "",
    cuisine: "",
    openTime: "",
    closeTime: "",

    address: "",
    city: "",
    state: "",
    country: "Sint Maarten",
    pincode: "",
    latitude: "",
    longitude: "",
    deliveryRadius: "",

    commissionPercent: "",
    commissionFix: "",
    serviceFeePercent: "",
    amov: "",
    slotDuration: "",
    autoRejectTime: "",

    delivery: false,
    pickup: false,
    selfPickup: false,
    autoAccept: false,
    returnRequest: false,
    showProfile: false,

    description: "",
    facebook: "",
    instagram: "",
    metaTitle: "",
    phone: "",

    managerName: "",
    managerEmail: "",
    password: "",

    searchUser: "",
    newUserName: "",
    newUserEmail: "",
    newUserPhone: "",
    newUserPassword: "",

    vendorCategory: "",

    galleryImages: [], // 🔑 always an array
    paymentMethods: [], // 🔑 array for multiple select
  });

  const [errors, setErrors] = useState({});

  const steps = [
    "Basic Information",
    "Location Details",
    "Business Setup",
    "Media & Configuration",
    "Users & Vendor Setup",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, options, multiple } = e.target;

    if (type === "select-multiple" && multiple) {
      const selected = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);
      setFormData({ ...formData, [name]: selected });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleFileChange = (field, files) => {
    setFormData({ ...formData, [field]: Array.from(files) }); // 🔑 always array
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.restaurantName) newErrors.restaurantName = "Required";
      if (!formData.email) newErrors.email = "Required";
    }

    if (step === 2) {
      if (!formData.address) newErrors.address = "Required";
      if (!formData.city) newErrors.city = "Required";
      if (!formData.latitude) newErrors.latitude = "Required";
      if (!formData.longitude) newErrors.longitude = "Required";
    }

    if (step === 3) {
      if (!formData.commissionPercent) newErrors.commissionPercent = "Required";
      if (!formData.amov) newErrors.amov = "Required";
    }

    if (step === 5) {
      if (!formData.managerName) newErrors.managerName = "Required";
      if (!formData.managerEmail) newErrors.managerEmail = "Required";
      if (!formData.password) newErrors.password = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prev = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    if (validateStep()) {
      const formPayload = new FormData();
      formPayload.append("name", formData.restaurantName);
      formPayload.append("email", formData.email);
      formPayload.append("restaurantType", formData.restaurantType);
      formPayload.append("cuisine", formData.cuisine);
      formPayload.append("description", formData.description);
      formPayload.append("phone", formData.phone);

      // Address with coordinates
      formPayload.append(
        "address",
        JSON.stringify({
          fullAddress: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode,
          location: {
            type: "Point",
            coordinates: [
              Number(formData.longitude),
              Number(formData.latitude),
            ],
          },
        })
      );

      // Multiple payment methods
      formData.paymentMethods.forEach((method) =>
        formPayload.append("paymentMethods[]", method)
      );

      // Gallery images
      formData.galleryImages.forEach((file, idx) =>
        formPayload.append(`gallery[${idx}]`, file)
      );

      console.log("Submitting:", formData);
      alert("Restaurant Created Successfully 🧡");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* LEFT STEPPER */}
      <div className="w-1/4 bg-white shadow-lg p-10">
        <h2 className="text-2xl font-semibold mb-12 text-gray-800">
          Create Restaurant
        </h2>

        <div className="space-y-10">
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const active = step === stepNumber;
            const completed = step > stepNumber;

            return (
              <div
                key={index}
                onClick={() => stepNumber < step && setStep(stepNumber)}
                className="flex items-center gap-4 cursor-pointer group"
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-all
                  ${
                    active
                      ? "bg-orange-500 text-white shadow-md"
                      : completed
                      ? "bg-orange-400 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {completed ? "✓" : stepNumber}
                </div>

                <span
                  className={`text-sm transition ${
                    active
                      ? "text-orange-600 font-semibold"
                      : completed
                      ? "text-orange-400"
                      : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-14 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-6xl border">

          {/* STEP CONTENT */}
          {step === 1 && <Step1 formData={formData} handleChange={handleChange} errors={errors} />}
          {step === 2 && <Step2 formData={formData} handleChange={handleChange} errors={errors} />}
          {step === 3 && <Step3 formData={formData} handleChange={handleChange} errors={errors} />}
          {step === 4 && <Step4 formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} />}
          {step === 5 && <Step5 formData={formData} handleChange={handleChange} errors={errors} />}

          <div className="flex justify-between mt-12">
            {step > 1 && (
              <button onClick={prev} className="px-6 py-2 border border-orange-400 text-orange-500 rounded-lg hover:bg-orange-50">
                Previous
              </button>
            )}

            {step < 5 ? (
              <button onClick={next} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 shadow">
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 shadow">
                Create Restaurant
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */
function Title({ title }) {
  return <h3 className="text-xl font-semibold mb-8 border-b pb-4">{title}</h3>;
}

function Grid({ children }) {
  return <div className="grid grid-cols-2 gap-8">{children}</div>;
}

function Input({ label, error, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className={`border p-3 rounded-lg w-full mt-1 bg-gray-50 outline-none transition
        ${
          error
            ? "border-red-500"
            : "focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        {...props}
        multiple={props.multiple || false}
        className="border p-3 rounded-lg w-full mt-1 bg-gray-50 focus:ring-2 focus:ring-orange-400"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function UploadCard({ title, onChange }) {
  return (
    <label className="border-2 border-dashed border-orange-300 rounded-xl p-10 text-center cursor-pointer hover:bg-orange-50 transition">
      <Upload className="mx-auto mb-4 text-orange-400" />
      <p className="text-sm text-gray-600">{title}</p>
      <input
        type="file"
        multiple
        className="hidden"
        onChange={(e) => onChange && onChange(e.target.files)}
      />
    </label>
  );
}

/* ----------------- STEPS ----------------- */
const Step1 = ({ formData, handleChange, errors }) => (
  <>
    <Title title="Basic Information" />
    <Grid>
      <Input label="Restaurant Name" name="restaurantName" value={formData.restaurantName} onChange={handleChange} error={errors.restaurantName} />
      <Input label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
      <Select label="Restaurant Type" name="restaurantType" value={formData.restaurantType} onChange={handleChange} options={["Veg","Non-Veg","Both"]} />
      <Input label="Cuisine Type" name="cuisine" value={formData.cuisine} onChange={handleChange} />
      <Input type="time" label="Opening Time" name="openTime" value={formData.openTime} onChange={handleChange} />
      <Input type="time" label="Closing Time" name="closeTime" value={formData.closeTime} onChange={handleChange} />
      <Input label="Website" name="website" value={formData.website} onChange={handleChange} />
    </Grid>
  </>
);

const Step2 = ({ formData, handleChange, errors }) => (
  <>
    <Title title="Location Details" />
    <Grid>
      <Input label="Full Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
      <Input label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
      <Input label="State / Province" name="state" value={formData.state} onChange={handleChange} />
      <Input label="Country" name="country" value={formData.country} onChange={handleChange} />
      <Input label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
      <Input label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} error={errors.latitude} />
      <Input label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} error={errors.longitude} />
      <Input label="Delivery Radius (KM)" name="deliveryRadius" value={formData.deliveryRadius} onChange={handleChange} />
    </Grid>
  </>
);

const Step3 = ({ formData, handleChange, errors }) => (
  <>
    <Title title="Business Setup" />
    <Grid>
      <Input label="Absolute Min Order Value (AMOV)" name="amov" value={formData.amov} onChange={handleChange} error={errors.amov} />
      <Input label="Commission %" name="commissionPercent" value={formData.commissionPercent} onChange={handleChange} error={errors.commissionPercent} />
      <Input label="Commission Fix per Order" name="commissionFix" value={formData.commissionFix} onChange={handleChange} />
      <Input label="Service Fee %" name="serviceFeePercent" value={formData.serviceFeePercent} onChange={handleChange} />
      <Select label="Slot Duration" name="slotDuration" value={formData.slotDuration} onChange={handleChange} options={["15 min","30 min","45 min","60 min"]} />
      <Select label="Auto Reject Time" name="autoRejectTime" value={formData.autoRejectTime} onChange={handleChange} options={["5 min","10 min","15 min","20 min"]} />
    </Grid>
  </>
);

const Step4 = ({ formData, handleChange, handleFileChange }) => (
  <>
    <Title title="Media & Configuration" />
    <div className="grid grid-cols-3 gap-6 mb-8">
      <UploadCard title="Upload Logo" onChange={(files) => handleFileChange("logoImages", files)} />
      <UploadCard title="Upload Banner" onChange={(files) => handleFileChange("bannerImages", files)} />
      <UploadCard title="Upload Gallery" onChange={(files) => handleFileChange("galleryImages", files)} />
    </div>
    <Grid>
      <Input label="Mobile Number" name="phone" value={formData.phone} onChange={handleChange} />
      <Input label="Description" name="description" value={formData.description} onChange={handleChange} />
      <Input label="Facebook Link" name="facebook" value={formData.facebook} onChange={handleChange} />
      <Input label="Instagram Link" name="instagram" value={formData.instagram} onChange={handleChange} />
      <Input label="Meta Title" name="metaTitle" value={formData.metaTitle} onChange={handleChange} />
      <Select label="Payment Methods" name="paymentMethods" value={formData.paymentMethods} onChange={handleChange} multiple options={["Cash","Card","UPI","Wallet"]} />
    </Grid>
  </>
);

const Step5 = ({ formData, handleChange, errors }) => (
  <>
    <Title title="Users & Vendor Setup" />
    <Grid>
      <Input label="Manager Name" name="managerName" value={formData.managerName} onChange={handleChange} error={errors.managerName} />
      <Input label="Manager Email" name="managerEmail" value={formData.managerEmail} onChange={handleChange} error={errors.managerEmail} />
      <Input type="password" label="Password" name="password" value={formData.password} onChange={handleChange} error={errors.password} />
    </Grid>
  </>
);