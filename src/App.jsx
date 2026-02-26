import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminHome from "./pages/AdminDashboard/AdminHome";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Route */}
        <Route path="/" element={<AdminLogin />} />

        {/* Admin Routing */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;