import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

import {
  Settings,
  LogOut,
  User,
  Menu,
  X,
  Home,
  Utensils,
  ClipboardList,
  Users,
  ShoppingCart
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-orange-500 text-white p-2 rounded-md shadow-md"
      >
        {open ? <X /> : <Menu />}
      </button>


      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen z-40
        bg-gradient-to-b from-orange-500 to-orange-700
        text-white shadow-xl
        transition-all duration-300
        ${open ? "w-64" : "w-0"}
        overflow-hidden lg:w-64`}
      >

        {/* Logo */}
        <NavLink to="/">
       <div className="px-6 py-5 border-b border-orange-200 flex items-center gap-4 bg-orange-500">
  
  {/* Logo */}
  <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center shadow-sm">
    <img
      src="/logo.jpeg"
      alt="37BITES"
      className="h-10 w-10 object-contain rounded-xl"
    />
  </div>

  {/* Brand Info */}
  <div className="flex flex-col">
    <h1 className="text-lg font-bold text-white tracking-wide">
      37BITES
    </h1>
    <p className="text-xs text-white font-medium">
      Restaurant Admin
    </p>
  </div>

</div>
        </NavLink>


        {/* Menu */}
        <div className="px-3 mt-4 space-y-2 h-[calc(100%-200px)] overflow-y-auto">


          <NavLink
            to="/dashboard"
            className={({isActive}) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${isActive
                ? "bg-white text-orange-600 font-semibold"
                : "hover:bg-orange-600"
              }`
            }
          >
            <Home className="w-5 h-5"/>
            Dashboard
          </NavLink>



          <NavLink
            to="/menu"
            className={({isActive}) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${isActive
                ? "bg-white text-orange-600 font-semibold"
                : "hover:bg-orange-600"
              }`
            }
          >
            <Utensils className="w-5 h-5"/>
            Food Menu
          </NavLink>



          <NavLink
            to="/orders"
            className={({isActive}) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${isActive
                ? "bg-white text-orange-600 font-semibold"
                : "hover:bg-orange-600"
              }`
            }
          >
            <ClipboardList className="w-5 h-5"/>
            Orders
          </NavLink>



          <NavLink
            to="/users"
            className={({isActive}) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${isActive
                ? "bg-white text-orange-600 font-semibold"
                : "hover:bg-orange-600"
              }`
            }
          >
            <Users className="w-5 h-5"/>
            Customers
          </NavLink>



          <NavLink
            to="/cart"
            className={({isActive}) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${isActive
                ? "bg-white text-orange-600 font-semibold"
                : "hover:bg-orange-600"
              }`
            }
          >
            <ShoppingCart className="w-5 h-5"/>
            Cart
          </NavLink>


        </div>



        {/* Bottom Menu */}
        <div className="absolute bottom-0 w-full border-t border-orange-400 p-3 space-y-1">


          <NavLink to="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-600"
          >
            <User className="w-5 h-5"/>
            Profile
          </NavLink>



          <NavLink to="/setting"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-600"
          >
            <Settings className="w-5 h-5"/>
            Settings
          </NavLink>



          <button
            onClick={() => dispatch(logout())}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-200 hover:bg-red-500/20"
          >
            <LogOut className="w-5 h-5"/>
            Logout
          </button>

        </div>

      </div>
    </>
  );
}