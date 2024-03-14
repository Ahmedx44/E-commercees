// src/components/PrivateRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function PrivateRoute({ roles }) {
  const isAuthenticated = localStorage.getItem("token");
  const location = useLocation();

  // Check if the user has a valid role
  const hasValidRole =
    isAuthenticated &&
    roles.includes(jwtDecode(localStorage.getItem("token")).role);

  return hasValidRole ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default PrivateRoute;
