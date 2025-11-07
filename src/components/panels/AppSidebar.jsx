import {
  Home,
  Settings,
  FileText,
  LogOut,
  Upload,
  PanelRightOpen,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserAvatar from "../common/UserAvatar";
import { NavLink } from "react-router";

const sidebarLinks = [
  { name: "Reports", icon: FileText, path: "/dashboard/report-history" },
  { name: "Upload Report", icon: Upload, path: "/dashboard/upload-report" },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <>
        {/* Header */}
        <SidebarHeader
          className={`border-b flex flex-row items-center justify-between p-3 ${
            collapsed ? "pb-4" : "pb-3"
          }`}
        >
          <>
            {!collapsed && (
              <h1 className="text-lg font-semibold">AI_Health_Mate</h1>
            )}
            <SidebarTrigger className={`cursor-pointer`}>
              <PanelRightOpen
                className={`${collapsed ? "rotate-180" : "rotate-0"}`}
              />
            </SidebarTrigger>
          </>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Links</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className={`gap-5!`}>
                <TooltipProvider>
                  {sidebarLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `${isActive && "bg-sidebar-accent! rounded-md"}`
                        }
                        key={item.name}
                      >
                        <SidebarMenuItem>
                          {collapsed ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <SidebarMenuButton className="justify-center">
                                  <Icon className="h-5 w-5" />
                                </SidebarMenuButton>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                {item.name}
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <SidebarMenuButton className="gap-3 cursor-pointer">
                              <Icon className="h-5 w-5" />
                              <span>{item.name}</span>
                            </SidebarMenuButton>
                          )}
                        </SidebarMenuItem>
                      </NavLink>
                    );
                  })}
                </TooltipProvider>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter
          className={`border-t flex flex-row items-center ${
            collapsed ? "px-1" : "px-2"
          } py-3`}
        >
          <UserAvatar isCollapsed={!collapsed} />
        </SidebarFooter>
      </>
    </Sidebar>
  );
};

export default AppSidebar;
