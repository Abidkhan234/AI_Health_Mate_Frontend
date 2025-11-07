import { PanelRightClose } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../Buttons/ThemeToggler";

const DashNav = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 flex items-center md:justify-end justify-between w-full bg-sidebar-primary-foreground py-2 px-4 border-b">
      <div className="md:hidden">
        <SidebarTrigger className={`flex items-center cursor-pointer`}>
          <PanelRightClose className="size-6" />
        </SidebarTrigger>
      </div>
      <div className="">
        <ModeToggle align={`end`} />
      </div>
    </nav>
  );
};

export default DashNav;
