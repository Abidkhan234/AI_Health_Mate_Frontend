import { Navigate, Outlet } from "react-router";
import useUIContext from "../../../contexts/UIContext";

const AuthRoute = () => {
  const { userData } = useUIContext();
  const token = localStorage.getItem("accessToken");

  if (token && userData) {
    return <Navigate to={`/dashboard/report-history`} replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
