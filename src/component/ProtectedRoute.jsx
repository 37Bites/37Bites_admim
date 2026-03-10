import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {

  const { user } = useSelector((state) => state.auth);

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unathorized" replace />;
  }

  return <Outlet />;
}