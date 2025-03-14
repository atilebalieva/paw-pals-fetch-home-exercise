import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "@/services/state/authStore";

const RequireAuth = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
