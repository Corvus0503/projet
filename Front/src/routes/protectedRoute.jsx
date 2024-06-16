import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authProvider";

export const ProtectedRoute = ({
  children,
  perm,
  user,
  redirectPath = "/",
}) => {
  const { token } = useAuth();

  // Check if the user is authenticated
  if (token && (perm === user.type || perm === true)) {
    return children ? children : <Outlet />;
  } else {
    return <Navigate to={redirectPath} replace />;
  }
};
