import { useAuthStore } from "@store/auth";
import { Navigate, Outlet } from "react-router";

export function PrivateRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
