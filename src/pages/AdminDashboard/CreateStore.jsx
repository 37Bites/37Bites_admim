import { useState } from "react";
import { Upload } from "lucide-react";

export default function CreateStore() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    restaurantName: "",
    email: "",
    phone: "",
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

    managerName: "",
    managerEmail: "",
    password: "",

    searchUser: "",
    newUserName: "",
    newUserEmail: "",
    newUserPhone: "",
    newUserPassword: "",

    vendorCategory: "",
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
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.restaurantName) newErrors.restaurantName = "Required";
      if (!formData.email) newErrors.email = "Required";
      if (!formData.phone) newErrors.phone = "Required";
    }

    if (step === 2) {
      if (!formData.address) newErrors.address = "Required";
      if (!formData.city) newErrors.city = "Required";
      if (!formData.latitude) newErrors.latitude = "Required";
      if (!formData.longitude) newErrors.longitude = "Required";
    }

    if (step === 3) {
      if (!formData.commissionPercent)
        newErrors.commissionPercent = "Required";
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
      alert("Restaurant Created Successfully 🧡");
      console.log(formData);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* LEFT STEPPER */}
      <div className="w-1/4 bg-white shadow-md p-8 relative">
        <h2 className="text-xl font-semibold mb-10">Create Restaurant</h2>

        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-[2px] bg-orange-200"></div>

          <div
            className="absolute left-4 top-2 w-[2px] bg-orange-500 transition-all duration-500"
            style={{ height: `${(step - 1) * 80}px` }}
          ></div>

          <div className="space-y-12">
            {steps.map((label, index) => {
              const active = step === index + 1;
              const completed = step > index + 1;

              return (
                <div key={index} className="flex items-center gap-4 relative z-10">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium
                    ${
                      active
                        ? "bg-orange-500 text-white"
                        : completed
                        ? "bg-orange-400 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {completed ? "✓" : index + 1}
                  </div>

                  <span
                    className={`text-sm ${
                      active
                        ? "text-orange-500 font-semibold"
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
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-sm p-10 max-w-6xl">

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <Title title="Basic Information" />
              <Grid>
                <Input label="Restaurant Name" name="restaurantName" value={formData.restaurantName} onChange={handleChange} error={errors.restaurantName} />
                <Input label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
                <Input label="Website" name="website" value={formData.website} onChange={handleChange} />
                <Input label="Cuisine Type" name="cuisine" value={formData.cuisine} onChange={handleChange} />
                <Input label="Opening Time" name="openTime" value={formData.openTime} onChange={handleChange} />
                <Input label="Closing Time" name="closeTime" value={formData.closeTime} onChange={handleChange} />
              </Grid>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
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
          )}

          {/* STEP 3 */}
          {step === 3 && (
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

              <div className="grid grid-cols-3 gap-6 mt-6">
                <Checkbox label="Delivery" name="delivery" checked={formData.delivery} onChange={handleChange} />
                <Checkbox label="Pickup" name="pickup" checked={formData.pickup} onChange={handleChange} />
                <Checkbox label="Self Pickup" name="selfPickup" checked={formData.selfPickup} onChange={handleChange} />
                <Checkbox label="Auto Accept Order" name="autoAccept" checked={formData.autoAccept} onChange={handleChange} />
                <Checkbox label="Return Request" name="returnRequest" checked={formData.returnRequest} onChange={handleChange} />
                <Checkbox label="Show Profile Detail" name="showProfile" checked={formData.showProfile} onChange={handleChange} />
              </div>
            </>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <>
              <Title title="Media & Configuration" />

              <div className="grid grid-cols-3 gap-6 mb-6">
                <UploadCard title="Upload Logo" />
                <UploadCard title="Upload Banner" />
                <UploadCard title="Upload Gallery" />
              </div>

              <Grid>
                <Input label="Description" name="description" value={formData.description} onChange={handleChange} />
                <Input label="Facebook Link" name="facebook" value={formData.facebook} onChange={handleChange} />
                <Input label="Instagram Link" name="instagram" value={formData.instagram} onChange={handleChange} />
                <Input label="Meta Title" name="metaTitle" value={formData.metaTitle} onChange={handleChange} />
              </Grid>
            </>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <>
              <Title title="Users & Vendor Setup" />
              <Grid>
                <Input label="Manager Name" name="managerName" value={formData.managerName} onChange={handleChange} error={errors.managerName} />
                <Input label="Manager Email" name="managerEmail" value={formData.managerEmail} onChange={handleChange} error={errors.managerEmail} />
                <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} />
                <Input label="Search User" name="searchUser" value={formData.searchUser} onChange={handleChange} />
                <Input label="Add User Name" name="newUserName" value={formData.newUserName} onChange={handleChange} />
                <Input label="Add User Email" name="newUserEmail" value={formData.newUserEmail} onChange={handleChange} />
                <Input label="Add User Phone" name="newUserPhone" value={formData.newUserPhone} onChange={handleChange} />
                <Input label="Add User Password" name="newUserPassword" value={formData.newUserPassword} onChange={handleChange} />
                <Select label="Vendor Category" name="vendorCategory" value={formData.vendorCategory} onChange={handleChange} options={["Restaurant","Grocery","Pharmacy","Bakery"]} />
              </Grid>
            </>
          )}

          <div className="flex justify-between mt-10">
            {step > 1 && (
              <button onClick={prev} className="px-6 py-2 border border-orange-400 text-orange-500 rounded-lg hover:bg-orange-50">
                Previous
              </button>
            )}

            {step < 5 ? (
              <button onClick={next} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                Create Restaurant
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function Title({ title }) {
  return <h3 className="text-lg font-semibold mb-6 border-b pb-3">{title}</h3>;
}

function Grid({ children }) {
  return <div className="grid grid-cols-2 gap-6">{children}</div>;
}

function Input({ label, error, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className={`border p-3 rounded-lg w-full mt-1 outline-none ${
          error ? "border-red-500" : "focus:ring-2 focus:ring-orange-400"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <select {...props} className="border p-3 rounded-lg w-full mt-1 focus:ring-2 focus:ring-orange-400">
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      <input type="checkbox" {...props} className="accent-orange-500" />
      {label}
    </label>
  );
}

function UploadCard({ title }) {
  return (
    <div className="border-2 border-dashed border-orange-300 rounded-xl p-8 text-center cursor-pointer hover:bg-orange-50 transition">
      <Upload className="mx-auto mb-3 text-orange-400" />
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
}