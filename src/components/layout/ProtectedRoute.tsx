import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../services/authService";

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;