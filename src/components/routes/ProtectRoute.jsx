import useUIContext from "../../../contexts/UIContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { userData } = useUIContext();
  const token = localStorage.getItem("accessToken");

  if (!token && userData) {
    return <Navigate to={`/`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
