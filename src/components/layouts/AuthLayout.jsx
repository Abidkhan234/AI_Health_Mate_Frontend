import { Outlet } from "react-router";
import AuthNav from "@/components/navbars/AuthNav";

const AuthLayout = () => {
  return (
    <div className="">
      <>
        <AuthNav />
      </>
      <>
        <Outlet />
      </>
    </div>
  );
};

export default AuthLayout;
