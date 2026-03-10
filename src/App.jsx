import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminHome from "./pages/AdminDashboard/AdminHome";
import AdminLogin from "./pages/AdminLogin";
import Stores from "./pages/AdminDashboard/Stores";
import AllUsers from "./pages/AdminDashboard/Customers";
import CreateStore from "./pages/AdminDashboard/CreateStore";
import StoreView from "./pages/AdminDashboard/StoreView";
import DeliveryLogin from "./pages/DeliveryLogin";
import DeliveryPartners from "./pages/AdminDashboard/DeliveryPartners";
import RestaurantUsers from "./pages/AdminDashboard/RestaurantUsers";
import ProfilePage from "./pages/AdminDashboard/ProfilePage";



import DeliveryDashboars from "./pages/DeliveryDashboard/DeliveryDashboars";
import DeliveryHome from "./pages/DeliveryDashboard/DeliveryHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Route */}
           
       

           
        <Route path="/" element={<DeliveryLogin />} />
         <Route path="/secure-admin-login" element={<AdminLogin/>} />
        {/* Admin Routing */}
        <Route path="/Admindashboard" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="stores" element={<Stores />} />
          <Route path="customers" element={<AllUsers />} />
          <Route path="create" element={<CreateStore />} />
          <Route path="stores/view/:id" element={<StoreView />} />
          <Route path="delivery-partners" element={<DeliveryPartners />} />
          <Route path="restaurant-users" element={<RestaurantUsers />} />
           <Route path="/Admindashboard/profile" element={<ProfilePage />} />
        </Route>


    
    <Route path="/DeliveryDashboars" element={<DeliveryDashboars />}>
          <Route index element={<DeliveryHome />} />
         
        </Route>


        
      </Routes>
    </BrowserRouter>
  );
}

export default App;