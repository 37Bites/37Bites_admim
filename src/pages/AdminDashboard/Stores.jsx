import React, { useEffect, useState } from "react";
import { MapPin, Eye, Trash2, Phone, Clock } from "lucide-react";
import api from "../../api/axios";
import { NavLink } from "react-router-dom";

export default function Stores() {

  const [stores,setStores] = useState([]);

  const fetchStores = async ()=>{
    try{
      const res = await api.get("/restaurants/all");
      if(res.data?.success){
        setStores(res.data.data);
      }
    }catch(err){
      console.error(err);
    }
  };

  useEffect(()=>{
    fetchStores();
  },[]);

  const handleDelete = async(id)=>{
    if(!window.confirm("Delete this restaurant?")) return;
    await api.delete(`/restaurants/${id}`);
    fetchStores();
  };

  const toggleOpen = async(id)=>{
    await api.patch(`/restaurants/${id}/toggle-open`);
    fetchStores();
  };

  return (
    <div className="p-6 min-h-screen space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-700">STORES</h1>
        <NavLink to="/Admindashboard/create">
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          + Add Store
        </button>
        </NavLink>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h2 className="text-2xl font-bold">{stores.length}</h2>
          <p className="text-gray-500 text-sm">Total Stores</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h2 className="text-2xl font-bold">
            {stores.filter(s=>s.isOpen).length}
          </h2>
          <p className="text-gray-500 text-sm">Open Stores</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h2 className="text-2xl font-bold">0</h2>
          <p className="text-gray-500 text-sm">Total Products</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h2 className="text-2xl font-bold">0</h2>
          <p className="text-gray-500 text-sm">Active Orders</p>
        </div>

      </div>

      {/* STORES LIST */}

      {stores.map((store)=>(
        <div
          key={store._id}
          className="bg-white rounded-xl shadow-sm flex items-center gap-4 p-4 hover:shadow-md transition"
        >

          {/* IMAGE */}
          <div className="w-72 h-40 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={
                store.galleryImages?.length
                ? store.galleryImages[0]
                : "https://via.placeholder.com/400"
              }
              alt={store.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* CENTER CONTENT */}
          <div className="flex-1">

            {/* TAGS */}
            <div className="flex gap-2 mb-1">

              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {store.restaurantType || "Restaurant"}
              </span>

              <span
                className={`text-xs px-2 py-1 rounded
                ${store.status === "active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
                }`}
              >
                {store.status}
              </span>

            </div>

            {/* NAME */}
            <h2 className="text-2xl font-extrabold text-gray-900">
              {store.name}
            </h2>

            {/* LOCATION */}
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin size={14}/>
              <span className="ml-1">
                {store.address?.city || store.address?.state}, {store.address?.country}
              </span>
            </div>

            {/* CUISINES */}
            <div className="text-sm text-gray-600 mt-1">
              {store.cuisines?.join(", ")} • ₹{store.averageCostForTwo} for two
            </div>

            {/* DELIVERY */}
            <div className="text-xs text-gray-500 mt-1">
              🚚 {store.deliveryTimeInMinutes} mins • Min ₹{store.minimumOrderAmount}
            </div>

            {/* USER */}
            {store.user && (
              <div className="flex items-center gap-2 text-sm mt-1 text-gray-500">
                <Phone size={14}/>
                User ID: {store.user}
              </div>
            )}

            {/* STATS */}
            <div className="text-xs text-gray-400 mt-2 flex gap-4">
              <span>⭐ {store.ratings?.averageRating || 0}</span>
              <span>Orders {store.totalOrders}</span>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-end gap-4">

            {/* TOGGLE */}
            <label className="flex items-center cursor-pointer">
              <span className="text-xs mr-2">
                {store.isOpen ? "Open" : "Closed"}
              </span>

              <input
                type="checkbox"
                checked={store.isOpen}
                onChange={()=>toggleOpen(store._id)}
                className="sr-only peer"
              />

              <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 relative transition">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-5 transition"/>
              </div>
            </label>

            {/* ACTIONS */}
            <div className="flex gap-4 text-sm">

              <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                <Eye size={16}/>
                View
              </button>

              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
                <Clock size={16}/>
                History
              </button>

              <button
                onClick={()=>handleDelete(store._id)}
                className="flex items-center gap-1 text-red-500 hover:text-red-600"
              >
                <Trash2 size={16}/>
                Delete
              </button>

            </div>

          </div>

        </div>
      ))}

    </div>
  );
}