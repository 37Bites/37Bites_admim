import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminHome from "./pages/AdminDashboard/AdminHome";
import AdminLogin from "./pages/AdminLogin";
import Stores from "./pages/AdminDashboard/Stores";
<<<<<<< Updated upstream
import AllUsers from "./pages/AdminDashboard/Customers";
=======
import CreateStore from "./pages/AdminDashboard/CreateStore";

>>>>>>> Stashed changes

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Route */}
        <Route path="/" element={<AdminLogin />} />

        {/* Admin Routing */}
        <Route path="/Admindashboard" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
<<<<<<< Updated upstream
          <Route path="stores" element={<Stores />} />
          <Route path="customers" element={<AllUsers />} />
=======
            <Route path="stores" element={<Stores/>}/>
             <Route path="create" element={<CreateStore/>}/>
           
>>>>>>> Stashed changes
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;