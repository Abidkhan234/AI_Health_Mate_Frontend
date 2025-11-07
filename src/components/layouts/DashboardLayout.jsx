import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/panels/AppSidebar";
import DashNav from "@/components/navbars/DashNav";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-full relative">
        <>
          <DashNav />
        </>
        <div className="px-4 pb-5 pt-16 w-full min-h-screen">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
