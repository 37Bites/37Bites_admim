// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   if (!isAuthenticated || !user) {
//     return <Navigate to="/" />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return <Outlet />;
// };