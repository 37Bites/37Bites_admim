import { useState } from "react";
import api from "../../api/axios";

export default function CreateRestaurant() {

const [step,setStep] = useState(1)

const steps = [
"Basic Details",
"Business Info",
"Location",
"Media & SEO",
"Owner Info"
]

const [formData,setFormData] = useState({

name:"",
description:"",
restaurantType:"",
cuisines:"",
serviceType:"delivery",
averageCostForTwo:"",

address:"",
latitude:"",
longitude:"",

openTime:"",
closeTime:"",

autoAcceptOrders:false,
preparationTimeInMinutes:"",
deliveryTimeInMinutes:"",
deliveryRadiusInKm:"",
minimumOrderAmount:"",
packagingCharge:"",

paymentMethods:"",
categories:"",
offers:"",

website:"",
facebook:"",
instagram:"",

seoTitle:"",
seoDescription:"",

ownerMobile:"",
ownerName:"",

subscriptionPlan:"basic",

logo:null,
banner:null,
gallery:[]

})

const [errors,setErrors] = useState({})

/* ---------------- CHANGE ---------------- */

const handleChange = (e)=>{
const {name,value,type,checked} = e.target

setFormData({
...formData,
[name]:type==="checkbox"?checked:value
})
}

const handleFile = (e)=>{
const {name,files} = e.target

if(name==="gallery"){
setFormData({...formData,gallery:Array.from(files)})
}else{
setFormData({...formData,[name]:files[0]})
}
}

/* ---------------- VALIDATION ---------------- */

const validateStep = ()=>{

let newErrors = {}

if(step===1){

if(!formData.name)
newErrors.name="Restaurant name required"

if(!formData.restaurantType)
newErrors.restaurantType="Restaurant type required"

if(!formData.cuisines)
newErrors.cuisines="Cuisine required"

}

if(step===2){

if(!formData.averageCostForTwo)
newErrors.averageCostForTwo="Average cost required"

if(!formData.minimumOrderAmount)
newErrors.minimumOrderAmount="Minimum order required"

}

if(step===3){

if(!formData.address)
newErrors.address="Address required"

}

if(step===5){

if(!formData.ownerMobile)
newErrors.ownerMobile="Mobile required"

if(!formData.ownerName)
newErrors.ownerName="Owner name required"

}

setErrors(newErrors)

return Object.keys(newErrors).length===0

}

/* ---------------- NAVIGATION ---------------- */

const next = ()=>{
if(validateStep()) setStep(step+1)
}

const prev = ()=> setStep(step-1)

/* ---------------- SUBMIT ---------------- */

const handleSubmit = async()=>{

if(!validateStep()) return

try{

const payload = new FormData()

payload.append("name",formData.name)
payload.append("description",formData.description)
payload.append("restaurantType",formData.restaurantType)
payload.append("cuisines",formData.cuisines)
payload.append("serviceType",formData.serviceType)
payload.append("averageCostForTwo",formData.averageCostForTwo)

payload.append("address",JSON.stringify({
fullAddress:formData.address,
location:{
type:"Point",
coordinates:[
Number(formData.latitude),
Number(formData.longitude)
]
}
}))

payload.append("timings",JSON.stringify([{
day:"Monday",
openTime:formData.openTime,
closeTime:formData.closeTime,
isClosed:false
}]))

payload.append("autoAcceptOrders",formData.autoAcceptOrders)

payload.append("preparationTimeInMinutes",formData.preparationTimeInMinutes)
payload.append("deliveryTimeInMinutes",formData.deliveryTimeInMinutes)
payload.append("deliveryRadiusInKm",formData.deliveryRadiusInKm)

payload.append("minimumOrderAmount",formData.minimumOrderAmount)
payload.append("packagingCharge",formData.packagingCharge)

payload.append("paymentMethods",formData.paymentMethods)

payload.append("categories",formData.categories)
payload.append("offers",formData.offers)

payload.append("socialLinks",JSON.stringify({
website:formData.website,
facebook:formData.facebook,
instagram:formData.instagram
}))

payload.append("seoTitle",formData.seoTitle)
payload.append("seoDescription",formData.seoDescription)

payload.append("subscriptionPlan",formData.subscriptionPlan)

payload.append("ownerMobile",formData.ownerMobile)
payload.append("ownerName",formData.ownerName)

if(formData.logo)
payload.append("logo",formData.logo)

if(formData.banner)
payload.append("banner",formData.banner)

formData.gallery.forEach(file=>{
payload.append("gallery",file)
})

await api.post("/restaurants/create",payload,{
headers:{ "Content-Type":"multipart/form-data"}
})

alert("Restaurant Created Successfully")

}catch(err){
console.log(err)
}

}

/* ---------------- UI ---------------- */

return(

<div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">

{/* STEPPER */}

<div className="md:w-64 bg-white border-r p-6 relative">

<h2 className="text-xl font-semibold mb-8">
Create Restaurant
</h2>

<div className="relative">

<div className="absolute left-4 top-2 bottom-2 w-[2px] bg-gray-200"></div>

{steps.map((label,index)=>{

const stepNumber=index+1
const active=step===stepNumber
const completed=step>stepNumber

return(

<div
key={index}
onClick={()=>stepNumber<step && setStep(stepNumber)}
className="flex items-center gap-4 mb-8 cursor-pointer relative z-10"
>

<div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
${active?"bg-orange-500 text-white":
completed?"bg-green-500 text-white":
"bg-white border border-gray-300"}
`}>

{completed?"✓":stepNumber}

</div>

<p className={`${active?"text-orange-500 font-semibold":"text-gray-600"}`}>
{label}
</p>

</div>

)

})}

</div>

</div>

{/* FORM */}

<div className="flex-1 p-6 md:p-10">

<div className="bg-white p-10 rounded-2xl shadow-lg border max-w-5xl">

{/* STEP 1 */}

{step===1 && (

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<Input label="Restaurant Name" placeholder="Enter restaurant name" name="name" value={formData.name} onChange={handleChange} error={errors.name}/>

<Select label="Restaurant Type" name="restaurantType" value={formData.restaurantType} onChange={handleChange} options={["veg","non-veg","both"]}/>

<Select label="Cuisines" name="cuisines" value={formData.cuisines} onChange={handleChange} options={["Indian","Chinese","Italian","Fast Food"]}/>

<Input label="Description" placeholder="Enter description" name="description" value={formData.description} onChange={handleChange}/>

</div>

)}

{/* STEP 2 */}

{step===2 && (

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<Input label="Average Cost For Two" placeholder="₹500" name="averageCostForTwo" value={formData.averageCostForTwo} onChange={handleChange}/>

<Input label="Minimum Order Amount" placeholder="₹200" name="minimumOrderAmount" value={formData.minimumOrderAmount} onChange={handleChange}/>

<Input label="Packaging Charge" placeholder="₹20" name="packagingCharge" value={formData.packagingCharge} onChange={handleChange}/>

<Input label="Delivery Radius (KM)" placeholder="5" name="deliveryRadiusInKm" value={formData.deliveryRadiusInKm} onChange={handleChange}/>

<Select label="Payment Methods" name="paymentMethods" value={formData.paymentMethods} onChange={handleChange} options={["Cash","UPI","Card","Wallet"]}/>

</div>

)}

{/* STEP 3 */}

{step===3 && (

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<Input label="Address" placeholder="Enter full address" name="address" value={formData.address} onChange={handleChange}/>

<Input label="Latitude" placeholder="28.6139" name="latitude" value={formData.latitude} onChange={handleChange}/>

<Input label="Longitude" placeholder="77.2090" name="longitude" value={formData.longitude} onChange={handleChange}/>

<Input type="time" label="Open Time" name="openTime" value={formData.openTime} onChange={handleChange}/>

<Input type="time" label="Close Time" name="closeTime" value={formData.closeTime} onChange={handleChange}/>

</div>

)}

{/* STEP 4 */}

{step===4 && (

<div className="space-y-6">

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<FileUpload label="Restaurant Logo" name="logo" onChange={handleFile}/>
<FileUpload label="Restaurant Banner" name="banner" onChange={handleFile}/>
<FileUpload label="Gallery Images" name="gallery" multiple onChange={handleFile}/>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<Input label="Website" placeholder="https://website.com" name="website" value={formData.website} onChange={handleChange}/>

<Input label="Facebook" placeholder="Facebook link" name="facebook" value={formData.facebook} onChange={handleChange}/>

<Input label="Instagram" placeholder="Instagram link" name="instagram" value={formData.instagram} onChange={handleChange}/>

<Input label="SEO Title" placeholder="SEO title" name="seoTitle" value={formData.seoTitle} onChange={handleChange}/>

<Input label="SEO Description" placeholder="SEO description" name="seoDescription" value={formData.seoDescription} onChange={handleChange}/>

</div>

</div>

)}

{/* STEP 5 */}

{step===5 && (

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<Input label="Owner Name" placeholder="Owner name" name="ownerName" value={formData.ownerName} onChange={handleChange} error={errors.ownerName}/>

<Input label="Owner Mobile" placeholder="Mobile number" name="ownerMobile" value={formData.ownerMobile} onChange={handleChange} error={errors.ownerMobile}/>

<Select label="Subscription Plan" name="subscriptionPlan" value={formData.subscriptionPlan} onChange={handleChange} options={["basic","pro","premium"]}/>

</div>

)}

<div className="flex justify-between mt-10">

{step>1 && (
<button onClick={prev} className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-100">
Previous
</button>
)}

{step<5 ? (
<button onClick={next} className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow">
Next
</button>
) : (
<button onClick={handleSubmit} className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow">
Create Restaurant
</button>
)}

</div>

</div>

</div>

</div>

)

}

/* INPUT */

function Input({label,error,...props}){

return(

<div className="flex flex-col">

<label className="text-sm font-medium text-gray-700 mb-1">
{label}
</label>

<input
{...props}
className={`w-full border px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-400 outline-none
${error?"border-red-500":"border-gray-300"}
`}
/>

{error && <p className="text-red-500 text-xs mt-1">{error}</p>}

</div>

)

}

/* SELECT */

function Select({label,options,...props}){

return(

<div className="flex flex-col">

<label className="text-sm font-medium text-gray-700 mb-1">
{label}
</label>

<select
{...props}
className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-400 outline-none border-gray-300"
>

<option value="">Select</option>

{options.map(o=>(
<option key={o} value={o}>{o}</option>
))}

</select>

</div>

)

}

/* FILE UPLOAD */



function FileUpload({label,name,onChange,multiple}){

return(

<div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 overflow-hidden">

<p className="text-sm font-medium text-gray-600 mb-3">
{label}
</p>

<div className="w-full">

<input
type="file"
accept="image/*"
name={name}
multiple={multiple}
onChange={onChange}
className="w-full text-sm file:mr-3 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
/>

</div>

</div>

)

}