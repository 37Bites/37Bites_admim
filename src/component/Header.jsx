import React, { useEffect, useState, useRef } from "react";
import { Bell, MoreVertical, LogOut, Settings, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Header() {

  const [dateTime, setDateTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  const user = useSelector((state)=>state.auth.user);
  const dispatch = useDispatch();


  /* Date Time */
  useEffect(() => {

    const update = () => {

      const now = new Date();

      const options = {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      };

      setDateTime(now.toLocaleString("en-IN", options));

    };

    update();

    const timer = setInterval(update, 60000);

    return () => clearInterval(timer);

  }, []);



  /* Outside Click Close Menu */

  useEffect(()=>{

    const handleClick=(e)=>{

      if(menuRef.current && !menuRef.current.contains(e.target)){

        setMenuOpen(false)

      }

    }

    document.addEventListener("mousedown",handleClick)

    return()=>document.removeEventListener("mousedown",handleClick)

  },[])



  return (

<header className="w-full bg-orange-500 text-white px-6 py-4 shadow-md flex justify-between items-center">


{/* LEFT */}

<div>

<h2 className="text-lg font-semibold">

🍔 Welcome {user?.username || "Admin"}

</h2>

<p className="text-sm text-orange-100">

{dateTime}

</p>

</div>



{/* RIGHT */}

<div className="flex items-center gap-6">


{/* Notification */}

<Bell className="w-6 h-6 cursor-pointer hover:scale-110 transition"/>



{/* Avatar */}

<div className="w-9 h-9 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold">

{user?.username?.charAt(0)?.toUpperCase() || "A"}

</div>



{/* Menu */}

<div className="relative" ref={menuRef}>

<button onClick={()=>setMenuOpen(!menuOpen)}>

<MoreVertical className="w-6 h-6 cursor-pointer"/>

</button>



{menuOpen && (

<div className="absolute right-0 top-10 bg-white text-black rounded-lg shadow-lg w-44 py-2">


<button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-orange-50">

<User size={16}/>

Profile

</button>



<button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-orange-50">

<Settings size={16}/>

Settings

</button>



<button

onClick={()=>dispatch(logout())}

className="flex items-center gap-2 px-4 py-2 w-full text-red-500 hover:bg-red-50"

>

<LogOut size={16}/>

Logout

</button>


</div>

)}

</div>


</div>


</header>

  );
}